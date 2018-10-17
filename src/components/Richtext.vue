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
          float-label="Min. Characters"
          v-model="data.attributes.minCharacters"
          type="number"
          dark
          color="secondary"
        />
      </div>
      <div class="col">
        <q-input
          float-label="Max. Characters"
          v-model="data.attributes.maxCharacters"
          type="number"
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
  name: 'QScriptRichText',
  props: [ 'data' ]
}
</script>

<style>

</style>
