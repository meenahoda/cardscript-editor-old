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
          float-label="Background Image"
          v-model="data.attributes.backgroundImage"
          color="secondary"
          dark
        />
      </div>
    </div>

    <div class="row">
      <div class="col q-pr-md">
        <q-input
          float-label="Background Image Alt Text"
          v-model="data.attributes.backgroundImageAltText"
          color="secondary"
          dark
        />
      </div>
      <div class="col">
        <q-btn-toggle
          v-model="data.attributes.wash"
          :options="[
            { label: 'White Wash', value: 'white' },
            { label: 'Black Wash', value: 'black' }
          ]"
          toggle-color="secondary"
          text-color="white"
          class="q-mt-md"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CardscriptHeader',
  props: [ 'data' ]
}
</script>
