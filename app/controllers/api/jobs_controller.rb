class Api::JobsController < Api::BaseController

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
    end

    def create
        @job = current_user.company.jobs.new(job_params)
        @job.user_id = current_user.id
        @job.save
        if @job.save
            render json: { success: 'Job post successfully created!' }
        else
            render json: { error: " Oops! Something went wrong. #{@job.errors.full_messages}" }
        end
    end

    def edit
    end

    def update
    end

    def destroy
    end

    def suggestions
        @suggestions = []
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
                :description
            )
        end
        
end