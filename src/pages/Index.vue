<template>
  <q-page class="flex flex-center">
    <q-card color="dark no-shadow" style="min-width: 50vw; min-height: 50vh;">
      <q-card-title>QScript Form Editor</q-card-title>
      <q-card-main>
        <q-input
          v-model="form.title"
          float-label="Title"
          dark
          color="secondary"
        />

        <div class="text-light q-my-lg">Widgets</div>
        <div v-if="form.widgets.length === 0">There are no widgets.</div>
        <div v-else>
          <draggable v-model="form.widgets">
            <transition-group name="list-complete">
              <q-card
                v-for="(item, idx) in form.widgets"
                :key="idx"
                color="tertiary"
                class="q-mb-sm list-complete-item"
              >
                <q-card-main>
                  <div class="row">
                    <div class="col text-light">{{ item.id }} /  {{ item.type }}</div>
                    <div class="col text-light text-right">
                      <q-icon name="drag_indicator" style="cursor: move;" />
                    </div>
                  </div>
                  <component
                    :is="widgets.result[idx]"
                    :data="form.widgets[idx]"
                  />
                  <div class="row">
                    <div class="col text-right">
                      <q-btn icon="delete" flat round @click="removeWidget(idx)" />
                    </div>
                  </div>
                </q-card-main>
              </q-card>
            </transition-group>
          </draggable>
        </div>

        <div class="text-light q-my-lg">Actions</div>
        <div v-if="form.actions.length === 0">There are no actions.</div>
        <div v-else>{{form.actions}}</div>
      </q-card-main>
    </q-card>

    <q-fab
      color="secondary"
      icon="add"
      direction="up"
      class="fixed"
      style="right: 18px; bottom: 18px"
    >
      <q-fab-action
        color="secondary"
        icon="code"
        @click="openJSON = !openJSON"
      >
        <q-tooltip anchor="center left" self="center right" :offset="[20, 0]">See JSON</q-tooltip>
      </q-fab-action>

      <q-fab-action
        color="secondary"
        icon="widgets"
        @click="openWidgetsModal"
      >
        <q-tooltip anchor="center left" self="center right" :offset="[20, 0]">Add Widget</q-tooltip>
      </q-fab-action>

      <q-fab-action
        color="secondary"
        icon="more_horiz"
        @click="openActionModal"
      >
        <q-tooltip anchor="center left" self="center right" :offset="[20, 0]">Add Action</q-tooltip>
      </q-fab-action>

      <q-fab-action
        color="secondary"
        icon="remove_red_eye"
      >
        <q-tooltip anchor="center left" self="center right" :offset="[20, 0]">Preview</q-tooltip>
      </q-fab-action>
    </q-fab>

    <q-modal
      v-model="openJSON"
      content-classes="bg-dark q-pa-lg"
    >
      <div class="row">
        <div class="col-10 text-grey q-mt-md">
          QScript JSON
        </div>
        <div class="col-2 text-right">
          <q-btn icon="close" round flat color="secondary" @click="openJSON = !openJSON" />
        </div>
      </div>
      <q-input
        v-bind:value="form | pretty"
        type="textarea"
        readonly
        dark
        color="secondary"
      />
    </q-modal>

    <q-modal
      v-model="actions.open"
      content-classes="bg-dark q-pa-lg"
    >
      <div class="row">
        <div class="col-10 text-grey q-mt-md">
          Actions
        </div>
        <div class="col-2 text-right">
          <q-btn icon="close" round flat color="secondary" @click="actions.open = !actions.open" />
        </div>
      </div>

      <q-input
        v-model="actions.inProgress.title"
        float-label="Title"
        dark
        color="secondary"
        class="q-mb-lg"
      />

      <q-select
        v-model="actions.inProgress.style"
        :options="actions.styles"
        float-label="Style"
        dark
        color="secondary"
        class="q-mb-lg"
      />

      <q-btn-toggle
        v-model="actions.inProgress.type"
        :options="actions.available"
        toggle-color="secondary"
        text-color="white"
        class="q-mb-lg"
      />

      <div class="text-right">
        <q-btn
          icon="send"
          round
          color="secondary"
          @click="addAction"
        />
      </div>
    </q-modal>

    <q-modal
      v-model="widgets.open"
      content-classes="bg-dark q-pa-lg"
    >
      <div class="row">
        <div class="col-10 text-grey q-mt-md">
          Widgets
        </div>
        <div class="col-2 text-right">
          <q-btn icon="close" round flat color="secondary" @click="widgets.open = !widgets.open" />
        </div>
      </div>

      <q-input
        v-model="widgets.inProgress.id"
        float-label="ID"
        dark
        color="secondary"
        :error="widgets.errors.id"
      />
      <div class="q-field-bottom">
        <div class="q-field-helper">ID will be camel cased e.g. firstName, phoneNumber</div>
        <div class="q-field-helper">ID cannot start with a number</div>
      </div>

      <q-select
        v-model="widgets.inProgress.type"
        :options="widgets.available"
        float-label="Type"
        dark
        color="secondary"
        class="q-mb-lg"
        :error="widgets.errors.type"
      />

      <div class="text-right">
        <q-btn
          icon="send"
          round
          color="secondary"
          @click="addWidget"
        />
      </div>
    </q-modal>
  </q-page>
</template>

<style>
.list-complete-item {
  /* transition: all 1s; */
}

.list-complete-enter, .list-complete-leave-active {
  opacity: 0;
}
</style>

<script>
import draggable from 'vuedraggable'
import { camelCase, startCase } from 'lodash'

export default {
  name: 'Index',
  components: { draggable },
  data () {
    return {
      form: {
        title: '',
        widgets: [],
        actions: []
      },
      openJSON: false,
      widgets: {
        open: false,
        available: [
          { label: 'Text', value: 'Text' },
          { label: 'Number', value: 'Number' }
        ],
        inProgress: {},
        errors: {
          id: false,
          type: false
        },
        result: []
      },
      actions: {
        open: false,
        available: [
          { label: 'Open URL', value: 'OpenURL' },
          { label: 'Submit', value: 'Submit' },
          { label: 'Show View', value: 'ShowView' }
        ],
        styles: [
          { label: 'Positive', value: 'positive' },
          { label: 'Negative', value: 'negative' },
          { label: 'Warning', value: 'warning' }
        ],
        inProgress: {},
        errors: {}
      }
    }
  },
  watch: {
    'form.widgets' (arr) {
      this.widgets.result = arr.map(e => {
        const type = startCase(e.type)
        return () => import(`components/${type}.vue`)
      })
    }
  },
  methods: {
    openActionModal () {
      this.actions.open = true
      this.actions.inProgress = {}
    },
    addAction () {},
    openWidgetsModal () {
      this.widgets.open = !this.widgets.open
      this.widgets.inProgress = {}
    },
    addWidget () {
      const { id, type } = this.widgets.inProgress

      this.widgets.errors.id = !id || id.trim().length === 0 || !isNaN(id) || !isNaN(id[0])
      this.widgets.errors.type = !type || type.trim().length === 0

      if (this.widgets.errors.id || this.widgets.errors.type) {
        this.$q.notify({
          type: 'warning',
          position: 'top',
          message: 'A widget requires an ID and type.'
        })

        return
      }

      if (this.getWidget(id)) {
        this.$q.notify({
          type: 'warning',
          position: 'top',
          message: 'Another widget already has this ID.'
        })

        return
      }

      this.form.widgets.push({
        id: camelCase(id),
        type: camelCase(type),
        attributes: {}
      })

      this.$q.notify({
        type: 'positive',
        position: 'top',
        message: 'The widget has been added.'
      })

      this.widgets.open = false
    },
    getWidget (id) {
      const filtered = this.form.widgets.filter(e => e.id === id)
      return filtered.length === 1 ? filtered[0] : null
    },
    removeWidget (idx) {
      this.form.widgets.splice(idx, 1)
      this.widgets.result.splice(idx, 1)
    }
  },
  filters: {
    pretty: json => JSON.stringify(json, null, 2)
  }
}
</script>
