class GuestList < ActiveRecord::Base
  has_many :vip_users, dependent: :destroy
end