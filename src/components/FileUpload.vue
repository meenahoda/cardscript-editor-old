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
        <q-chips-input
          float-label="Format Restriction"
          v-model="data.attributes.formatRestriction"
          dark
          color="secondary"
          chips-color="white"
          chips-bg-color="dark"
        />
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
  name: 'CardscriptFileUpload',
  props: [ 'data' ]
}
</script>

<style>

</style>
