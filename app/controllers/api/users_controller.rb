class Api::UsersController < Api::BaseController
    before_action :authenticate_user!
    before_action :authenticate_role, only: :update
    def index
        respond_with User.all
    end

    def create
        respond_with :api, User.create(user_params)
    end

    def destroy
        respond_with User.destroy(params[:id])
    end

    def update 
        user = Item.find(params['id'])
        user.update_attributes(user_params)
        respond_with user, json: user
    end

    def delete_avatar
        current_user_user.avatar = nil
        current_user.save
        status: 200
    end

    private

    def user_params
        params.require(:user).permit(:first_name, :last_name, :username, :contact, :address)
    end

    def authenticate_role
        redirect_to root_path, alert: 'Access Denied' if current_user.username != params[:username]
    end

end