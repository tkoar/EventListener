Rails.application.routes.draw do
  post '/auth', to: 'application#create'
  namespace :api do
    namespace :v1 do
      get '/me', to: 'auth#show'
      resources :comments, except: [:update]
      resources :events, except: [:update]
      resources :users, only: [:create, :index, :show, :update]
      resources :locations
      patch '/events', to: 'events#update'
      patch '/friendship', to: 'friendship#update'
    end
  end
end
