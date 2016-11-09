class CreateContactDetails < ActiveRecord::Migration
  def change
    create_table :contact_details do |t|
      t.belongs_to :contact
      t.string :first
      t.string :last
      t.string :email
      t.string :request
      t.string :question

      t.timestamps null: false
    end
  end
end
