<template>
  <div>
    <q-input
      float-label="Heading"
      v-model="data.attributes.heading"
      dark
      color="secondary"
    />

    <div class="row">
      <div class="col q-mr-md">
        <q-input
          float-label="Futuristic By At Most"
          v-model="data.attributes.futuristicByAtMost"
          dark
          color="secondary"
        />
      </div>
      <div class="col">
        <q-input
          float-label="Historic By At Least"
          v-model="data.attributes.historicByAtLeast"
          dark
          color="secondary"
        />
      </div>
    </div>

    <q-toggle
      label="Mandatory"
      v-model="data.attributes.mandatory"
      dark
      color="secondary"
      left-label
      class="q-mt-md q-mr-lg"
    />

    <q-toggle
      label="Enabled"
      v-model="data.attributes.enabled"
      dark
      color="secondary"
      left-label
      class="q-mt-md q-mr-lg"
    />

    <q-toggle
      label="Capture Historic"
      v-model="data.attributes.captureHistoric"
      dark
      color="secondary"
      left-label
      class="q-mt-md"
    />
  </div>
</template>

<script>
export default {
  name: 'CardscriptDateTime',
  props: [ 'data' ]
}
</script>

<style>

</style>
