class Api::EducationsController < Api::BaseController
    before_action :authenticate_user!
    def index
        @educations = current_user.educations.all
        respond_with @ducations
    end

    def create
        respond_with :api, current_user.educations.create(education_params)
    end

    def destroy
        respond_with current_user.educations.destroy(params[:id])
    end

    def update 
        education = current_user.educations.find(params['id'])
        education.update_attributes(education_params)
        respond_with education, json: education
    end

    private

    def education_params
        params.require(:education).permit(:school_name, :education_attainment, :attend_from, :attend_to, :graduated?, :accomplishment)
    end

end