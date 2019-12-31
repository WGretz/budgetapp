# frozen_string_literal: true

class Types::Date < Types::BaseScalar

  def self.coerce_input(input_value, context)
    # Parse the incoming object into a `URI`
    begin
      Date.parse(input_value)
    rescue
      raise GraphQL::CoercionError, "#{input_value.inspect} is not a valid Date"
    end
  end

  def self.coerce_result(ruby_value, context)
    # It's transported as a string, so stringify it
    ruby_value.to_s
  end
end
