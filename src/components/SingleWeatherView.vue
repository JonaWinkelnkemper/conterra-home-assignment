<script lang="ts">
export default {
  name: 'WeatherView',
  props: ['dateTime', 'temp', 'description', 'rainProb'],
  methods: {
    convertUnixTimestampToString(timestamp: number): string {
      const date = new Date(timestamp * 1000) // Convert seconds to milliseconds
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')

      return `${day}.${month}.${year} ${hours}:${minutes} Uhr`
    }
  }
}
</script>

<template>
  <hr />
  <p>{{ convertUnixTimestampToString(dateTime) }}</p>
  <p>{{ description }} mit {{ rainProb * 100 }}% auf Regen. {{ temp }}°C</p>
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
