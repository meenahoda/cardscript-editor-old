<template>
  <div>
    <q-input
      float-label="Heading"
      v-model="data.attributes.heading"
      dark
      color="secondary"
    />

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
  name: 'QScriptText',
  props: [ 'data' ]
}
</script>

<style>

</style>
