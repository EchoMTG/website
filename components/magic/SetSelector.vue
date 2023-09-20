<template>
    <b-autocomplete
        :data="filteredDataArray"
        placeholder="Expansion Search"
        icon="text-search-variant"
        field="name"
        rounded
        size="is-small"
        clearable
        v-model="search"
        @select="option => selected = option">
         <template slot-scope="props">
            <div class="media">
                <div class="media-left">
                    <i :class="getSetIcon(props.option.set_code)" />
                </div>
                <div class="media-content">
                    {{ props.option.name}}
                </div>
            </div>
        </template>
        <template #empty>No results found</template>
    </b-autocomplete>
</template>

<script>
    export default {
      props:{
        callback: {
          type: Function
        }
      },
      data() {
          return {
            data: [],
            search: '',
            selected: {
              name: '',
              set_code: ''
            }
          }
        },
        mounted(){
          this.getSets()
        },
        watch: {
          selected() {
            if(this.callback) this.callback(this.selected)
          },
          search() {
            console.log('search in set selector:',this.search)
            if(this.search == '' || this.search == null) {
              console.log('clear detected')
              let empty = {
                name: '',
                set_code: ''
              }
              this.selected = empty
              this.callback(empty)
            }

          }
        },
        methods: {
          async getSets(){
            let sets = await this.$echomtg.getSets()
            this.data = [];
            sets.map(set => this.data.push(set))
          },
          getSetIcon(set_code) {
            return this.$echomtg.setIconClass(set_code)

          }
        },
        computed: {
            filteredDataArray() {
                return this.data.filter((option) => {
                    return option
                        .name
                        .toString()
                        .toLowerCase()
                        .indexOf(this.search.toLowerCase()) >= 0
                })
            }
        }
    }
</script>
