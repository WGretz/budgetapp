const filters = {
  budgetToCurrency (value) {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
    if (value === 0)
      return formatter.format(0)
    return formatter.format(-1*value/100)
  }
}

module.exports = filters

