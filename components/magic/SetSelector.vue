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
import {mapState} from 'vuex'
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
        async mounted(){
          await this.getSets()
        },
        watch: {
          selected() {
            if(this.callback) this.callback(this.selected)
          },
          search() {

            if(this.search == '' || this.search == null) {
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

            if(this.sets.length > 0){
              this.data = this.sets;
            }

            try{
              const setsData = await this.$echomtg.getSets();
              this.$store.commit('sets',setsData)
              this.data = setsData;
            } catch(err){
              console.log(err)
            }
          },
          getSetIcon(set_code) {
            return this.$echomtg.setIconClass(set_code)

          }
        },
        computed: {
          ...mapState([
            'sets'
          ]),
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
