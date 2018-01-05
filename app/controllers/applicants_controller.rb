class ApplicantsController < ApplicationController
    before_action :authenticate_user!, :restrict_access

    def index
        
    end

    private
        def restrict_access
            if current_user
                if current_user.role != 'employer'
                    redirect_to root_path
                    flash[:alert] = 'Access Denied'
                end                    
            else
                redirect_to root_path
                flash[:alert] = 'Access Denied'
            end
        end

end