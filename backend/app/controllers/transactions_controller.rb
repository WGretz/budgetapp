class TransactionsController < ActionController::Base
  skip_before_action :verify_authenticity_token
  before_action :set_transactions, :load_possible_corrections

  def index
    @categories = Category.all.order(:name)
    @spending = Transaction.group(:category_id).debits.sum(:amount_in_cents)
    @spending_this_year = Transaction.this_year.debits.group(:category_id).sum(:amount_in_cents)
  end

  def bulk
    index
  end

  def bulk_update
    @transactions = Transaction.where(id: params[:transactions].keys)
    @transactions.each do |t|
      t.update!(params[:transactions][t.id.to_s].permit!)
    end
    page = params[:filter].present? || params[:category_id].present? ? nil : params[:page]
    redirect_to action: :bulk, page: page, filter: params[:filter], category_id: params[:category_id]
  end

  def update
    @transaction = Transaction.find(params[:id])
    @transaction.update(params[:transaction].permit!)
    redirect_to action: :index, page: params[:page]
  end
private
  def set_transactions
    @transactions = Transaction.page(params[:page]).per(30).includes(:category)
    if params[:category_id].present?
      category_id = params[:category_id] == 'N/A' ? nil : params[:category_id]
      @transactions = @transactions.where(category_id: category_id)
    end
    if params[:filter].present?
      desc_column = Transaction.arel_table[:description]
      @transactions = @transactions.where(desc_column.matches("%#{params[:filter]}%"))
    end
  end

  def load_possible_corrections
    @possible_corrections = Transaction.all.where('original_description <> description').
      where(original_description: @transactions.map { |x| x.original_description }).
      group(:original_description, :description).order('count_all desc').count
    @possible_corrections = @possible_corrections.group_by { |k, _v| k.first }
  end
end
