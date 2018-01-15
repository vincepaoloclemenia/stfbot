class Api::AutocompleteController < Api::BaseController
    before_action :authenticate_user!, :restrict_user, only: :index

    def index      
        @companies = Company.all.where('name LIKE ?', "%#{params[:term]}%")
        @jobs = Company.all.where('name LIKE ?', "%#{params[:term]}%")
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