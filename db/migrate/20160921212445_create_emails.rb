class CreateEmails < ActiveRecord::Migration
  def change
    create_table :emails do |t|
      t.string :author

      t.timestamps null: false
    end
  end
end
