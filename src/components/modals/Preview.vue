<template>
  <q-modal
    v-model="open"
    content-classes="bg-dark q-pa-lg"
    maximized
  >
    <div class="row">
      <div class="col-10 text-grey q-mt-md">
        QScript JSON
      </div>
      <div class="col-2 text-right">
        <q-btn icon="close" round flat color="secondary" @click="$emit('close')" />
      </div>
    </div>

    <div class="row">
      <div class="col text-faded">
        To see this view rendered, paste the following code into the
          <a href="https://wmfs.github.io/qscript/" target="_blank">QScript Playpen</a>.
      </div>
    </div>

    <div class="row">
      <div class="col">
        <q-input
          ref="viewJSON"
          v-bind:value="JSON.stringify(data, null, 2)"
          type="textarea"
          :max-height="600"
          rows="7"
          readonly
          dark
          color="secondary"
          class="q-mb-md"
        />
      </div>
    </div>

    <div class="row">
      <div class="col text-right">
        <q-btn label="copy" color="secondary" @click="copyToClipboard">
          <q-tooltip anchor="center left" self="center right" :offset="[20, 0]">Copy to clipboard</q-tooltip>
        </q-btn>
      </div>
    </div>
  </q-modal>
</template>
<script>
export default {
  name: 'PreviewModal',
  props: ['open', 'data'],
  methods: {
    copyToClipboard () {
      this.$refs['viewJSON'].select()
      document.execCommand('copy')
      this.$q.notify({
        type: 'info',
        position: 'top',
        message: 'Copied to clipboard.'
      })
    }
  }
}
</script>
