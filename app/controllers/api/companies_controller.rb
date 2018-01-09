class Api::CompaniesController < Api::BaseController
    before_action :find_company, only: :update
    def index
    end

    def update
        @company.update(profile_params)
        @company.location.update(location_params)
        if @company.save
            render json: { message: 'Company #{@company.name} was successfully updated!', company: @company }
        else
            render json: { message: @company.errors.full_messages }
        end
    end

    def get_company_profile
        @company = Company.find(params[:id])
    end

    def get_countries
        @sizes = ['51-200', '201-500', '1001-5000', '> 5000']
        @countries = Api::CountriesStateCity::Countries 
        @industries = ['Accounting and Finance', 'General Services', 'Management and Consultancy', 'Human and Resources', 'Legal', 'Sciences', 'Arts and Sports', 'IT and Software', 'Architecture and Engineering'].sort        
        if params[:id].present?
            @company = Company.find(params[:id])
            @sizes << @company.number_of_employees if @sizes.exclude?(@company.number_of_employees)
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

        def find_company
            @company = Company.find(params[:id])
        end

        def profile_params
            params.require(:company).permit(
                :name, 
                :number_of_employees,
                :avatar,
                :language_spoken,
                :telefax,
                :website
            )
        end

        def location_params
            params.require(:location).permit(:country, :state, :city, :street)
        end

        def overview_params
            params.require(:company).permit(:overview, :why_join_us, :benefits )
        end

end