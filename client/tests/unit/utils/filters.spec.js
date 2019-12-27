import { expect } from 'chai'
import utils from '@/utils/filters'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    expect(utils.budgetToCurrency(0)).to.equal('$0.00')
    expect(utils.budgetToCurrency(500)).to.equal('-$5.00')
    expect(utils.budgetToCurrency(666)).to.equal('-$6.66')
  })
})
