class Api::EducationsController < Api::BaseController
    before_action :authenticate_user!
    def index
        @educations = current_user.educations.all
        respond_with @educations, @universities
    end

    def new
        @universities = ['National University', 'Far Eastern University', 'University of the Philippines', 'University of Sto. Tomas', 'University of the East'].sort
        @attainments = ['College', 'Vocational', 'High School'].sort
        @months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        @years = (1980...Date.today.year + 1).to_a.sort {|x,y| y <=> x }
        @courses = ['Accountancy', 'Accountancy & Legal Management', 'Accounting', 'Accounting Technology',
                    'Business Administration & Accountancy','Computer Science', 'Mass Communication', 'Information Technology'].sort
        respond_with @universities, @attainments, @months, @years, @courses
    end

    def create
        @education = current_user.educations.create(education_params)
        if @education.save
            render json: { status: 200, message: 'Education Saved'}.to_json
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

    def get_options
        @universities = ['National University', 'Far Eastern University', 'University of the Philippines', 'University of Sto. Tomas', 'University of the East'].sort
        @attainments = ['College', 'Vocational', 'High School']
        @months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        @years = (1980...Date.today.year + 1).to_a.sort {|x,y| y <=> x }
        @courses = ['Accountancy', 'Accountancy & Legal Management', 'Accounting', 'Accounting Technology',
                    'Business Administration & Accountancy','Computer Science', 'Mass Communication', 'Information Technology'].sort
        @universities << current_user.educations.find(params[:id]).school_name if @universities.exclude?(current_user.educations.find(params[:id]).school_name)
        @attainments << current_user.educations.find(params[:id]).education_attainment if @universities.exclude?(current_user.educations.find(params[:id]).school_name)
        @courses << current_user.educations.find(params[:id]).course if @universities.exclude?(current_user.educations.find(params[:id]).school_name)
        respond_with @universities, @attainments, @months, @years, @courses
    end

    private

    def education_params
        params.require(:education).permit(:school_name, :education_attainment, :attend_from, :attend_to, :status, :accomplishment, :course)
    end

end