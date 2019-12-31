class AddPurchasedOnToTransaction < ActiveRecord::Migration[5.2]
  def change
    add_column :transactions, :purchased_on, :date
  end
end
