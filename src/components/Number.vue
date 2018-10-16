<template>
  <div>
    <q-input
      float-label="Heading"
      v-model="data.attributes.heading"
      dark
      color="secondary"
    />

    <div class="row">
      <div class="col q-pr-md">
        <q-input
          float-label="Default"
          v-model="data.attributes.default"
          dark
          color="secondary"
        />
      </div>
      <div class="col q-pr-md">
        <q-input
          float-label="Minimum"
          v-model="data.attributes.minimum"
          dark
          color="secondary"
        />
      </div>
      <div class="col">
        <q-input
          float-label="Maximum"
          v-model="data.attributes.maximum"
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
      class="q-mt-md"
    />
  </div>
</template>

<script>
export default {
  name: 'QScriptNumber',
  props: [ 'data' ]
}
</script>

<style>

</style>
