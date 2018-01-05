class Api::DashboardController < Api::BaseController

    def check_company_profile
        @progress = current_user.company.company_profile
        @has_picture = current_user.company.avatar.url != '/img/company-no-image-avatar.png'
        @has_overview = current_user.company.overview.present? 
        @has_why_join_us = current_user.company.why_join_us.present?
        @has_employers = current_user.company.users.where(role: 'employer').size != 0
        @has_finace_admins = current_user.company.users.where(role: 'finance admin').size != 0
        render json: { 
            progress: @progress, 
            hasPicture: @has_picture,
            hasOverview: @has_overview,
            hasWhyJoinUs: @has_why_join_us,
            hasEmployers: @has_employers,
            hasFinanceAdmins: @has_finace_admins
        }
    end

end