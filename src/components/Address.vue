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
          float-label="Label Path"
          v-model="data.attributes.labelPath"
          color="secondary"
          dark
        />
      </div>
      <div class="col">
        <q-input
          float-label="Result Limit"
          v-model="data.attributes.resultLimit"
          type="number"
          color="secondary"
          dark
        />
      </div>
    </div>

    <div class="row">
      <div class="col q-pr-md">
        <q-toggle
          label="Mandatory"
          v-model="data.attributes.mandatory"
          dark
          color="secondary"
          left-label
          class="q-mt-md"
        />
      </div>
      <div class="col">
        <q-toggle
          label="Enable Location Assist"
          v-model="data.attributes.enableLocationAssist"
          dark
          color="secondary"
          left-label
          class="q-mt-md"
        />
      </div>
    </div>

    <div class="row">
      <div class="col q-pr-md">
        <q-toggle
          label="Enable Unknown Option"
          v-model="data.attributes.enableUnknownOption"
          dark
          color="secondary"
          left-label
          class="q-mt-md"
        />
      </div>
      <div class="col">
        <q-toggle
          label="Enabled"
          v-model="data.attributes.enabled"
          dark
          color="secondary"
          left-label
          class="q-mt-md"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'QScriptAddress',
  props: [ 'data' ]
}
</script>
