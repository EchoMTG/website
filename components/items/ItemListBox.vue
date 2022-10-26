<template>
    <div class="card">
      <header class="card-header">
          <p class="card-header-title">
              Your Lists
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
      <b-collapse
            aria-id="listToolBox"
            animation="slide"
            v-model="isOpen">
      <div class="card-content py-0 px-3">
        <div v-if="this.availablelists.length > 0">
          <b-dropdown
              :min="50" :max="250"
              :scrollable="true"
              :max-height="200"
              v-model="currentList"
              aria-role="list"
          >
              <template #trigger>
                  <b-button
                      :label="currentList.name"
                      icon-left="format-list-checkbox"
                      icon-right="menu-down" />
              </template>


              <b-dropdown-item
                  v-for="(menu, index) in this.availablelists"
                  :key="index"
                  :value="menu" aria-role="listitem">

                  <h3>{{menu.name}}</h3>
              </b-dropdown-item>
          </b-dropdown>
          <b-button icon-left="plus" @click="addToList()">
            Add
          </b-button>
          <b-switch class="pt-2 pl-1"  v-model="foil" type="is-warning" >
            Foil
          </b-switch>
        </div>
      </div>
      <hr class="mt-3 mb-0" />

        <b-table
          :paginated="paginated"
          :per-page="6"
          v-if="lists.length > 0" 
          :data="lists" 
          :striped="true">
          <b-table-column field="name" :label="`Lists with ${this.item.name}`" sortable v-slot="props">
            <a :href="`/tools/lists/${props.row.id}`" class="ellipsis">{{ props.row.name}}</a>
            <b-tag v-if="props.row.list_item_foil == '1'" class="is-rounded has-background-warning-dark has-text-white">Foil</b-tag>
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
export default {
    name: 'ItemListBox',
    props: {
        item: {
            type: Object,
            default: () => {
                name: ''
            },
        },
    },
    data: function data() {

        return {
            lists: [],
            isOpen: true,
            availablelists: [],
            currentList: {},
            foil: false,
            cs: '$',

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
        this.$echomtg.createGrowl(data.message);
        this.getInList();
      },
      async removeFromList(list_item_id, list_id){
        const data = await this.$echomtg.removeFromList(list_item_id, list_id);
        this.$echomtg.createGrowl(data.message);
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

    },
    created () {
        this.getInList();
        this.getLists();
    }

}
</script>
