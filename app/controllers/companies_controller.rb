class CompaniesController < ApplicationController
    
    def index
    end

    def show
        @company = Company.friendly.find(params[:id])
    end
end