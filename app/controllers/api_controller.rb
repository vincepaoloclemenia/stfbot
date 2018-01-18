require "application_responder"
class ApiController < ActionController::Base
    self.responder = ApplicationResponder
    respond_to :html

    protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }

    after_action :flash_to_http_header

    helper_method :current_company

    def current_company
        current_user.company
    end

    private
        def flash_to_http_header
            return unless request.xhr?
            return if flash.empty?
            response.headers['X-FlashMessages'] = flash.to_hash.to_json
            flash.discard  # don't want the flash to appear when you reload page
        end

end