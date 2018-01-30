class UsersController < ApplicationController
    before_action :authenticate_user!, only: [:profile]
    before_action :find_user, only: [:show, :authorize_user]
    before_action :authorize_user, only: :show 

    def index
    end

    def create
        @user = current_company.users.create(user_params)
    end

    def show
    end

    def update
        current_user.update(user_params)
        current_user.address.update(address_params)
    end

    def profile
        @user = current_user
    end

    def recommended_jobs
        
    end

    private
        def find_user
            @user = User.friendly.find(params[:slug])
        end

        def user_params
            params.require(:user).permit(:email, :username, :first_name, :last_name, :role, :password, :password_confirmation, :confirmed_at, :gender, :birthdate)
        end

        def address_params
            params.require(:address).permit(:country, :state, :city, :street)
        end
        
        def authorize_user
            if current_user
                redirect_to root_path, alert: 'Access Denied' if current_user != User.find_by_id(params[:id]) && current_user.role != 'employer'
            end
        end
end