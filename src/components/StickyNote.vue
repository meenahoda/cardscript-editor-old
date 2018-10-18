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
        <q-btn-toggle
          v-model="data.attributes.style"
          :options="[
            { label: 'Normal', value: 'normal' },
            { label: 'Informative', value: 'informative' },
            { label: 'Danger', value: 'danger' }
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
  name: 'QScriptStickyNote',
  props: [ 'data' ]
}
</script>
