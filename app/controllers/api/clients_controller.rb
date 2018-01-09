class Api::ClientsController < Api::BaseController
    before_action :authenticate_admin!, :restrict_users
    before_action :find_company, only: [:update, :destroy]

    def index
        @companies = Company.all.paginate(page: params[:page], per_page: 10)
    end

    def create
        @company = Company.create(company_params)
        @company.save
        @com = Company.find(@company.id)
        @com.users.create(user_params)
        @com.create_location(location_params)
        if @com.save
            render json: { status: 200, message: 'Company was successfully created!'} 
        else
            render json: { message: @com.errors.full_messages }
        end     
    end

    def update
        @company.update(company_params)
        @company.users.update(update_user)
        @company.location.update(location_params)
        if @company.save
            render json: { message: "Company #{@company.name} has been successfully updated!" }
        else 
            render json: { message: @company.errors.full_messages }
        end
    end

    def destroy
        @company.destroy
        if @company.save
            render json: { message: "Company #{@company.name} has been successfully deleted!" }
        else 
            render json: { message: @company.errors.full_messages }
        end 
    end

    def get_countries        
        @size = ['51-200', '201-500', '1001-5000', '> 5000']
        @countries = Api::CountriesStateCity::Countries 
        @industries = ['Accounting and Finance', 'General Services', 'Management and Consultancy', 'Human and Resources', 'Legal', 'Sciences', 'Arts and Sports', 'IT and Software', 'Architecture and Engineering'].sort        
        if params[:id].present?
            @company = Company.find(params[:id])
            @size << @company.number_of_employees if @size.exclude?(@company.number_of_employees)
            @countries << @company.location.country if @countries.exclude?(@company.location.country)
            @industries << @company.industry if @countries.exclude?(@company.industry)
        end   
    end

    def get_states
        if params[:country].present? 
            @country = Api::FindState.new(params[:country])
            @states = @country.find_state.nil? ? [] : @country.find_state
            if params[:id].present? 
                @company = Company.find(params[:id])
                @states << @company.location.state if @country.find_state.exclude?(@company.location.state)
            end
        else
            @states = Array.new()
        end
    end

    def get_cities
        if params[:state].present?
            @state = Api::CountriesStateCity.new(params[:state])
            @cities = @state.find_city.nil? ? [] : @state.find_city
            if params[:id].present? 
                @company = Company.find(params[:id])
                @cities << @company.location.state if @state.find_city.exclude?(@company.location.state)
            end
        else
            @cities = Array.new
        end
    end

    private
        def restrict_users
            if current_user
                if current_user.role != 'company_admin'
                    render json: { status: 402, message: 'You are not authorized to take actions!'}
                end
            end
        end

        def company_params
            params.require(:company).permit(:name, :telefax, :number_of_employees, :industry)
        end

        def user_params
            params.require(:user).permit(:first_name, :last_name, :email, :username, :role, :password)
        end

        def update_user
            params.require(:user).permit(:first_name, :last_name, :email, :username)            
        end

        def location_params
            params.require(:location).permit(:street, :city, :state, :country)
        end

        def find_company
            @company = Company.find(params[:id])
        end

end