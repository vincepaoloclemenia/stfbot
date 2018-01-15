Rails.application.routes.draw do
  root to: 'pages#index'
  devise_for :admins, path: 'admins'
  devise_for :users
  resources :users do 
    get :profile, on: :collection, as: :user_profile
  end
  resources :admins, except: [:create, :destroy, :new]
  resources :clients, only: [:index, :show]
  resources :companies, only: [:index, :show] do
    resources :jobs, only: [:index, :show]
  end
  resources :employees, only: :index
  resources :inquiries, only: :index
  resources :applicants, only: :index
  
  namespace :api do
    resources :autocomplete, only: :index
    resources :companies, only: [:update] do
      get :get_company_profile, on: :collection
      get :get_countries, on: :collection
      get :get_states, on: :collection
      get :get_cities, on: :collection
      patch :update_overview, on: :collection
    end
    resources :jobs
    resources :dashboard, only: [] do
      get :check_company_profile, on: :collection
    end
    resources :clients, except: :show do 
      get :get_countries, on: :collection
      get :get_states, on: :collection
      get :get_cities, on: :collection
    end
    resources :users, only: [:index, :create, :destroy, :update] do
      get :user_profile, on: :collection
      get :get_countries, on: :collection
      get :get_states, on: :collection
      get :get_cities, on: :collection
      get :get_date, on: :collection
      get :get_resume, on: :collection
      put :upload_resume, on: :collection
      put :upload_avatar, on: :collection
      delete :delete_picture, on: :collection
      delete :delete_resume, on: :collection
    end
    resources :educations, only: [:index, :new, :create, :destroy, :update] do
      get :get_options, on: :collection
    end
    resources :inquiries, only: [:index, :create, :destroy, :new]

    resources :employees, only: [:index, :create, :update, :destroy] do
      get :employers, on: :collection
      get :finance_admins, on: :collection
    end
    resources :skills, only: [:index, :create, :destroy, :update]
    resources :work_experiences

  end
  
  get '/:slug/jobs' => 'jobs#jobs', as: :jobs
  get 'inquire' => 'pages#inquire', as: :inquire
  get 'add_user' => 'companies#add_user', as: :add_user  
  get 'users/:username' => 'users#show', as: :profile
  get '/dashboard' => 'dashboard#index', as: :dashboard
  get 'user_signup' => 'pages#user_signup', as: :register
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
