<template>
    <div class="card">
      <header class="card-header">
          <p class="card-header-title">
              <a @click="isOpen = !isOpen" class="has-text-grey">{{title}} {{lists.length}}</a>
          </p>
          <button
            class="card-header-icon"
            aria-label="collapse item list tools"
            @click="isOpen = !isOpen"
            :aria-expanded="isOpen"
            aria-controls="listToolBox"
            >
            <span class="icon">
                <b-icon v-if="isOpen" icon="menu-down" aria-hidden="true"></b-icon>
                <b-icon v-if="!isOpen" icon="menu-left" aria-hidden="true"></b-icon>
            </span>
          </button>
      </header>
      <div class="card-content py-0 px-3 pb-3">
      <div v-if="this.availablelists.length > 0" >
          <b-select
              :max-height="200"
              v-model="currentList"
              icon="clipboard-list"
              size="is-small"
              expanded

          >

              <option
                  v-for="(menu, index) in this.availablelists"
                  :key="index"

                  :value="menu">

                  {{menu.name}}
              </option >
          </b-select>
          <div class="is-flex mt-2">
          <b-button size="is-small" icon-left="plus" :type="isDarkModeActive == 1 ? 'is-dark' : ''" @click="addToList()">
            Add to List
          </b-button>
          <b-switch  size="is-small" class="pt-2 pl-1 ml-auto"  v-model="foil" type="is-warning" >
            Foil
          </b-switch>
          </div>
        </div>
      </div>
      <b-collapse
            aria-id="listToolBox"
            animation="slide"
            v-model="isOpen">

      <hr class="m-0" />

        <b-table
          :paginated="paginated"
          :per-page="6"
          v-if="lists.length > 0"
          :data="lists"
          :striped="true">
          <b-table-column field="name" :label="`Decks & Lists with ${this.item.name}`" sortable v-slot="props">
            <a :href="`/apps/lists/${props.row.id}`" class="ellipsis">{{ props.row.name}}</a>
            <b-tag v-if="props.row.list_item_foil == '1'" class="is-rounded rainbow-background has-text-white">Foil</b-tag>
          </b-table-column>
          <b-table-column v-slot="props">
            <b-button class="is-pulled-right is-small" @click="removeFromList(props.row.list_item_id,props.row.id)" icon-left="delete"></b-button>
          </b-table-column>


        </b-table>
        <p v-if="lists.length == 0" class="p-5  has-text-grey-light has-text-centered is-size-6">You don't have any {{this.item.name}} from {{this.item.expansion}} in your lists.</p>
      </b-collapse>

    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    name: 'ItemListBox',
    props: {
        item: {
            type: Object,
            default: () => {
                name: ''
            },
        },
        open: {
          type: Boolean,
          default: true
        },
        title: {
          type: String,
          default: 'My Decks/Lists: '
        }
    },
    data: function data() {

        return {
            lists: [],
            isOpen: this.open,
            availablelists: [],
            currentList: {},
            foil: false

        };

    },

    methods: {
      toggleFoil() {
        this.foil = this.foil == 1 ? 0 : 1
      },
      async getInList() {
        const data = await this.$echomtg.findInList(this.item.emid);
        if(data.status == 'success'){
          this.lists = data.lists;
        }

      },
      async getLists() {
        const lists = await this.$echomtg.getAllLists()
        if(lists.status == 'success'){
          this.availablelists = lists.lists;
        }
        this.currentList = this.availablelists.length > 0 ? this.availablelists[0] : {'name' : 'No Lists'};
      },
      async addToList(){
        let foil = this.foil ? 1 : 0;
        const data = await this.$echomtg.addToList(this.item.emid, this.currentList.id, foil);

        this.$buefy.snackbar.open({
            message: data.message,
            type: 'is-success',
            queue: true,
            position: 'is-top',
        })
        this.getInList();
      },
      async removeFromList(list_item_id, list_id){
        const data = await this.$echomtg.removeFromList(list_item_id, list_id);
        this.$buefy.snackbar.open({
            message: data.message,
            type: 'is-warning',
            queue: true,
            position: 'is-top',
        })
        this.getInList();
      }

    },
    computed: {
      paginated() {
            return this.lists.length > 6 ? true : false;
        },
        getAPIURL: function(){
            return `${this.$config.API_DOMAIN}inventory/search/?emid=${this.item.emid}`;
        },
        emid: function(){
            return this.item.emid;
        },
        ...mapState([
          'quickstats',
          'isDarkModeActive'
        ]),
        cs() {
          return this.quickstats.currency_symbol
        }

    },
    created () {
        this.getInList();
        this.getLists();
    }

}
</script>
