<template>
  <q-page>
    <q-toolbar color="secondary">
      <q-toolbar-title>
        QScript View Editor
      </q-toolbar-title>
      <!-- TODO: buttons for quick view/full view -->
      <q-btn icon="code" @click="preview" flat round dense />
    </q-toolbar>

    <div>
      <div class="row" style="min-height: calc(100vh - 50px);">
        <div class="col-xl-2 col-3" style="background: #343434;">
          <q-list
            dark
            no-border
          >
            <q-item
              v-for="(item, idx) in widgets.options"
              :key="idx"
            >
              <q-item-main :label="item.label" />
              <q-item-side right>
                <q-btn icon="add" flat round dense @click="addingWidget(item.value)" />
              </q-item-side>
            </q-item>
            <q-item-separator />
            <q-item>
              <q-item-main label="Action" />
              <q-item-side right>
                <q-btn icon="add" flat round dense @click="addAction" />
              </q-item-side>
            </q-item>
          </q-list>
        </div>
        <div class="col-xl-10 col-9 q-px-lg q-mb-lg">
          <div class="text-light q-my-lg">Widgets</div>
          <div v-if="view.widgets.length === 0" class="text-light text-weight-thin">There are no widgets.</div>
          <div v-else>
            <draggable v-model="view.widgets">
              <q-card
                v-for="(item, idx) in view.widgets"
                :key="idx"
                color="tertiary"
                class="q-mb-sm"
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
                    :data="view.widgets[idx]"
                  />
                  <div class="row">
                    <div class="col text-right">
                      <q-btn icon="delete" flat round @click="removeWidget(idx)">
                        <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">Remove</q-tooltip>
                      </q-btn>
                    </div>
                  </div>
                </q-card-main>
              </q-card>
            </draggable>
          </div>

          <div class="text-light q-my-lg">Actions</div>
          <div v-if="view.actions.length === 0" class="text-light text-weight-thin">There are no actions.</div>
          <div v-else>
            <q-card
              v-for="(item, idx) in view.actions"
              :key="idx"
              color="tertiary"
              class="q-mb-sm"
            >
              <q-card-main>
                <div class="row">
                  <div class="col">
                    <q-input
                      v-model="item.title"
                      float-label="Title"
                      class="q-mr-md"
                      color="secondary"
                      dark
                    />
                  </div>
                  <div class="col">
                    <q-select
                      v-model="item.style"
                      :options="actions.styles"
                      float-label="Style"
                      dark
                      color="secondary"
                      class="q-mb-lg"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <q-btn-toggle
                      v-model="item.type"
                      :options="actions.options"
                      toggle-color="secondary"
                      text-color="white"
                    />
                  </div>
                  <!-- TODO: config - dependant on type - need to delete if switch away from OpenURL -->
                </div>
              </q-card-main>
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <widget-modal
      :open="widgets.open"
      :data="widgets.inProgress"
      :errors="widgets.errors"
      @close="widgets.open = !widgets.open"
      @add="addWidget"
    />

    <preview-modal
      :open="openPreview"
      :data="view"
      @close="openPreview = !openPreview"
    />

  </q-page>
</template>

<style>
a {
  color: #26a69a;
}
</style>

<script>
import draggable from 'vuedraggable'
import { camelCase, startCase } from 'lodash'

const WidgetModal = () => import('components/modals/Widget.vue')
const PreviewModal = () => import('components/modals/Preview.vue')

export default {
  name: 'PageIndex',
  components: {
    draggable,
    WidgetModal,
    PreviewModal
  },
  watch: {
    'view.widgets' (arr) {
      this.widgets.result = arr.map(e => {
        const type = startCase(e.type).replace(/\s+/g, '')
        return () => import(`components/${type}.vue`)
      })
    }
  },
  data () {
    return {
      view: {
        title: '',
        widgets: [],
        actions: []
      },
      openPreview: false,
      widgets: {
        open: false,
        options: [
          // Address
          // ApiLookup
          // ButtonList
          // CheckboxList
          // Currency
          { label: 'Date', value: 'Date' },
          { label: 'Date Time', value: 'DateTime' },
          // EndSet
          // EndSubView
          { label: 'Expandable Notice', value: 'ExpandableNotice' },
          { label: 'File Upload', value: 'FileUpload' },
          // Header
          // Heading
          // HorizontalLine
          // Image
          // Map
          { label: 'Number', value: 'Number' },
          // PropertyList
          // Questionnaire
          // Radio
          // RichText
          // Select
          // Set
          // Signature
          // Slider
          // StickyNote
          // SubView
          // Switch
          // Table
          { label: 'Text', value: 'Text' }
          // TextArea
          // Time
        ],
        inProgress: {},
        errors: {
          id: false,
          type: false
        },
        result: []
      },
      actions: {
        options: [
          { label: 'Open URL', value: 'OpenURL' },
          { label: 'Submit', value: 'Submit' },
          { label: 'Show View', value: 'ShowView' }
        ],
        styles: [
          { label: 'Positive', value: 'positive' },
          { label: 'Negative', value: 'negative' },
          { label: 'Warning', value: 'warning' }
        ]
      }
    }
  },
  methods: {
    addingWidget (type) {
      this.widgets.inProgress = { id: '', type: camelCase(type) }
      this.widgets.open = true
    },
    addWidget () {
      const { id, type } = this.widgets.inProgress

      this.widgets.errors.id = !id || id.trim().length === 0 || !isNaN(id) || !isNaN(id[0])

      if (this.widgets.errors.id) {
        this.$q.notify({
          type: 'warning',
          position: 'top',
          message: 'An ID is required.'
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

      const widget = {
        id: camelCase(id),
        type,
        attributes: {}
      }

      if (type === 'fileUpload') {
        widget.attributes.formatRestriction = []
      }

      this.view.widgets.push(widget)

      this.$q.notify({
        type: 'positive',
        position: 'top',
        message: 'The widget has been added.'
      })

      this.widgets.open = false
    },
    getWidget (id) {
      const filtered = this.view.widgets.filter(e => e.id === id)
      return filtered.length === 1 ? filtered[0] : null
    },
    removeWidget (idx) {
      this.view.widgets.splice(idx, 1)
      this.widgets.result.splice(idx, 1)
    },
    addAction () {
      this.view.actions.push({
        title: '',
        style: '',
        type: '',
        config: {}
      })
    },
    preview () {
      this.openPreview = true
    }
  }
}
</script>
