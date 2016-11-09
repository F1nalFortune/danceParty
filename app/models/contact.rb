class Contact < ActiveRecord::Base
  has_many :contacts, dependent: :destroy
end