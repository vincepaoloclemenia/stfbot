class UsersController < ApplicationController
    before_action :authenticate_user!, only: []
    before_action :find_user, only: [:show, :authorize_user]
    before_action :authorize_user, only: :show 

    def index
    end

    def create
        @user = current_company.users.create(user_params)
    end

    def show
    end

    def profile
        @user = current_user
    end

    private
        def find_user
            @user = User.find_by_username(params[:username])
        end

        def user_params
            params.require(:user).permit(:email, :username, :first_name, :last_name, :role, :password, :password_confirmation, :confirmed_at)
        end
        
        def authorize_user
            if current_user
                redirect_to root_path, alert: 'Access Denied' if current_user != User.find_by_username(params[:username]) && current_user.role != 'employer'
            end
        end
end