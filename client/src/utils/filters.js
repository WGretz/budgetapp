const filters = {
  toCurrency (value) {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
    return formatter.format(value/100)
  }
}

module.exports = filters

