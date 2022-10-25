<template>
    <div class="card">
        <b-table :data="lists" :striped="true">
          <b-table-column field="name" :label="`Your Lists w/ ${this.item.name}`" sortable v-slot="props">
            <a :href="`/tools/lists/${props.row.id}`">{{ props.row.name}}</a>
            <b-tag v-if="props.row.list_item_foil == '1'" class="is-rounded has-background-warning-dark has-text-white">Foil</b-tag>
          </b-table-column>
        </b-table>
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
            cs: '$',

        };

    },

    methods: {
      async getInList() {
        const data = await this.$echomtg.findInList(this.item.emid);
        this.lists = data.lists;

      }


    },
    computed: {
        getAPIURL: function(){
            return `${this.$config.API_DOMAIN}inventory/search/?emid=${this.item.emid}`;
        },
        emid: function(){
            return this.item.emid;
        },

    },
    created () {
        this.getInList();
    }

}
</script>
