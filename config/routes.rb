Rails.application.routes.draw do
  root to: 'pages#index'
  devise_for :admins, path: 'admins'
  devise_for :users
  resources :users do 
    get :profile, on: :collection, as: :user_profile
  end
  resources :admins, except: [:create, :destroy, :new]
  resources :companies

  namespace :api do
    resources :companies, only: :index
    resources :users, only: [:index, :create, :destroy, :update] do
      delete :delete_picture, on: :collection
    end
    resources :educations, only: [:index, :new, :create, :destroy, :update] do
      get :get_options, on: :collection
    end
    resources :skills, only: [:index, :create, :destroy, :update]
    resources :work_experiences
  end
  
  get 'add_user' => 'companies#add_user', as: :add_user  
  get 'users/:username' => 'users#show', as: :profile
  get '/dashboard' => 'dashboard#index', as: :dashboard
  get 'user_signup' => 'pages#user_signup', as: :register
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
