<template>
    <div class="card">
        ITEMS
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
            items: [],
            actions: 0,
            cs: '$',
            acquiredAddPrice: 0.01,
            acquiredAddFoilPrice: 0.01

        };

    },

    methods: {
      async getInList() {
        // /api/lists/find_in_list/?emid=104517
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
