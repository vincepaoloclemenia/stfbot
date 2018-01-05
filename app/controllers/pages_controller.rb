class PagesController < ApplicationController
    
    def index   
    end

    def user_signup
        @job_seeker = "applicant"
        @employer = "employer"
    end

    def inquire
    end

    private

        def restrict
            if current_user
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

end