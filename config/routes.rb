Rails.application.routes.draw do
  root to: 'pages#index'
  devise_for :admins, path: 'admins'
  devise_for :users
  resources :users, except: :show
  resources :admins, except: [:create, :destroy, :new]
  resources :companies

  namespace :api do
    resources :companies, only: :index
  end
  
  get 'add_user' => 'companies#add_user', as: :add_user  
  get 'users/:username' => 'users#show', as: :profile
  get '/dashboard' => 'dashboard#index', as: :dashboard
  get 'user_signup' => 'pages#user_signup', as: :register
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
