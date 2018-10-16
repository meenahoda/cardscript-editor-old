<template>
  <div>
    <div class="row">
      <div class="col q-pr-md">
        <q-input
          float-label="Heading"
          v-model="data.attributes.heading"
          dark
          color="secondary"
        />
      </div>
      <div class="col">
        <q-input
          float-label="Caption Path"
          v-model="data.attributes.captionPath"
          dark
          color="secondary"
        />
      </div>
    </div>

    <div class="row">
      <div class="col q-pr-md">
        // TODO: formatRestriction
        <!-- <q-chips-input
          v-model="data.attributes.formatRestriction"
        /> -->
      </div>
      <div class="col">
        <q-input
          float-label="Max. File Size"
          v-model="data.attributes.maxFileSize"
          type="number"
          dark
          color="secondary"
        />
      </div>
    </div>

    <div class="row">
      <div class="col q-pr-md">
        <q-input
          float-label="Min. Number of Files"
          v-model="data.attributes.minNumberOfFiles"
          type="number"
          dark
          color="secondary"
        />
      </div>
      <div class="col">
        <q-input
          float-label="Max. Number of Files"
          v-model="data.attributes.maxNumberOfFiles"
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
  name: 'QScriptFileUpload',
  props: [ 'data' ]
}
</script>

<style>

</style>
