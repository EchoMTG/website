<template>
  <div style="display: inline">
    <b-button :icon-left="icon" :type="styleType" size="is-small" @click="openNote()" />
    <b-modal v-model="isCardModalActive"  :width="640" scroll="keep">
        <div class="card has-background-warning-light" style="box-shadow: 0px 0 10px rgba(0,0,0,.4); margin: 10px">
            <header class="modal-card-head has-background-warning">
              <p class="modal-card-title">Note on <strong>{{this.inventory_item.name}}</strong> from <strong>{{this.inventory_item.expansion}}</strong></p>
               <b-button
                  size="is-small"
                  icon-right="close"
                  @click="isCardModalActive = false"
                  />
            </header>
            <div class="card-content">
                <div class="content">
                    {{note.note}}
                </div>
            </div>
        </div>
    </b-modal>
  </div>
</template>

<script>

export default {
  name: 'MoveToEarningsButton',
  props: {
    callback: {
      type: Function
    },
    inventory_item: {
      type: Object,
      required: true
    }
  },
  data: () => {
    return {
      note: {
        note: 'Loading Note'
      },
      isCardModalActive: false
    }
  },
  computed: {
    icon() {
      return this.inventory_item.note_id > 0 ? 'file-document' : 'file-document-outline'
    },
    styleType() {
      return this.inventory_item.note_id > 0 ? 'is-warning' : ''
    }
  },
  methods: {
    async fetchNote(){
      const res = await this.$echomtg.notesGet(this.inventory_item.note_id)
      this.note = res.note
    },
    async openNote(){
      this.isCardModalActive = true
      if(this.inventory_item.note_id > 0) await this.fetchNote()
    }

  }
}
</script>
