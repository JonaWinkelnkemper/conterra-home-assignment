<script lang="ts">
import MapView from './components/MapView.vue'

export default {
  name: 'App',
  components: {
    MapView
  }
}
</script>

<template>
  <MapView baseMap="dark-gray-vector" />
</template>

<style>
@import 'https://js.arcgis.com/4.29/@arcgis/core/assets/esri/themes/light/main.css';
html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
#app {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  display: grid;
  max-width: 100%;
  grid-template-columns: auto;
}
</style>
