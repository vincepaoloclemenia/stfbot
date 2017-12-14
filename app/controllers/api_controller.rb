require "application_responder"
class ApiController < ActionController::Base
    self.responder = ApplicationResponder
    respond_to :html

    protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }

end