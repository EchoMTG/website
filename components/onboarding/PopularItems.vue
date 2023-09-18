<template>

  <div class="columns message is-info ml-3">
    <div class="column is-half content pl-3">
      <h3>Do you own these Popular Items?</h3>

    </div>
    <div class="column is-half">
      <b-table :data="randomItems">
         <b-table-column field="name" label="Name" sortable v-slot="props">
              <set-tag class="is-hidden-desktop is-pulled-left mr-1" :code="props.row.set_code" :name="props.row.set" :url="props.row?.echo_set_url ? props.row.echo_set_url :''"/>
              <item-inspector-wrapper :deactivateHover="false" :showsetsymbol="true" :item="props.row" />
          </b-table-column>
      </b-table>
    </div>
  </div>
</template>
<script>
export default{
  name: 'PopularItems',
  data: () => {
    return {
       popularItems: []
    }
  },
  methods: {
    goto(url) {
      this.$router.push({ path: url });
    },
    getRandomItems(n=5){
      if (this.popularItems.length == 0) return []
      // Shuffle array
      const shuffled = this.popularItems.sort(() => 0.5 - Math.random());

      // Get sub-array of first n elements after shuffled
      return shuffled.slice(0, n);
    },
    async fetchPopularItems(){
      this.popularItems = await this.$echomtg.getPopularItems()
    }
  },
  computed: {
    randomItems() {
      return this.getRandomItems(5);
    }
  },
  async mounted() {
    await this.fetchPopularItems();
  },

}
</script>

