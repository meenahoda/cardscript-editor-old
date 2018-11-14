<template>
  <div>
    <q-input
      float-label="Heading"
      v-model="data.attributes.heading"
      color="secondary"
      dark
    />
    <div>TODO: properties - array</div>
  </div>
</template>
<script>
export default {
  name: 'CardscriptPropertyList',
  props: [ 'data' ]
}
</script>
