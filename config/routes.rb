Rails.application.routes.draw do
  resources :emails
  devise_for :admins
  get 'home/index'

  devise_for :users
  root 'home#enter'
  resources :vip_users
  resources :contact_details
  get 'static_pages/Contact'
  get 'static_pages/DanceFloors'
  get 'static_pages/DanceParty'
  get 'static_pages/Directions'
  get 'static_pages/GuestList'
  get 'static_pages/Pictures'
  get 'all_vip_users', to: 'vip_users#vip_users'
  get 'all_contact_details', to: 'contact_details#contact_details'
  get 'vip_users', to: 'vip_users#vip_users'
  post 'vip_users', to: 'vip_users#vip_users'
end
