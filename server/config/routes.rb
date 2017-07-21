Rails.application.routes.draw do
  resources :locations
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :events
      resources :users, only: [:create, :index, :show, :update]
      resources :locations
    end
  end
end
