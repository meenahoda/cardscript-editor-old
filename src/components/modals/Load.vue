<template>
  <q-modal
    v-model="open"
    content-classes="bg-dark q-pa-lg"
    maximized
  >
    <div class="row">
      <div class="col-10 text-grey q-mt-md">
        Load
      </div>
      <div class="col-2 text-right">
        <q-btn icon="close" round flat color="secondary" @click="$emit('close')" />
      </div>
    </div>

    <div class="row">
      <div class="col">
        <q-input
          float-label="Paste your QScript code here"
          v-model="view"
          type="textarea"
          :max-height="600"
          rows="7"
          dark
          color="secondary"
          class="q-mb-md"
        />
      </div>
    </div>

    <div class="row">
      <div class="col text-right">
        <q-btn label="Load" color="secondary" @click="$emit('load', view)" />
      </div>
    </div>
  </q-modal>
</template>
<script>
export default {
  name: 'LoadModal',
  props: ['open'],
  data () {
    return {
      view: null
    }
  }
}
</script>
