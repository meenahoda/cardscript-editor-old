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
          float-label="Default"
          v-model="data.attributes.default"
          type="number"
          color="secondary"
          dark
        />
      </div>
      <div class="col">
        <q-input
          float-label="Step"
          v-model="data.attributes.step"
          type="number"
          color="secondary"
          dark
        />
      </div>
    </div>

    <div class="row">
      <div class="col q-pr-md">
        <q-input
          float-label="Minimum"
          v-model="data.attributes.minimum"
          type="number"
          color="secondary"
          dark
        />
      </div>
      <div class="col">
        <q-input
          float-label="Maximum"
          v-model="data.attributes.maximum"
          type="number"
          color="secondary"
          dark
        />
      </div>
    </div>

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
      class="q-mt-md"
    />
  </div>
</template>
<script>
export default {
  name: 'QScriptSlider',
  props: [ 'data' ]
}
</script>
