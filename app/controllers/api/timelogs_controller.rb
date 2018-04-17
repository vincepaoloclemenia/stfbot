class Api::TimelogsController < Api::BaseController

    def index
        #@log = current_user.todays_log
        #@logged_in = current_user.logged_in?
        #@logged_out = current_user.logged_out?
        #@taken_break = current_user.taken_break?
        #@end_of_break = current_user.end_of_break?    
        #render json: { timeLog: @log, hasLoggedIn: @logged_in, hasLoggedOut: @logged_out, hasTakenBreak: @taken_break, hasReturned: @end_of_break }        
        @timelogs = current_user.timelogs.where(date: Date.today.at_beginning_of_month..Date.today.end_of_month)
    end

    def create
    end

    def update
    end

    def generate_timelogs
        if params[:date_from].present? && params[:date_to].present?
            @from = Date.strptime(params[:date_from], "%m/%d/%Y")
            @to = Date.strptime(params[:date_to], "%m/%d/%Y")
            @timelogs = current_user.timelogs.where(date: @from..@to)
        else
            @timelogs = current_user.timelogs.where(date: Date.today.at_beginning_of_month..Date.today.end_of_month)
        end
    end

    def export_timesheet
        if params[:date_from].present? && params[:date_to].present?
            @from = Date.strptime(params[:date_from], "%m/%d/%Y")
            @to = Date.strptime(params[:date_to], "%m/%d/%Y")
            @timelogs = current_user.timelogs.where(date: @from..@to)
            respond_to do |format|
                format.xlsx
                render xlsx: "Timesheet #{@from.strftime('%b %d, %Y')} - #{@to.strftime('%b %d, %Y')}", template: 'api/timelogs/export_timesheet'
            end
        else
            @timelogs = current_user.timelogs.where(date: Date.today.at_beginning_of_month..Date.today.end_of_month)
        end
    end

    def validate_overtime_hours
        if params[:id].present? && params[:timelogs].present?
            @user = User.find(params[:id])
            @user.timelogs.update_timelogs(params[:timelogs])
        else
            render json: { errors: 'Missing parameters' }.to_json
        end
    end

    private

        def timelogs_params
        end
end