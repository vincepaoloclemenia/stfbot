class Api::WorkExperiencesController < Api::BaseController
    before_action :authenticate_user!

    def index
        @experiences = current_user.work_experiences.all
        respond_with @experiences
    end

    def new
        @job_levels = ['Not Applicable', 'Entry Level/Fresh Grad', 'Junior', 'Senior'].sort
        @job_functions = ['Accounting and Finance', 'General Services', 'Management and Consultancy', 'Human and Resources', 'Legal', 'Sciences', 'Arts and Sports', 'IT and Software', 'Architecture and Engineering'].sort
        @months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        @years = (1980...Date.today.year + 1).to_a.sort {|x,y| y <=> x }
        respond_with @job_levels, @job_functions, @months, @years
    end

    def edit
        @job_levels = ['Entry Level/Fresh Grad', 'Junior', 'Senior'].sort
        @job_functions = ['Accounting and Finance', 'General Services', 'Management and Consultancy', 'Human and Resources', 'Legal', 'Sciences', 'Arts and Sports', 'IT and Software', 'Architecture and Engineering'].sort
        @months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        @years = (1980...Date.today.year + 1).to_a.sort {|x,y| y <=> x }
        @job_functions << current_user.work_experiences.find(params[:id]).job_functions if @job_functions.exclude?(current_user.work_experiences.find(params[:id]).job_functions)
        respond_with @job_levels, @job_functions, @months, @years
    end

    def create
        @experience = current_user.work_experiences.create(work_experience_params)
        if @experience.save
        else
            render json: @experience.errors.full_messages
        end
    end

    def update
        experience = current_user.work_experiences.find(params[:id])
        experience.update_attributes(work_experience_params)
    end

    def destroy
        current_user.work_experiences.find(params[:id]).destroy
    end

    private

        def work_experience_params
            params.require(:work_experience).permit(:company_name, :job_title, :employment_from, :employment_to, :job_level, :job_functions, :job_description, :employment_status, :achievements)
        end

end