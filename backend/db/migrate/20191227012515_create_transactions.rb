class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.string :description
      t.integer :amount_in_cents

      t.timestamps
    end
  end
end
