import utils from '@/utils/filters'

describe('filters', () => {
  it('renders number as the opposite in currency', () => {
    expect(utils.budgetToCurrency(0)).toEqual('$0.00')
    expect(utils.budgetToCurrency(500)).toEqual('-$5.00')
    expect(utils.budgetToCurrency(666)).toEqual('-$6.66')
  })
})
