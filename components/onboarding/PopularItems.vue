<template>
  <div class="card ">
    <div class="card-content pt-1 px-3">
        <b-table :data="this.popularItems.slice(0,4)">
          <b-table-column field="name" label="Do you own these Popular Items?" sortable v-slot="props">
            <set-tag class="is-hidden-desktop is-pulled-left mr-1" :code="props.row.set_code" :name="props.row.set" :url="props.row?.echo_set_url ? props.row.echo_set_url :''"/>
            <item-inspector-wrapper :deactivateHover="false" :showsetsymbol="true" :item="props.row" />
          </b-table-column>
          <b-table-column field="tcg_mid"  width="130" :label="`Regular`" sortable v-slot="props">

            <b-field class="level-item" style="margin-bottom: 0 !important;" v-if="props.row.tcg_mid > 0">
              <p class="control">
                  <b-button v-if="props.row.tcg_mid" icon-left="plus" size="is-small" variant="contained" type="is-dark" @click="addItem(props.row.emid, 0)"></b-button>
              </p>
              <b-input
               :value="`${quickstats.currency_symbol} ${props.row.tcg_mid}`"
                size="is-small"
                style="max-width: 90px;"
                disabled
                aria-disabled=""
                 />
            </b-field>

          </b-table-column>
          <b-table-column field="foil_price"   width="130" :label="`Foil`" sortable v-slot="props">

            <b-field class="level-item" style="margin-bottom: 0 !important;" v-if="props.row.foil_price > 0">
              <p class="control">
                  <b-button v-if="props.row.foil_price" icon-left="plus" size="is-small" variant="contained" class="rainbow-background has-text-white has-text-weight-bold" @click="addItem(props.row.emid,1)"></b-button>
              </p>
              <b-input
               :value="`${quickstats.currency_symbol} ${props.row.foil_price}`"
                size="is-small"
                style="max-width: 90px;"
                disabled
                aria-disabled=""
                 />
            </b-field>

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

      console.log(shuffled);

      // Get sub-array of first n elements after shuffled
      return shuffled.slice(0, n);
    },
    async fetchPopularItems(){

      this.popularItems = await this.$echomtg.getPopularItems()

    },
    addItem: async function (emid,foil=0){
        fetch(this.addAPIURL(emid,foil),{
            headers: {
                'Authorization' : 'Bearer ' + this.$cookies.get('token')
            }
        }).then((response) => {
            return response.json();
        }).then(async (json) => {
            console.log(json);
            this.$buefy.snackbar.open({
                message: json.message,
                type: 'is-warning',
                queue: false,
                duration: 10000,
                position: 'is-bottom-right',
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
            this.callback()
        }).catch(function (error) {
            this.$buefy.snackbar.open({
                message: error,
                type: 'is-error',
                position: 'is-top',
            })
        });
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
    console.log(this.popularItems)
  },

}
</script>

