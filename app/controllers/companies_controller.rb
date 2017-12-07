class CompaniesController < ApplicationController
    before_action :authenticate_admin!
    before_action :find_company, except: [:new, :index, :create, :create_group]
    after_action :create_group, only: :create
    def index
    end

    def new
        @newCompany = Company.new(company_params)
    end

    def create
        @company = Company.new(company_params)
        respond_to do |f|
            if @company.save
                f.html{
                    redirect_to companies_path,
                    notice: "Company #{@company.name} was added"
                }
            else
                f.html{
                    redirect_to new_company_path,
                    alert: "ALERT! Error: #{@company.errors.full_messages}"
                }
            end
        end
    end

    def show
    end

    def edit
    end

    def update
    end

    def destroy
        @company.destroy
        redirect_to companies_path, notice: 'Company has been successfuly removed'        
    end

    private

        def find_company
            @company = Company.find(params[:id])
        end

        def company_params
            params.fetch(:company, {}).permit(:name, :address, :telefax)
        end

        def create_group
            @company.create_hired_group(hiring_date: Date.today.to_date)
        end
        
end