class UsersController < ApplicationController
    before_action :authenticate_user!, only: []
    before_action :find_user, only: :show

    def index
    end

    def show
    end

    private
        def find_user
            @user = User.find_by_username(params[:username])
        end
end