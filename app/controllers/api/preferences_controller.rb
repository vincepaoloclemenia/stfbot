class Api::PreferencesController < Api::BaseController

    before_action :authenticate_user!, :restrict_access
    
    def index
        @preference = current_user.preference
        render json: @preference
    end

    def create       
        @preference = current_user.create_preference(preference_params)  
        
        unless @preference.save
            render json: { message: @preference.errors.full_messages }
        end

        if params[:words].present?     
            params[:words].each do |title|
                if JobTitle.where("word @@ :q", q: title).exists?
                    next
                else
                    JobTitle.create(word: title)
                end
            end
        end
    end

    def update
        @preference = Preference.find(params[:id]) 
        @preference.update(preference_params)
        if @preference.save
        else
            render json: { message: @preference.errors.full_messages }
        end

        if params[:words].present?     
            params[:words].each do |title|
                if JobTitle.where("word @@ :q", q: title).exists?
                    next
                else
                    JobTitle.create(word: title)
                end
            end
        end
    end

    def get_information
        @functions = ['Accounting and Finance', 'General Services', 'Management and Consultancy', 'Human and Resources', 'Legal', 'Sciences', 'Arts and Sports', 'IT and Software', 'Architecture and Engineering'].sort              
        @levels = ['Internship / OJT', 'Entry Level/Fresh Grad', 'Associate / Supervisor', 'Mid-senior Level / Manager', 'Director / Executive' ].sort   
        @titles = JobTitle.all.pluck :word
        @positions = ['Regular', 'Contractor']
        @shifts = ['Day', 'Night', 'Flexible']  
        @currencies = ['Php', 'USD']
        @countries = Api::CountriesStateCity::Countries    
        current_user.preference.functions.map{ |x| @functions << x if @functions.exclude?(x)}
        current_user.preference.levels.map{ |x| @levels << x if @levels.exclude?(x)} 
        current_user.preference.positions.map{ |x| @positions << x if @positions.exclude?(x)}      
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

    private

        def preference_params
            params.require(:preference).permit(                
                :shift,
                :salary,
                :location,
                :levels => [],
                :functions => [],
                :titles => [],
                :positions => [],
            )
        end

        def restrict_access
            if current_user
                if current_user.role != 'applicant'
                    redirect_to root_path
                    flash[:alert] = "Oops! Unauthorized user has been recognized"
                end
            end
        end
end