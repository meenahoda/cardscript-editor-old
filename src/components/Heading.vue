<template>
  <div>
    <q-input
      float-label="Heading"
      v-model="data.attributes.heading"
      color="secondary"
      dark
    />
  </div>
</template>
<script>
export default {
  name: 'QScriptHeading',
  props: [ 'data' ]
}
</script>
