class Api::JobsController < Api::BaseController
    before_action :find_job, only: [:edit, :update, :destroy]
    def index
        @jobs = current_company.jobs.where(user_id: current_user.id)
    end

    def new
        @attainments = ['College', 'Vocational', 'High School'].sort
        @positions = ['Internship / OJT', 'Entry Level/Fresh Grad', 'Associate / Supervisor', 'Mid-senior Level / Manager', 'Director / Executive' ].sort        
        @location = { 
            country: current_user.company.location.country,
            state: current_user.company.location.state,
            city: current_user.company.location.city,
            street: current_user.company.location.street
        }
        @genders = ['Male', 'Female']
        @types = ['Regular', 'Contractor', 'Regular / Contractor']
        @industries = ['Accounting and Finance', 'General Services', 'Management and Consultancy', 'Human and Resources', 'Legal', 'Sciences', 'Arts and Sports', 'IT and Software', 'Architecture and Engineering'].sort      
        @courses = ['Accountancy', 'Accountancy & Legal Management', 'Accounting', 'Accounting Technology',
        'Business Administration & Accountancy','Computer Science', 'Mass Communication', 'Information Technology'].sort
        @countries = Api::CountriesStateCity::Countries      
    end

    def create
        @job = current_user.company.jobs.new(job_params)
        @job.user_id = current_user.id
        @job.save
        if @job.save
        else
            render json: { error: " Oops! Something went wrong. #{@job.errors.full_messages}" }
        end
    end

    def edit
        @attainments = ['College', 'Vocational', 'High School'].sort
        @positions = ['Internship / OJT', 'Entry Level/Fresh Grad', 'Associate / Supervisor', 'Mid-senior Level / Manager', 'Director / Executive' ].sort        
        @location = { 
            country: current_user.company.location.country,
            state: current_user.company.location.state,
            city: current_user.company.location.city,
            street: current_user.company.location.street
        }
        @genders = ['Male', 'Female']
        @types = ['Regular', 'Contractor', 'Regular / Contractor']
        @industries = ['Accounting and Finance', 'General Services', 'Management and Consultancy', 'Human and Resources', 'Legal', 'Sciences', 'Arts and Sports', 'IT and Software', 'Architecture and Engineering'].sort      
        @courses = ['Accountancy', 'Accountancy & Legal Management', 'Accounting', 'Accounting Technology',
        'Business Administration & Accountancy','Computer Science', 'Mass Communication', 'Information Technology'].sort
        @countries = Api::CountriesStateCity::Countries   
        @location = @job.location.split(", ")           
        @attainments << @job.education_attainment if @attainments.exclude?(@job.education_attainment)
        @positions << @job.level_of_expertise if @positions.exclude?(@job.level_of_expertise)
        @types << @job.type_of_employee if @types.exclude?(@job.type_of_employee)
        @industries << @job.industry if @industries.exclude?(@job.industry)
        @job.preferred_courses.map { |course| @courses.include?(course) ? next : @courses << course }
        @countries << @location[2] if @countries.exclude?(@location[2])
    end

    def update
        @job.update(job_params)
        if @job.save
        else
            render json: { message: @job.errors.full_messages }
        end
    end

    def destroy
    end

    def suggestions
        @suggestions = []
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

    def apply
        @job = Job.find(params[:id])
        @application = current_user.apply(@job)
        if @application.save
            render json: { applied: current_user.applied?(@job) }
        else
            render json: { message: @application.errors.full_messages }
        end
    end

    private

        def job_params
            params.require(:job).permit(
                :title, 
                :location, 
                :industry, 
                :gender, 
                :type_of_employee, 
                :level_of_expertise, 
                :requisition_number, 
                :education_attainment, 
                :min_exp,
                :max_exp,
                :description,
                requirements: [],
                preferred_courses: []
            )
        end

        def find_job
            @job = current_user.created_jobs.find(params[:id])
        end
        
end