class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?

  helper_method :current_company

  def current_company
    current_user.company
  end

  private

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [ :role, :first_name, :last_name, :username, :email, :password, :password_confirmation, :remember_me]) 
      devise_parameter_sanitizer.permit(:sign_in, keys: [:login, :username, :email, :password, :remember_me])
      devise_parameter_sanitizer.permit(:account_update, keys: [:username, :email, :password, :password_confirmation, :current_password])
    end
  
  protected
    
    def devise_parameter_sanitizer
      if resource_class == Admin
        Admin::ParameterSanitizer.new(Admin, :admin, params)
      else
        super # Use the default one
      end
    end      

end
