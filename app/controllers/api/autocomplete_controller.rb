class Api::AutocompleteController < Api::BaseController
    before_action :authenticate_user!, :restrict_user, only: :index

    def index 
        if params[:term].present? && params[:term] != ''            
            @companies = Company.all.where("name ilike :q", q: "%#{params[:term]}%")
            @jobs = Job.all.where("title ilike :q", q: "%#{params[:term]}%")
        else
            @companies = []
            @jobs = []
        end
    end

    private

        def restrict_user
            if current_user
                if current_user.role != 'applicant'
                    render json: { message: 'Not authorized'}
                end
            end
        end

end