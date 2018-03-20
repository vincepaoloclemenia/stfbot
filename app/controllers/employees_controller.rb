class EmployeesController < ApplicationController
    def index
        @timesheet = TimesheetImport.new
    end

    def import_timesheet
        @timesheet = TimesheetImport.new(params[:timesheet_import])
        if @timesheet.save
            if @timesheet.errors.full_messages.to_a.size != 0
                redirect_to employees_path(current_user.company.slug),
                notice: "Timesheet was successfully updated with errors"
                flash[:alert] = @timesheet.errors.full_messages.to_a
            else
                redirect_to employees_path(current_user.company.slug),
                notice: "Timesheet was successfully updated!"
            end
        else
            redirect_to employees_path(current_user.company.slug),
            alert: "#{@timesheet.errors.full_messages}"
        end
    end
end