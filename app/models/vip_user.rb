class VipUser < ActiveRecord::Base
  belongs_to :guest_list
end