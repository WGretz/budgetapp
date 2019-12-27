import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Ledger from '@/components/Budget/ledger'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Ledger, {
    })

    expect(wrapper.text()).to.include('')
  })
})
