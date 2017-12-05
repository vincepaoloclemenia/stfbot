class PagesController < ApplicationController
    def index
    end

    def user_signup
        @job_seeker = "applicant"
        @employer = "employer"
    end

end