<script lang="ts">
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer.js'
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer.js'
// import Popup from "@arcgis/core/widgets/Popup.js";
import CoordinatesView from './CoordinatesView.vue'
import WeatherView from './WeatherView.vue'

export default {
  name: 'MapView',
  props: {
    baseMap: String
  },
  components: {
    CoordinatesView,
    WeatherView
  },

  data() {
    return {
      latitude: 51.935,
      longitude: 7.652
    }
  },

  mounted: function () {
    const map = new Map({
      basemap: this.baseMap // basemap styles service
    })

    const view = new MapView({
      map: map,
      center: [this.longitude, this.latitude], // Longitude, latitude
      zoom: 5, // Zoom level
      container: 'mapView' // Div element
    })

    view.when(() => {
      console.log('view ready')
    })

    let citiesRenderer = {
      symbol: {
        type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
        style: 'square',
        color: 'blue',
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [255, 255, 0], // 255,255,0 is yellow
          width: 3 // points
        }
      },
      visualVariables: [
        {
          type: 'size',
          field: 'POP',
          minDataValue: 100000,
          maxDataValue: 14000000,
          minSize: 1,
          maxSize: 100
        }
      ]
    }

    const worldCitiesLayer = new FeatureLayer({
      url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Cities/FeatureServer/',
      renderer: new SimpleRenderer(citiesRenderer)
    })

    map.add(worldCitiesLayer)

    view.popupEnabled = false
    view.on('click', (event) => {
      // Get the coordinates of the click on the view
      // around the decimals to 3 decimals
      const lat = Math.round(event.mapPoint.latitude * 1000) / 1000
      const lon = Math.round(event.mapPoint.longitude * 1000) / 1000

      this.latitude = lat
      this.longitude = lon

      // view.popup = new Popup({
      //   dockEnabled: true,
      //   dockOptions: {
      //     position: "top-right",
      //     breakpoint: false
      //   }
      // });

      view.openPopup({
        // Set the popup's title to the coordinates of the clicked location
        title: 'Getroffene Koordinate:',
        location: event.mapPoint
      })

      view.popup.content = 'lat: ' + lat + ', lon: ' + lon
    })
  },
  methods: {
    setLatitude(lat: number) {
      this.latitude = lat
    }
  }
}
</script>

<template>
  <div id="mapView"></div>
  <div id="flying-div">
    <CoordinatesView v-bind:lat="latitude" v-bind:lon="longitude" />
    <WeatherView :lat="latitude" :lon="longitude" />
    <!-- Same again without v-bind prefix -->
  </div>
</template>

<style>
#flying-div {
  position: absolute;
  z-index: 10;
  right: 10px;
  top: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.coordinates-view {
  width: 300px;
  height: 100px;
  background-color: var(--color-background);
  color: var(--color-text);
}
.weather-view {
  width: 300px;
  height: 300px;
  background-color: var(--color-background);
  color: var(--color-text);
}
</style>
