class AddBankIdToTransaction < ActiveRecord::Migration[5.2]
  def change
    add_column :transactions, :bank_id, :string
  end
end
