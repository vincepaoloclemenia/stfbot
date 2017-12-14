class Api::EducationsController < Api::BaseController
    before_action :authenticate_user!
    def index
        @educations = current_user.educations.all
        respond_with @educations, @universities
    end

    def new
        @universities = ['National University', 'Far Eastern University', 'University of the Philippines', 'University of Sto. Tomas', 'University of the East']
        @attainments = ['College Graduate', 'Undergraduate', 'Vocational', 'High School Diploma']
        @months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        @years = (1980...Date.today.year + 1).to_a.sort {|x,y| y <=> x }
        @courses = ['Accountancy', 'Accountancy & Legal Management', 'Accounting', 'Accounting Technology',
                    'Business Administration & Accountancy','Computer Science', 'Mass Communication', 'Information Technology'].sort
        respond_with @universities, @attainments, @months, @years, @courses
    end

    def create
        @education = current_user.educations.create(education_params)
        if @education.save
            flash[:notice] = "Education Saved"
        end
    end

    def destroy
        respond_with current_user.educations.destroy(params[:id])
    end

    def update 
        education = current_user.educations.find(params[:id])
        education.update_attributes(education_params)
        render json: education
    end

    private

    def education_params
        params.require(:education).permit(:school_name, :education_attainment, :attend_from, :attend_to, :status, :accomplishment, :course)
    end

end