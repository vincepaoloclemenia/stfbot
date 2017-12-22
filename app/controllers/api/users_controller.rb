class Api::UsersController < Api::BaseController
    before_action :authenticate_user!
    #before_action :authenticate_role, only: :update
    def index
        respond_with User.all
    end

    def create
        respond_with :api, User.create(user_params)
    end

    def destroy
        respond_with User.destroy(params[:id])
    end

    def update 
        current_user.update(user_params)
        if current_user.address.present? 
            current_user.address.update(address_params)            
        else
            current_user.address.create_address(address_params)            
        end
    end

    def delete_avatar
        current_user_user.avatar = nil
        current_user.save
        #status: 200
    end

    def user_profile
        @user = current_user
    end

    def get_countries
        @countries = Api::CountriesStateCity::Countries       
    end

    def get_states
        @states = if params[:country].present? && params[:country] == 'Philippines'
            Api::CountriesStateCity::PhilippineRegions
        else
            Array.new()
        end
    end

    def get_cities
        @cities = if params[:state].present?
            @state = Api::CountriesStateCity.new(params[:state])
            @state.find_city
        else
            Array.new
        end
    end

    def get_date
        @years = (1980...Date.today.year + 1).to_a.sort {|x,y| y <=> x }
        @months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        @days = (1...32).map{ |i| i.to_s }
        @genders = ['Male', 'Female']
    end

    private

    def user_params
        params.require(:user).permit(:first_name, :last_name, :contact, :address, :gender, :birthdate)
    end

    def address_params
        params.require(:address).permit(:country, :state, :city, :street)
    end

    def authenticate_role
        redirect_to root_path, alert: 'Access Denied' if current_user.username != params[:username]
    end

end