import { shallowMount, createLocalVue } from '@vue/test-utils'
import Ledger from '@/components/Budget/ledger'
import { toCurrency } from '@/utils/filters'

describe('Ledger`.vue', () => {
  let localVue
  beforeEach(() => {
    localVue = createLocalVue()
    localVue.filter('toCurrency', toCurrency)
  })
  it('renders props.msg when passed', () => {

    const wrapper = shallowMount(Ledger, { localVue })

    wrapper.setData({
      transactions: [
        {
          id: 1,
          description: "Betelgeuse's Bioexorcism",
          amountInCents: -999,
          purchasedOn: '2019-10-31'
        },
        { id: 2, description: "CBGBs", amountInCents: -4269, purchasedOn: '2019-11-05' }
      ]
    })
    const dataRows = wrapper.findAll('tr[data-cy="transaction-row"]')
    expect(dataRows.at(0).text()).toMatch("CBGBs")
    expect(dataRows.at(0).text()).toMatch("-$42.69")
    expect(dataRows.at(0).text()).toMatch("2019-11-05")
    expect(dataRows.at(1).text()).toMatch("Betelgeuse's Bioexorcism")
    expect(dataRows.at(1).text()).toMatch("-$9.99")
    expect(dataRows.at(1).text()).toMatch("2019-10-31")

    expect(wrapper.element).toMatchSnapshot(this)
  })
})
