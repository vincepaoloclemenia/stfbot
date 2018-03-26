class TimesheetImport
  
    include ActiveModel::Model
    include ActiveModel::Conversion
    include ActiveModel::Validations

    attr_accessor :file
  
    def initialize(attributes = {})
      attributes.each { |name, value| send("#{name}=", value) }
    end
  
    def persisted?
      false
    end
  
    def save
      excel = open_spreadsheet
      login_entries = ['e_in', 'f_out']
      if excel.sheets.include?('DATA')
        sheet = excel.sheet('DATA')  
        (2..excel.sheet(0).last_row).map do |i|
          if User.find_by_code_num(sheet.cell(i, 'E')).present?
            date = sheet.cell(i, 'A').class == Date ? sheet.cell(i, 'A') : Date.strptime(sheet.cell(i, 'A'), '%m/%d/%Y')                      
            user = User.find_by_code_num(sheet.cell(i, 'E'))
            if ( (date.wday == 0 || date.wday == 6) && login_entries.exclude?(sheet.cell(i, 'D'))) || ( (date.wday >= 1 && date.wday <= 5) && login_entries.include?(sheet.cell(i, 'D')))
              self.errors.add('Invalid entry', " for #{user.full_name}'s timesheet, #{date.strftime('%B %d, %Y')} in Row #{i}")
            else
              @timelog = Timelog.where(user_id: user.id, date: date, shift: sheet.cell(i, 'H'), valid_ot: sheet.cell(i, 'I')).first_or_create 
              if sheet.cell(i, 'D') == 'a_in'
                if @timelog.login.nil?
                  @timelog.update(login: "#{date} #{sheet.cell(i, 'B')}")   
                else
                  next
                end
              elsif sheet.cell(i, 'D') == 'b_out' 
                if @timelog.break_out.nil?
                  @timelog.update(break_out: "#{date} #{sheet.cell(i, 'B')}")   
                else
                  next
                end
              elsif sheet.cell(i, 'D') == 'c_in' 
                if @timelog.break_in.nil? && @timelog.break_out.present?
                  @timelog.update(break_in: "#{date} #{sheet.cell(i, 'B')}")  
                elsif @timelog.break_in? && @timelog.break_out?
                  next
                else
                  self.errors.add("Missing", " break out entry for #{@timelog.user.full_name}'s timesheet, #{@timelog.date.strftime('%B %d, %Y')}, Row: #{i}")
                end
              elsif sheet.cell(i, 'D') == 'd_out'
                if @timelog.logout.nil? && @timelog.login.present?
                  @timelog.update(logout: "#{date} #{sheet.cell(i, 'B')}") 
                elsif @timelog.logout.present? && @timelog.login.present?
                  next
                else
                  self.errors.add("Missing", " login entry for #{@timelog.user.full_name}'s timesheet, #{@timelog.date.strftime('%B %d, %Y')}, Row: #{i}")
                end                
              elsif sheet.cell(i, 'D') == 'e_in'
                if @timelog.overtime_in.nil?
                  @timelog.update(overtime_in: "#{date} #{sheet.cell(i, 'B')}")
                else
                  next
                end
              elsif sheet.cell(i, 'D') == 'f_out'
                if @timelog.overtime_out.nil? && @timelog.overtime_in.present?
                  @timelog.update(overtime_out: "#{date} #{sheet.cell(i, 'B')}")
                elsif @timelog.overtime_out? && @timelog.overtime_in?
                  next
                else
                  self.errors.add("Missing", " overtime in entry for #{@timelog.user.full_name}'s timesheet, #{@timelog.date.strftime('%B %d, %Y')}, Row: #{i}")                
                end
              else
                next
              end
              @timelog.compute_total_pay if @timelog.all_ready?     
            end           
          else
            next
          end 
        end
        true
      else
        errors.add("Sheet ", " named 'DATA' not found")
        false
      end
    end
  
    def open_spreadsheet
      case File.extname(file.original_filename)
        when ".xls" then Roo::Excel.new(file.path)
        when ".xlsx" then Roo::Excelx.new(file.path)
        else raise "Unknown file type: #{file.original_filename}"
      end
    end
end