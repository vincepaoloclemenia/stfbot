class Api::TimelogsController < Api::BaseController

    def index
        #@log = current_user.todays_log
        #@logged_in = current_user.logged_in?
        #@logged_out = current_user.logged_out?
        #@taken_break = current_user.taken_break?
        #@end_of_break = current_user.end_of_break?    
        #render json: { timeLog: @log, hasLoggedIn: @logged_in, hasLoggedOut: @logged_out, hasTakenBreak: @taken_break, hasReturned: @end_of_break }        
        @timelogs = current_user.timelogs
        @unvalidated_timelogs = current_user.timelogs.unvalidated_overtime
    end

    def create
    end

    def update
    end

    private

        def timelogs_params
        end
end