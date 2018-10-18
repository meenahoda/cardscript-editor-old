<template>
  <q-page>
    <q-toolbar color="secondary">
      <q-toolbar-title>
        QScript Editor
      </q-toolbar-title>
      <q-btn icon="more_horiz" round flat dense>
        <q-popover class="bg-tertiary">
          <q-list link dark>
            <q-item v-close-overlay @click.native="openLoad = true">
              <q-item-main label="Import" />
            </q-item>
            <q-item v-close-overlay @click.native="openPreview = true">
              <q-item-main label="Export" />
            </q-item>
          </q-list>
        </q-popover>
      </q-btn>
    </q-toolbar>

    <div>
      <div class="row" style="min-height: calc(100vh - 50px);">
        <div class="col-xl-2 col-3" style="background: #343434;">
          <q-list
            dark
            no-border
          >
            <q-item
              highlight
              v-for="(item, idx) in widgets.options"
              :key="idx"
            >
              <q-item-main :label="item.label" />
              <q-item-side right>
                <q-btn icon="add" flat round dense @click="addingWidget(item.value)" />
              </q-item-side>
            </q-item>
            <q-item-separator />
            <q-item highlight>
              <q-item-main label="Action" />
              <q-item-side right>
                <q-btn icon="add" flat round dense @click="addAction" />
              </q-item-side>
            </q-item>
          </q-list>
        </div>
        <div class="col-xl-10 col-9 q-px-lg q-mb-lg">
          <q-input
            float-label="Title"
            v-model="view.title"
            color="secondary"
            dark
          />

          <div class="text-light q-my-lg">Widgets</div>
          <div v-if="view.widgets.length === 0" class="text-light text-weight-thin">There are no widgets.</div>
          <div v-else>
            <draggable v-model="view.widgets" :options="{ animation: 150, filter: '.ignore-elements' }">
              <q-card
                v-for="(item, idx) in view.widgets"
                :key="idx"
                color="tertiary"
                :class="`q-mb-sm ${nonDraggable.includes(item.type) ? 'ignore-elements' : ''}`"
              >
                <q-card-main>
                  <q-collapsible v-if="!['endSet', 'endSubView'].includes(item.type)">
                    <template slot="header">
                      <q-item-side v-if="!nonDraggable.includes(item.type)" left icon="drag_indicator" style="cursor: move;" />
                      <q-item-side v-else />
                      <q-item-main :label="item.id ? `${item.id} / ${item.type}` : item.type" />
                    </template>
                    <component
                      :is="widgets.result[idx]"
                      :data="view.widgets[idx]"
                      @addOption="addOption(idx)"
                      @removeOption="e => removeOption(idx, e)"
                    />
                    <div class="row">
                      <div class="col text-right">
                        <q-btn icon="delete" flat round dense @click="removeWidget(idx)">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">Remove</q-tooltip>
                        </q-btn>
                      </div>
                    </div>
                  </q-collapsible>

                  <q-item v-if="['endSet', 'endSubView'].includes(item.type)">
                    <q-item-side />
                    <q-item-main :label="item.type" />
                  </q-item>
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

    <load-modal
      :open="openLoad"
      @close="openLoad = !openLoad"
      @load="importing"
    />

    <q-btn
      v-back-to-top
      round
      color="secondary"
      size="lg"
      class="fixed-bottom-right "
      style="margin: 0 15px 15px 0"
      icon="keyboard_arrow_up"
    />
  </q-page>
</template>

<style>
a {
  color: #26a69a;
}
</style>

<script>
/*
TODO:
- when choosing 'OpenURL' action - allow to enter config.url, remove if change action type
*/
import draggable from 'vuedraggable'
import { camelCase, startCase } from 'lodash'

const WidgetModal = () => import('components/modals/Widget.vue')
const PreviewModal = () => import('components/modals/Preview.vue')
const LoadModal = () => import('components/modals/Load.vue')

export default {
  name: 'PageIndex',
  components: {
    draggable,
    WidgetModal,
    PreviewModal,
    LoadModal
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
      nonDraggable: ['set', 'endSet', 'subView', 'endSubView'],
      openPreview: false,
      openLoad: false,
      widgets: {
        open: false,
        options: [
          { label: 'Address', value: 'Address' },
          { label: 'API Lookup', value: 'ApiLookup' },
          { label: 'Button List', value: 'ButtonList' },
          { label: 'Checkbox List', value: 'CheckboxList' },
          { label: 'Currency', value: 'Currency' },
          { label: 'Date', value: 'Date' },
          { label: 'Date Time', value: 'DateTime' },
          { label: 'Expandable Notice', value: 'ExpandableNotice' },
          { label: 'File Upload', value: 'FileUpload' },
          { label: 'Header', value: 'Header' },
          { label: 'Heading', value: 'Heading' },
          { label: 'Horizontal Line', value: 'HorizontalLine' },
          { label: 'Image', value: 'Image' },
          { label: 'Map', value: 'Map' },
          { label: 'Number', value: 'Number' },
          { label: 'Property List', value: 'PropertyList' },
          { label: 'Questionnaire', value: 'Questionnaire' },
          { label: 'Radio', value: 'Radio' },
          { label: 'Rich Text', value: 'Richtext' },
          { label: 'Select', value: 'Select' },
          { label: 'Set', value: 'Set' },
          { label: 'Signature', value: 'Signature' },
          { label: 'Slider', value: 'Slider' },
          { label: 'Sticky Note', value: 'StickyNote' },
          { label: 'Sub View', value: 'SubView' },
          { label: 'Switch', value: 'Switch' },
          { label: 'Table', value: 'Table' },
          { label: 'Text', value: 'Text' },
          { label: 'Text Area', value: 'Textarea' },
          { label: 'Time', value: 'Time' }
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

      if (['checkboxList', 'questionnaire', 'radio', 'select'].includes(type)) {
        widget.attributes.titleMap = []
      }

      if (type === 'set') {
        this.view.widgets.push(widget, { type: 'endSet' })
      } else if (type === 'subView') {
        this.view.widgets.push(widget, { type: 'endSubView' })
      } else {
        this.view.widgets.push(widget)
      }

      this.widgets.open = false
    },
    getWidget (id) {
      const filtered = this.view.widgets.filter(e => e.id === id)
      return filtered.length === 1 ? filtered[0] : null
    },
    removeWidget (idx) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to remove this widget?',
        ok: 'Yes',
        cancel: 'No'
      }).then(() => {
        this.view.widgets.splice(idx, 1)
        this.widgets.result.splice(idx, 1)
      }).catch(() => {})
    },
    addAction () {
      this.view.actions.push({
        title: '',
        style: '',
        type: '',
        config: {}
      })
    },
    importing (view) {
      const parsed = JSON.parse(view)
      if (!parsed.actions) parsed.actions = []
      this.view = parsed
      this.$q.loading.show()
      setTimeout(() => {
        this.openLoad = false
        this.$q.loading.hide()
      }, 2000)
    },
    addOption (idx) {
      this.view.widgets[idx].attributes.titleMap.push({ value: '', title: '' })
    },
    removeOption (widgtIdx, optIdx) {
      this.view.widgets[widgtIdx].attributes.titleMap.splice(optIdx, 1)
    }
  }
}
</script>
