Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post '/auth', to: 'application#create'
  namespace :api do
    namespace :v1 do
      get '/me', to: 'auth#show'
      resources :events, except: [:update]
      resources :users, only: [:create, :index, :show, :update]
      resources :locations
      patch '/events', to: 'events#update'
    end
  end
end
