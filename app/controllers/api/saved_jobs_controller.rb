class Api::SavedJobsController < Api::BaseController
    before_action :authenticate_user!
    def index
        @saved_jobs = current_user.prospects.paginate(page: params[:page], per_page: 10)
    end

    def applied_jobs
        @applied_jobs = current_user.applied_jobs.paginate(page: params[:page], per_page: 10)
    end
end