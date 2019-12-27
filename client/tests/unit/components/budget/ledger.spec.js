import { shallowMount, createLocalVue } from '@vue/test-utils'
import Ledger from '@/components/Budget/ledger'
import { budgetToCurrency } from '@/utils/filters'

describe('Ledger`.vue', () => {
  let localVue
  beforeEach(() => {
    localVue = createLocalVue()
    localVue.filter('budgetToCurrency', budgetToCurrency)
  })
  it('renders props.msg when passed', () => {

    const wrapper = shallowMount(Ledger, { localVue })

    wrapper.setData({
      transactions: [
        { id: 1, description: "Betelgeuse's Bakery For The Recently deceased", amountInCents: 999 },
        { id: 2, description: "CBGBs", amountInCents: 4269 }
      ]
    })
    expect(wrapper.element).toMatchSnapshot(this)
  })
})
