class Api::EmployeesController < Api::BaseController
    before_action :authenticate_user!

    def create
        @company = current_user.company
        @user = @company.users.create(user_params)
        @user.save
        if @user.save
            render json: { status: 200, message: 'Nice'}
        else 
            render json: { errors: @user.errors.full_messages }.to_json
        end
        #render json: user
    end

    def update
    end
    
    def destroy
    end

    private
        def find_user
            @user = current_user.company.users.find(params[:id])
        end

        def user_params
            params.require(:user).permit(:email, :password, :role, :username, :first_name, :last_name)
        end
end