# frozen_string_literal: true

class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
        t.belongs_to :post, index: true
      t.text :body, null: false
      t.timestamps
    end

    add_foreign_key :comments, :posts
  end
end
