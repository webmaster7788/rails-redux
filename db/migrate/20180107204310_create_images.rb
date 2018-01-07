class CreateImages < ActiveRecord::Migration[5.0]
  def change
    create_table :images do |t|
      t.string :image
      t.integer :user_id
      t.integer :post_id
    end

    add_index :images, :post_id
    add_index :images, :user_id
  end
end
