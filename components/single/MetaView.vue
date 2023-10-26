<template>
<div class="columns">
    <div class="column">
          <div class="container">


               <div class="field is-horizontal">
                  <div class="field-label is-normal">
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <p class="control">
                        <h1 class="title mt-5 mb-3">Edit Your Deck/List Meta Data</h1>
                      </p>
                    </div>
                  </div>
                </div>

              <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">List Name</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <p class="control">
                          <input class="input large" type="text" v-model="name"></input>
                      </p>
                    </div>
                  </div>
                </div>
              <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Description (links ok)</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <p class="control">
                        <textarea class="textarea" rows="6" v-model="description"></textarea>
                      </p>
                    </div>
                  </div>
                </div>

                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <p class="control">
                        <button class="button is-primary" @click="() => updateList()" :disabled="dirty == false">Save Changes</button>
                      </p>
                    </div>
                  </div>
                </div>


          </div>
    </div>
</div>
</template>

<script>
export default {
  props: ['list'],
  data: function data() {
    return {
      name: '',
      description: '',
      dirty: false
    }
  },
  mounted(){
      this.name = this.list.name;
      this.description = this.list.description;

  },
  watch: {
      name: function () {
          if(this.list.name == this.name) {
              this.dirty = false
          } else {
              this.dirty = true
          }
      },
      description: function () {
          if(this.list.description == this.description) {
              this.dirty = false
          } else {
              this.dirty = true
          }
      },
  },
  methods: {
      async updateList() {
        const data = await this.$echomtg.editListMeta(this.list.id, this.name, this.description);
        this.$buefy.toast.open({
          message: `${data.message}`,
          type: 'is-success'
        })
      }
  }
}
</script>

<style>
</style>
