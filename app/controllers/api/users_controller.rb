class Api::UsersController < Api::BaseController
    before_action :authenticate_user!, except: [:get_countries, :get_states, :get_cities]
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
        #current_user.update(avatar: params[:avatar])
        current_user.update(user_params)
        if current_user.address.present? 
            current_user.address.update(address_params)            
        else
            current_user.create_address(address_params)            
        end
    end

    def upload_avatar
        current_user.update(avatar: params[:user_avatar])
    end

    def delete_avatar
        current_user.avatar = nil
        current_user.save
        #status: 200
    end

    def delete_resume
        current_user.resume = nil
        current_user.save
    end

    def user_profile
        @user = current_user
    end

    def get_resume
        @file_name  = if current_user.resume_file_name.nil?
            'Choose a file'
        else
            File.basename(current_user.resume_file_name)
        end
        @resume = if current_user.resume_file_name.nil?
            nil
        else
            current_user.resume
        end

        render json: { resume: @resume, file_name: @file_name }
    end

    def upload_resume
        current_user.update(resume: params[:resume])
    end

    def get_countries
        @countries = Api::CountriesStateCity::Countries       
    end

    def get_states
        @states = if params[:country].present? 
            @country = Api::FindState.new(params[:country])
            @country.find_state
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
        params.require(:user).permit( :avatar, :first_name, :last_name, :contact, :address, :gender, :birthdate)
    end

    def address_params
        params.require(:address).permit(:country, :state, :city, :street)
    end

    def authenticate_role
        redirect_to root_path, alert: 'Access Denied' if current_user.username != params[:username]
    end

end