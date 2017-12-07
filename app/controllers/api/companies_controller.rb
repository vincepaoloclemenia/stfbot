class Api::CompaniesController < ApplicationController
    before_action :authenticate_admin!

    def index
        @companies = Company.all.paginate(page: params[:page], per_page: 5)
    end

end