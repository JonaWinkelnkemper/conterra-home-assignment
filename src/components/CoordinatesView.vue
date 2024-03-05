<script lang="ts">
export default {
  name: 'CoordinatesView',
  props: ['lat', 'lon']
}
</script>

<template>
  <div class="coordinates-view">
    <p>Getroffene Koordinate:</p>
    <p>
      Latitude: {{ lat }}<br />
      Longitude: {{ lon }}
    </p>
  </div>
</template>

<style></style>
