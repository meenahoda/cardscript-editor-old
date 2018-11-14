<template>
  <div>
    <q-input
      float-label="Heading"
      v-model="data.attributes.heading"
      dark
      color="secondary"
    />

    <div class="row">
      <div class="col">
        <div v-if="data.attributes.titleMap.length === 0" class="q-mt-md">
          No options have been added.
        </div>
        <div
          v-for="(item, idx) in data.attributes.titleMap"
          :key="idx"
          class="q-mt-md"
        >
          <div class="row">
            <div class="col-1 text-light text-weight-thin">Option {{idx + 1}}</div>
            <div class="col q-pr-md">
              <q-input
                float-label="Title"
                v-model="item.title"
                style="padding-top: 0px;"
                color="secondary"
                dark
              />
            </div>
            <div class="col">
              <q-input
                float-label="Value"
                v-model="item.value"
                style="padding-top: 0px;"
                color="secondary"
                dark
              />
            </div>
            <div class="col-1 text-right">
              <q-btn
                icon="delete"
                color="faded"
                flat
                dense
                round
                @click="$emit('removeOption', idx)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col text-right">
        <q-btn
          label="Add option"
          class="q-mt-md"
          color="secondary"
          dense
          @click="$emit('addOption')"
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
  name: 'CardscriptQuestionnaire',
  props: [ 'data' ]
}
</script>
