class Api::InquiriesController < ApplicationController
    before_action :authenticate_admin!, only: :destroy
    def index
        @industries = ['Accounting and Finance', 'General Services', 'Management and Consultancy', 'Human and Resources', 'Legal', 'Sciences', 'Arts and Sports', 'IT and Software', 'Architecture and Engineering'].sort        
        @size = ['51-200', '201-500', '1001-5000', '> 5000']
        @information = ['Social Media(Facebook, LinkedIn, Twitter)', 'Google', 'Blog', 'Industry Organization', 'Referral from a friend']
    end

    def create
        @inquiry = Inquiry.create(inquiry_params)
        if @inquiry.save
            render json: { status: 200, message: 'Your request has been successfuly. Kindly keep your lines open. Thank you'}
        else
            render json: { errors: @inquiry.errors.full_messages }
        end
    end
    
    def destroy
    end

    private
        def inquiry_params
            params.require(:inquiry).permit(
                :company_name, 
                :company_size, 
                :address,
                :first_name,
                :last_name,
                :email,
                :contact,
                :position,
                :info_from,
                :industry
            )
        end
end