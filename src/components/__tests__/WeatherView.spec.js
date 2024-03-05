import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import WeatherView from '../WeatherView.vue'
import opencage from 'opencage-api-client'

vi.mock('opencage-api-client', () => {
  return {
    default: {
      geocode: vi.fn()
    }
  }
})

describe('WeatherView.vue test', () => {
  let wrapper = null

  beforeEach(() => {
    const geocodeResponse = {
      results: [
        {
          components: {
            _normalized_city: 'Erfolgreicher Test'
          }
        }
      ]
    }

    opencage.geocode.mockResolvedValue(geocodeResponse)

    wrapper = shallowMount(WeatherView)
  })

  afterEach(() => {
    opencage.geocode.mockReset()
    wrapper.unmount()
  })

  it('test opencage sdk implementation', async () => {
    await flushPromises()

    expect(wrapper.vm.place).toMatch('Erfolgreicher Test')

    const geocodeResponse = {
      results: [
        {
          components: {
            _normalized_city: 'Noch ein erfolgreicher Test'
          }
        }
      ]
    }

    opencage.geocode.mockResolvedValue(geocodeResponse)

    // test prop watch
    wrapper.setProps({
      lat: 13.37,
      lon: 58.008
    })

    await flushPromises()

    expect(wrapper.vm.place).toMatch('Noch ein erfolgreicher Test')
  })
})
