<template>
  <q-modal
    v-model="open"
    content-classes="bg-dark q-pa-lg"
  >
    <div class="row">
      <div class="col-10 text-grey q-mt-md">
        Widgets
      </div>
      <div class="col-2 text-right">
        <q-btn icon="close" round flat color="secondary" @click="$emit('close')" />
      </div>
    </div>

    <div class="row">
      <div class="col">
        <q-input
          v-model="data.id"
          float-label="ID"
          dark
          color="secondary"
          :error="errors.id"
        />
        <div class="q-field-bottom">
          <div class="q-field-helper">ID will be camel cased e.g. firstName, phoneNumber</div>
          <div class="q-field-helper">ID cannot start with a number</div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col text-right">
        <q-btn
          icon="send"
          round
          color="secondary"
          @click="$emit('add')"
        />
      </div>
    </div>
  </q-modal>
</template>
<script>
export default {
  name: 'WidgetModal',
  props: ['open', 'data', 'errors']
}
</script>
