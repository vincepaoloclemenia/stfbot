class AdminsController < ApplicationController
    before_action :authenticate_admin!
    before_action :find_admin, only: :show
    def index
    end

    def show
    end

    private
        def find_admin
            @admin = Admin.find(params[:id])
        end
end