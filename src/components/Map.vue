<template>
  <div>
    <div class="row">
      <div class="col q-pr-md">
        <q-input
          float-label="Heading"
          v-model="data.attributes.heading"
          color="secondary"
          dark
        />
      </div>
      <div class="col">
        <q-input
          float-label="Help"
          v-model="data.attributes.help"
          color="secondary"
          dark
        />
      </div>
    </div>

    <div class="row">
      <div class="col q-pr-md">
        <q-input
          float-label="Centre Latitude Path"
          v-model="data.attributes.centreLatitudePath"
          color="secondary"
          dark
        />
      </div>
      <div class="col">
        <q-input
          float-label="Centre Longitude Path"
          v-model="data.attributes.centreLongitudePath"
          color="secondary"
          dark
        />
      </div>
    </div>

    <div class="row">
      <div class="col q-pr-md">
        <q-input
          float-label="Min. Geometries"
          v-model="data.attributes.minGeometries"
          type="number"
          color="secondary"
          dark
        />
      </div>
      <div class="col">
        <q-input
          float-label="Max. Geometries"
          v-model="data.attributes.maxGeometries"
          type="number"
          color="secondary"
          dark
        />
      </div>
    </div>

    <q-toggle
      label="Enable Location Assist"
      v-model="data.attributes.enableLocationAssist"
      dark
      color="secondary"
      left-label
      class="q-mt-md q-mr-md"
    />

    <q-toggle
      label="Mandatory"
      v-model="data.attributes.mandatory"
      dark
      color="secondary"
      left-label
      class="q-mt-md q-mr-md"
    />

    <q-toggle
      label="Enabled"
      v-model="data.attributes.enabled"
      dark
      color="secondary"
      left-label
      class="q-mt-md q-mr-md"
    />

    <div class="row">
      <div class="col">
        TODO: collectGeometries - array
      </div>
    </div>

    <div class="row">
      <div class="col">
        TODO: pointIconPalette - array
      </div>
    </div>

    <div class="row">
      <div class="col">
        TODO: relatedLayers - array
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'QScriptMap',
  props: [ 'data' ]
}
</script>
