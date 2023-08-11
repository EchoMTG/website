<template>
  <div style="display: inline">
    <b-button :icon-left="icon" :type="styleType" size="is-small" @click="openNote()" />
    <b-modal v-model="isCardModalActive"  :width="640" scroll="keep">
        <div class="card has-background-warning-light" style="box-shadow: 0px 0 10px rgba(0,0,0,.4); margin: 10px">
            <header class="modal-card-head has-background-warning">
              <p class="modal-card-title"><strong v-if="this.noteExists == false">Create</strong> <strong>Note</strong> <strong v-if="this.noteExists == true">Created on {{this.note.created_at}}</strong></p>
               <b-button
                  size="is-small"
                  icon-right="close"
                  @click="isCardModalActive = false"
                  />
            </header>
            <div class="card-content">
                <div class="content">
                  <b-field :label="`Note for ${this.inventory_item.name} from ${this.inventory_item.expansion}`">
                      <b-input v-model="editingNote" maxlength="200" type="textarea"></b-input>
                  </b-field>

                  <b-button v-if="this.noteExists == true" class="is-pulled-right" label="Save Note" type="is-success" icon-left="content-save" @click="saveNote()" />
                  <b-button v-if="this.noteExists == false" class="is-pulled-right" type="is-success" label="Create Note" icon-left="plus" @click="createNote()" />
                  <b-button v-if="this.noteExists == false"  label="Cancel" icon-left="close" @click="isCardModalActive = false" />
                  <b-button v-if="this.noteExists == true"  label="Delete" type="is-danger" icon-left="delete" @click="deleteNote()" />
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
        note: ''
      },
      editingNote: '',
      isCardModalActive: false,
      noteExists: false
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
    async fetchNote(id){
      const data = await this.$echomtg.notesGet(id)
      if(data.note?.id){
        this.noteExists = true
        this.note = data.note
        this.editingNote = this.note.note
      }
    },
    async deleteNote(){
      try {
        const data = await this.$echomtg.notesDelete(this.note.id)
        // default back note
        this.note = {
          note: 'Loading Note'
        }
        this.noteExists = false
        this.isCardModalActive = false
        this.$echomtg.createGrowl(data.message)
        if(this.callback){
          this.callback()
        }
      } catch (err){
        this.$echomtg.createGrowl(err.message)
      }

    },
   async createNote(){
      console.log(this.inventory_item)
      const data = await this.$echomtg.notesCreate(this.inventory_item.inventory_id, this.editingNote)
      this.$echomtg.createGrowl(data.message)
      await this.fetchNote(data.note_id)
      if(this.callback){
        this.callback()
      }


    },
    async saveNote(){
      const data = await this.$echomtg.notesUpdate(this.note.id, this.editingNote)
      this.$echomtg.createGrowl(data.message)
    },
    async openNote(){
      this.isCardModalActive = true
      try {
        if(this.inventory_item.note_id > 0) await this.fetchNote(this.inventory_item.note_id)
      } catch (err){
        this.noteExists = false
      }
    }

  }
}
</script>
