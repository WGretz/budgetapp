import { mount } from '@vue/test-utils'
import Vue from 'vue';
import Ledger from '@/components/Budget/ledger'
import { toCurrency } from '@/utils/filters'
import Vuetify from 'vuetify'

describe('Ledger`.vue', () => {
  let wrapper
  beforeEach(() => {
    Vue.use(Vuetify)
    Vue.filter('toCurrency', toCurrency)
    wrapper = mount(Ledger, {})
  })
  it('renders props.msg when passed', async () => {

    wrapper.setData({
      transactions: [
        {
          id: 1,
          description: "Betelgeuse's Bioexorcism",
          amountInCents: -999,
          purchasedOn: '2019-10-31',
          accountId: 1,
        },
        {
          id: 2,
          description: "CBGBs",
          amountInCents: -4269,
          purchasedOn: '2019-11-05',
          accountId: 2,
        }
      ],
      accounts: [
        { id: 1, name: 'Bank'}
      ]
    })
    await setTimeout()
    const dataRows = wrapper.findAll('tr[data-cy="transaction-row"]')
    expect(dataRows.at(0).text()).toMatch("CBGBs")
    expect(dataRows.at(0).text()).toMatch("-$42.69")
    expect(dataRows.at(0).text()).toMatch("11/05/2019")
    expect(dataRows.at(0).text()).toMatch('Bank')

    expect(wrapper.element).toMatchSnapshot(this)
  })
})
