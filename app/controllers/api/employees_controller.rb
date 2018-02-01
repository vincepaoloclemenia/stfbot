class Api::EmployeesController < Api::BaseController
    before_action :authenticate_user!
    before_action :find_user, only: [:update, :destroy]
    before_action :find_company, only: [ :index, :create, :employers, :finance_admins ]
    def index
        @employers = @company.employees.where(role: 'employer')
        @finance_admins = @company.employees.where(role: 'finance admin')
    end

    def employers
        @employers = @company.employees.where(role: 'employer')
    end

    def finance_admins
        @finance_admins = @company.employees.where(role: 'finance admin')
    end

    def create
        @user = @company.employees.create(user_params)
        @user.save
        if @user.save
            render json: { status: 200, message: 'An Employee has been added successfully', user: @user }
        else 
            render json: { errors: @user.errors.full_messages }.to_json
        end
    end

    def update
        @user.update_attributes(update_attributes)
        if @user.save
            render json: { status: 200, message: 'Employee information successfully updated', user: @user }
        else 
            render json: { errors: @user.errors.full_messages }.to_json
        end
    end
    
    def destroy
        @user.destroy
        if @user.destroy
            render json: { status: 200, message: 'An employee has been deleted', user: @user }
        else
            render json: { errors: @user.errors.full_messages }
        end
    end

    private
        def find_user
            @user = current_user.company.employees.find(params[:id])
        end

        def find_company
            @company = current_user.company
        end

        def user_params
            params.require(:user).permit(:email, :password, :role, :username, :first_name, :last_name)
        end
        
        def update_attributes
            params.require(:user).permit(:email, :role, :first_name, :last_name)
        end
end