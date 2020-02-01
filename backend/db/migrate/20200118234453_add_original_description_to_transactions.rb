class AddOriginalDescriptionToTransactions < ActiveRecord::Migration[5.2]
  def change
    add_column :transactions, :original_description, :string
  end
end
