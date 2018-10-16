<template>
  <div>
    <div class="row">
      <div class="col q-mr-md">
        <q-input
          float-label="Heading"
          v-model="data.attributes.heading"
          dark
          color="secondary"
        />
      </div>
      <div class="col">
        <q-input
          float-label="Content"
          v-model="data.attributes.content"
          dark
          color="secondary"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QScriptExpandableNotice',
  props: [ 'data' ]
}
</script>

<style>

</style>
