import utils from '@/utils/filters'

describe('filters', () => {
  it('renders number as the opposite in currency', () => {
    expect(utils.toCurrency(0)).toEqual('$0.00')
    expect(utils.toCurrency(500)).toEqual('$5.00')
    expect(utils.toCurrency(666)).toEqual('$6.66')
    expect(utils.toCurrency(-10)).toEqual('-$0.10')
  })
})
