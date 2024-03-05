<script lang="ts">
import SingleWeatherView from './SingleWeatherView.vue'
import opencage from 'opencage-api-client'

export default {
  name: 'WeatherView',
  props: ['lat', 'lon'],
  components: {
    SingleWeatherView
  },
  data() {
    return {
      place: 'Für eine Wettervorhersage bitte klicken',
      weatherList: [] as {
        dt: number
        weather: { description: string }
        main: { temp: number }
        pop: number
      }[]
    }
  },

  mounted() {
    this.fetchPlaceName()
    this.fetchWeatherList()
  },

  watch: {
    // watches the lat prop for changes
    lat: function () {
      this.fetchPlaceName()
      this.fetchWeatherList()
    }
  },

  methods: {
    // TODO Do not have Secrets in Source Code or Commits
    // TODO Error Handling
    fetchPlaceName() {
      opencage
        .geocode({ q: this.lat + ', ' + this.lon, language: 'de' })
        .then((data) => (this.place = data.results[0].components._normalized_city))
    },

    fetchWeatherList() {
      fetch(
        'http://api.openweathermap.org/data/2.5/forecast?lat=' +
          this.lat +
          '&lon=' +
          this.lon +
          '&appid=' +
          import.meta.env.VITE_OPEN_WEATHER_API_KEY +
          '&units=metric'
      )
        .then((response) => response.json())
        .then((data) => (this.weatherList = data.list))
    }
  }
}
</script>

<template>
  <div class="weather-view">
    <p>Wettervorhersage für: {{ place }}</p>
    <div class="scroll-weather" v-if="weatherList.length > 0">
      <SingleWeatherView
        v-for="item in weatherList"
        :key="item.dt"
        v-bind:date-time="item.dt"
        v-bind:description="item.weather.description"
        v-bind:temp="item.main.temp"
        v-bind:rain-prob="item.pop"
      />
    </div>
  </div>
</template>

<style>
.scroll-weather {
  /* margin: 4px, 4px;
    padding: 4px; */
  width: 100%;
  height: 270px;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: justify;
}
</style>
