class Admin::ParameterSanitizer < Devise::ParameterSanitizer
    def initialize(*)
      super
      permit(:sign_up, keys: [:first_name, :last_name, :username, :email, :password, :password_confirmation, :remember_me])
      permit(:sign_in, keys: [:login, :username, :email, :password, :remember_me])
      permit(:account_update, keys: [:username, :email, :password, :password_confirmation, :current_password])
    end
end