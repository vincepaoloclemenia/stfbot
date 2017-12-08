class UsersController < ApplicationController
    before_action :authenticate_user!, only: []
    before_action :find_user, only: :show

    def index
    end

    def create
        @user = current_company.users.create(user_params)
    end

    def show
    end

    private
        def find_user
            @user = User.find_by_username(params[:username])
        end

        def user_params
            params.require(:user).permit(:email, :username, :first_name, :last_name, :role, :password, :password_confirmation, :confirmed_at)
        end
        
end