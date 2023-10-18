<template>
  <div class="card ">
    <div class="card-content pt-0 px-0 pb-0 mb-0" style="overflow: hidden">
        <b-table :mobile-cards="false" :data="this.popularItems.slice(0,5)">
          <b-table-column field="name" label="Do you own these Popular Items?"  v-slot="props">
             <div class="is-flex">
              <item-inspector-wrapper :deactivateHover="false" :showsetsymbol="true" :item="props.row" />
            
              <b-button v-if="props.row.tcg_mid > 0"  size="is-small" variant="contained" type="is-dark" class="ml-auto mr-2" @click="addItem(props.row.emid, 0)">Have</b-button>
              <b-button v-if="props.row.foil_price > 0"  size="is-small" variant="contained" class="mr-2 rainbow-background has-text-white has-text-weight-bold" @click="addItem(props.row.emid,1)"> Have</b-button>
              <b-button icon-left="close" size="is-small" variant="contained" type="is-black"  @click="getRandomItems(5)">Don't</b-button>
            </div>
          </b-table-column>
        </b-table>
    </div>
  </div>
</template>
<script>
import ItemInspectorWrapper from '@/components/items/ItemInspectorWrapper.vue';
import SetTag from '@/components/magic/SetTag.vue';
import { mapState } from 'vuex';

export default{
  components: {
    SetTag,
    ItemInspectorWrapper
  },
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

    },
    addItem: async function (emid,foil=0){
      try {
        const json = await this.$echomtg.inventoryQuickAdd(emid,foil);
        this.$buefy.snackbar.open({
            message: json.message,
            type: 'is-warning',
            queue: false,
            duration: 10000,
            position: 'is-bottom',
            pauseOnHover: true,
            actionText: 'UNDO',
            onAction: async () => {
                const deleted = await this.$echomtg.inventoryDeleteItem(json.inventory_id);
                this.$buefy.snackbar.open({
                  message: `${json.inventory_id} ${deleted.message}`,
                  type: 'is-danger',
                  queue: false
                });
            }
        })
      } catch (err){
        this.$buefy.snackbar.open({
          message: error,
          type: 'is-error',
          position: 'is-top',
        })
      }
    },
  },
  computed: {
    ...mapState([
      'quickstats',
      'user',
      'authenticated'
    ])
  },
  async fetch() {
    await this.fetchPopularItems();
  },

}
</script>

