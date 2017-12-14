class Api::WorkExperiencesController < Api::BaseController
    before_action :authenticate_user!

    def index
        @experiences = current_user.work_experiences.all
        respond_with @experiences
    end


end