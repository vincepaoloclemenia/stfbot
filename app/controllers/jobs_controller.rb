class JobsController < ApplicationController
    before_action :get_job, only: :show
    def index
    end

    def show
    end

    def jobs
    end

    private
        def get_job
            @job = Job.friendly.find(params[:title])
        end
end