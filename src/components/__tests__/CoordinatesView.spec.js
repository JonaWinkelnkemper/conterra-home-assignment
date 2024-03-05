import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import CoordinatesView from '../CoordinatesView.vue'

describe('CoordinatesView.vue Test', () => {
  let wrapper = null

  beforeEach(() => {
    wrapper = shallowMount(CoordinatesView, {
      props: {
        lat: 12.345,
        lon: 67.89
      }
    })
  })

  it('initializes with correct elements', () => {
    expect(wrapper.findAll('p').length).toEqual(2)
    expect(wrapper.findAll('p').at(0).text()).toMatch('Getroffene Koordinate:')
    expect(wrapper.findAll('p').at(1).text()).toMatch('Latitude: 12.345 Longitude: 67.89')
  })

  it('processes valid props data', async () => {
    wrapper.setProps({
      lat: 13.37,
      lon: 58.008
    })

    // Wait until the DOM updates
    await flushPromises()

    expect(wrapper.findAll('p').length).toEqual(2)
    expect(wrapper.findAll('p').at(0).text()).toMatch('Getroffene Koordinate:')
    expect(wrapper.findAll('p').at(1).text()).toMatch('Latitude: 13.37 Longitude: 58.008')
  })
})
