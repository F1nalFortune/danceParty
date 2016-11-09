class CreateVipUsers < ActiveRecord::Migration
  def change
    create_table :vip_users do |t|
      t.string :first_name
      t.string :last_name
      t.string :phone_number
      t.string :college
      t.string :party
      t.text :questions

      t.timestamps null: false
    end
  end
end
