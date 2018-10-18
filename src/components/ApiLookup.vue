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
          float-label="API Name"
          v-model="data.attributes.apiName"
          color="secondary"
          dark
        />
      </div>
      <div class="col">
        <q-input
          float-label="Label Path"
          v-model="data.attributes.labelPath"
          color="secondary"
          dark
        />
      </div>
    </div>

    <div class="row">
      <div class="col q-pr-md">
        <q-input
          float-label="Result Limit"
          v-model="data.attributes.resultLimit"
          type="number"
          color="secondary"
          dark
        />
      </div>
      <div class="col">
        <q-toggle
          label="Enabled"
          v-model="data.attributes.enabled"
          dark
          color="secondary"
          left-label
          class="q-mt-md q-mr-md"
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
    </div>

    <!-- TODO: params - object -->
  </div>
</template>
<script>
export default {
  name: 'QScriptApiLookup',
  props: [ 'data' ]
}
</script>
