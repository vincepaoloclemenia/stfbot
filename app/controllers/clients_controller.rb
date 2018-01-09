class ClientsController < ApplicationController
    before_action :authenticate_admin!
    before_action :find_company, only: [:show, :edit, :update, :destroy]
    #after_action :create_group, only: :create
    def index
    end

    def show
    end

    private

        def find_company
            @company = Company.friendly.find(params[:id])
        end

        def company_params
            params.fetch(:company, {}).permit(:name, :address, :telefax,
                            users_attributes: [:email, :first_name, :last_name, :password, :username, :role, :id, :_destroy]
                        )
        end

        def create_group
            @company.create_hired_group(hiring_date: Date.today.to_date)
        end
        
end