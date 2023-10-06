 <template>
      <div class="set-item-list-container">
        <div v-if="items.length > 0" class="is-flex padded filterBar has-background-white">
          <b-input

              placeholder="Search by name..."
              type="search"
              v-model="search"
              size="is-small"
              class="mr-1"
              icon="magnify" />


            <b-select size="is-small" v-model="rarity" class="mr-1">
              <option value="" selected>Any Rarity</option>
              <option disabled>---</option>
              <option value="common">Common</option>
              <option value="uncommon">Uncommon</option>
              <option value="rare">Rare</option>
              <option v-if="game == 71" value="super rare">Super Rare</option>
              <option v-if="game == 71" value="legendary">Legendary</option>
              <option v-if="game == 1" value="mythic">Mythic</option>
              <option value="special">Special</option>
              <option v-if="game == 1" value="basic land">Basic Land</option>
              <option value="token">Token</option>
            </b-select>

            <b-select
              size="is-small"
              v-if="this.variants.length > 0"
              v-model="variant"
              class="mr-1">
              <option value="" selected>Any Variant</option>
              <option disabled>---</option>
              <option value="none">No Variants</option>
              <option v-for="(v, index) in this.variants" v-bind:key="`${v}${index}`" :value="v">
                 {{ v.replace(') (', ' ') }}

              </option>
            </b-select>


            <b-select
              size="is-small"
              class="mr-1 is-hidden-mobile"
              v-if="Object.keys(cardsowned).length > 0"
              v-model="showOwned"
              >
              <option value="" selected>All</option>
              <option disabled>---</option>
              <option value="true reg">Owned Regular</option>
              <option value="true foil">Owned Foil</option>
              <option value="false reg">Not Owned Regular</option>
              <option value="false foil">Not Owned Foil</option>
            </b-select>


          <div class="field has-addons is-hidden-mobile">
            <p class="control">
              <a
                class="button is-small is-static"
              >
                $ &gt;
              </a>
            </p>
            <p class="control">
              <input
                class="input is-small valueAboveInput"
                v-model="valueAbove"
                type="text"
                placeholder="00.00"
              />
            </p>
          </div>

          <div class="field has-addons is-hidden-mobile">
            <p class="control">
              <a
                class="button is-small is-static"
              >
                $ &lt;
              </a>
            </p>
            <p class="control">
              <input
                class="input is-small valueAboveInput"
                v-model="valueBelow"
                type="text"
                placeholder="00.00"
              />
            </p>
          </div>




          <b-button
            type="is-danger"
            outlined
            size="is-small"
            v-if="dirtyFilters"
            @click="clearFilters()"
            icon-left="close"
          >
            <span>Clear <span class="is-hidden-mobile">Filters</span></span>
          </b-button>

            <vue-json-to-csv
                class="ml-auto"
                v-if="dirtyFilters"
                :json-data="filteredItems">
                <b-button size="is-small"  type="is-info" icon-left="download">Download Filtered List</b-button>
            </vue-json-to-csv>



        </div>
        <div
          v-if="items.length > 0 && filteredItems.length == 0"
          class="box has-text-centered"
        >
          <h4 class="title">No Results Found</h4>
          <button class="button" @click="clearFilters()">
            Clear Search and Filters
          </button>
        </div>

        <b-table
          striped
          :data="filteredItems"
          :debounce-search="0"
          paginated
          pagination-size="is-small"
          pagination-position="bottom"
          :per-page="authenticated ? 50 : 25"
          pagination-order="is-centered"
          :custom-detail-row="authenticated ? true : false"
          :mobile-cards="false"
          :detailed="$device.isDesktop && authenticated ? true : false"
          @details-open="(row, index) => $buefy.toast.open(`Expanded ${row.name}`)"
          :show-detail-icon="$device.isDesktop && authenticated ? true : false"
          ref="table"
          detail-key="emid"
          >
          <b-table-column :visible="authenticated ? true : false"  v-slot="props" width="30">
            <b-tag v-if="isCardOwned(props.row.emid, 'regular')" class="has-background-grey"><strong class="has-text-white">{{isCardOwned(props.row.emid, 'regular')}}</strong></b-tag>
            <br>
            <b-tag v-if="isCardOwned(props.row.emid, 'foiled')" class="rainbow-background"><strong class="has-text-white">{{isCardOwned(props.row.emid, 'foiled')}}</strong></b-tag>
          </b-table-column>
          <b-table-column field="name" label="Name" sortable v-slot="props">
            <a :href="itemURL(props.row)" :title="`Open ${props.row.name} Page`">

                <NuxtImg
                    :loading="props.index > 10 ? 'lazy' : 'eager'"
                    :src="props.row.image_cropped"
                    class="mr-3 is-pulled-left"
                    :alt="`${props.row.name} Cropped Item Image Thumbnail`"
                    width="70"
                    height="50"
                    quality="80"
                     />

            </a>

            <item-inspector-wrapper :item="props.row" />
            <div class="is-flex"><em class="mr-1" v-html="replaceSymbols(props.row.mc)"></em> - {{props.row.types}}</div>


          </b-table-column>
          <b-table-column :visible="authenticated && parseInt(user.user_level) >= 3" label="Wiki" width="200" numeric v-slot="props">
            <b-button v-if="parseInt(user.user_level) >= 3" size="is-small" icon-left="wizard-hat" outlined @click="openWiki(props.row)" >Edit {{props.row.name}}</b-button>
          </b-table-column>
          <b-table-column field="rarity" label="Rarity" sortable width="120" v-slot="props">
            {{props.row.rarity}}
          </b-table-column>
          <b-table-column field="collectors_number_sort" width="60" label="Set #" sortable v-slot="props">
            {{props.row.collectors_number}}
          </b-table-column>
          <b-table-column field="price_change" v-if="totalRegular > 0" width="60" label="7-Day" sortable v-slot="props">
            <div class="level">
              <span v-if="props.row.price_change !== 0" :class="changeTag(props.row.price_change)">
                {{ props.row.price_change }} %
              </span>

            </div>

          </b-table-column>
           <b-table-column :visible="authenticated" width="60" label="Watch" v-slot="props">
              <watchlist-quick-add-button :emid="props.row.emid" :showLabel="false" />
           </b-table-column>
           <b-table-column field="tcg_mid" v-if="totalRegular > 0" width="100" :label="`Regular ${cs}`" sortable v-slot="props">

              <b-button
                :aria-label="`Add ${props.row.name} Regular Version to Inventory`"
                v-if="props.row.tcg_mid"
                icon-right="plus-circle"
                size="is-small"
                variant="contained"
                type="is-dark"
                class="has-text-weight-bold is-fullwidth"
                @click="addItem(props.row.emid, 0)">
                {{cs}}{{props.row.tcg_mid}}
              </b-button>

          </b-table-column>
          <b-table-column field="foil_price" v-if="totalFoiled > 0"  width="100" :label="`Foil ${cs}`" sortable v-slot="props">
            <b-button
              :aria-label="`Add ${props.row.name} Foil Version to Inventory`"
              v-if="props.row.foil_price"
              icon-right="plus-circle"
              size="is-small"
              variant="contained"
              class="rainbow-background has-text-white has-text-weight-bold is-fullwidth"
              @click="addItem(props.row.emid,1)">
              {{cs}}{{props.row.foil_price}}
            </b-button>
          </b-table-column>


          <template slot="detail" slot-scope="props">
            <tr>
              <td colspan="9" style="max-height: 300px">
                <section >
                  <div class="columns">
                     <div class="column is-3">
                      <item-tool-box :item="props.row" />
                    </div>
                    <div class="column is-2">
                      <b-image
                        :alt="props.row.name"
                        :src="props.row.image"

                        placeholder="https://assets.echomtg.com/magic/cards/magic-card-back.jpg"
                        ></b-image>
                    </div>
                    <div class="column is-4">
                      <quick-graph :emid="props.row.emid" />
                    </div>
                    <div class="column is-3">
                      <item-list-box :item="props.row" />
                    </div>

                  </div>
                </section>
              </td>
            </tr>
          </template>

        </b-table>
          <b-modal
            v-model="isWikiModalActive"
            has-modal-card
            trap-focus
            :destroy-on-hide="false"
            aria-role="dialog"
            aria-label="Example Modal"
            close-button-aria-label="Close"
            aria-modal>
            <template #default="props">
              <ItemWikiEdit
                :item="wikiItem"
                :originalItem="{...wikiItemOriginal}"
                @close="props.close"

              />
            </template>
        </b-modal>


      </div>
</template>

<script>

import SetItemRow from '@/components/sets/SetItemRow';
import ItemInspectorWrapper from '~/components/items/ItemInspectorWrapper.vue'
import ItemWikiEdit from '@/components/wiki/ItemWikiEdit';
import { mapState } from 'vuex'
import QuickGraph from '@/components/inventory/QuickGraph.vue'
import ItemListBox from '@/components/items/ItemListBox.vue'
import ItemToolBox from '@/components/items/ItemToolBox.vue';
import WatchlistQuickAddButton from '@/components/watchlist/WatchlistQuickAddButton.vue';

export default {
  name: 'SetItemList',
  components: { SetItemRow, ItemWikiEdit,WatchlistQuickAddButton, ItemInspectorWrapper,QuickGraph, ItemListBox, ItemToolBox },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    cardsowned: {
      type: Object,
      default:function() {
        return {
          regular: [],
          foiled:[]
        }
      }
    },
    userlevel: {
      type: String,
      default: '1'
    },
     totalFoiled: {
      type: Number,
      default: 0
    },
    totalRegular: {
      type: Number,
      default: 0
    },
    game: {
      type: Number,
      default: 1
    },
    callback: {
      type: Function,
      required: true
    }
  },
  data: function data() {
    return {
      title: 'Set Items List',
      cs: '$',
      setCode: '',
      search: '',
      rarity: '',
      showOwned: '',
      valueAbove: 0,
      valueBelow: 0,
      textSearch: '',
      wikiItem: {},
      wikiItemOriginal: {},
      isWikiModalActive: false,
      variant: '',
      variants: [],
      actions: 0
    };

  },
  mounted () {
    this.findVariants()
    window.scrollTo(0, 1); // account for lazy load
  },
  methods: {
    itemURL(item){
      return this.$echomtg.itemURL(item)
    },
    wikiControl(bool){
      this.isWikiModalActive = bool
    },
    changeTag(number) {
      if (number < -5) {
            return 'tag has-text-white has-background-danger'
        } else if (number > 5) {
            return 'tag  has-text-white has-background-success'
        } else if (number < 0) {
            return 'tag has-background-danger-light'
        } else if (number > 0) {
            return 'tag has-background-success-light'
        } else {
          return 'tag'
        }
    },
    addAPIURL: function(emid,foil=0){

            return `${this.$config.API_DOMAIN}inventory/add/?quantity=1&emid=${emid}&foil=${foil}`;
        },
    addItem: async function (emid,foil=0){
      try {
        const json = await this.$echomtg.inventoryQuickAdd(emid,foil);
        if(json.status == 'success'){
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
          this.callback()
        } else {
          this.$store.commit('loginSignupModalShow',true);
          this.$echomtg.log('failed to add')
        }
      } catch (err){
        this.$buefy.snackbar.open({
          message: error,
          type: 'is-error',
          position: 'is-top',
        })
      }
    },
    replaceSymbols(str){
      return this.$echomtg.replaceSymbols(str)
    },
    findVariants(){

        this.items.forEach(item => {
            if(/\(/.test(item.name) ){

                let m = item.name.match(/\((.*)\)/m);
                if (m) {
                    this.addVariant(m[1]);
                }
            }
        })
    },
    addVariant(name) {
        if(name.length < 5) return

        let exists = false
        this.variants.forEach(variant => {
            if(name == variant) exists = true
        })

        if(!exists){
            this.variants.push(name)
        }

    },
    openWiki: function(item){
        this.wikiItem = item
        this.wikiItemOriginal = {...item}
        this.isWikiModalActive = true
    },
    closeWiki() {
      this.wikiItem = null
      this.wikiItemOriginal = null
      this.isWikiModalActive = false
    },
    isCardOwned: function(emid, type='regular') {
      if(undefined == this.cardsowned) return 0;
      return this.cardsowned[type][emid] ? this.cardsowned[type][emid] : 0
    },
    clearFilters: function() {
        this.search='';
        this.rarity='';
        this.textSearch='';
        this.valueAbove=0;
        this.valueBelow=0;
        this.variant = '';
        this.showOwned = '';
  },


  },
  watch: {

    search: () => {},
    textSearch: () => {},
    rarity: () => {},
    valueAbove: () => {},
    valueBelow: () => {},
    showOwned: () => {},
    items: function() {
        this.findVariants()

    },
    actions() {
      if(this.callback){
        this.callback();
      }
    }
  },
  computed: {
    dirtyFilters() {
      return this.showOwned != '' || this.variant != '' || this.valueBelow != 0 || this.valueAbove != 0 || this.showOwned != '' || this.search != ''
    },
    ...mapState(['userLevel','user','authenticated']),
      filteredItems: function(){

            if(this.items.length == 0) return

            let returnItems = [...this.items]

            // show owned
            if(this.showOwned != '') {
                if(this.showOwned == "true reg"){
                    returnItems = returnItems.filter(item => {
                        return this.cardsowned?.regular ? this.cardsowned.regular.hasOwnProperty(item.emid) : false;
                    });
                }

                if(this.showOwned == "true foil"){
                    returnItems = returnItems.filter(item => {
                        return this.cardsowned?.foiled ? this.cardsowned.foiled.hasOwnProperty(item.emid) : false;
                    });
                }

                if(this.showOwned == "false reg"){
                    returnItems = returnItems.filter(item => {
                        return this.cardsowned?.regular ? !this.cardsowned.regular.hasOwnProperty(item.emid) : true;
                    });
                }

                if(this.showOwned == "false foil"){
                    returnItems = returnItems.filter(item => {
                        return this.cardsowned?.foiled ? !this.cardsowned.foiled.hasOwnProperty(item.emid) : true;
                    });
                }

            }

            // card name and types
            if(this.search != '') {
                returnItems = returnItems.filter(item => {
                    if(item.name.toLowerCase().includes(this.search.toLowerCase())){
                        return true
                    }
                    console.log(item.t)
                    if(item.t != null && String(item.t).toLowerCase().includes(this.search.toLowerCase())) {
                        return true
                    }
                    if(item.collectors_number != null && item.collectors_number.toString().toLowerCase().includes(this.search.toLowerCase())) {
                        return true
                    }
                    return false
                });
            }

            // card oracle  search
            if(this.textSearch != '') {
                returnItems = returnItems.filter(item => {
                    if(item.card_text != null && item.card_text.toLowerCase().includes(this.textSearch.toLowerCase())) {
                        return true
                    }
                    return false
                });
            }

            // variants
            if(this.variant != '') {
                if(this.variant == 'none'){
                    returnItems = returnItems.filter(item => {
                        return (item.name != null && !item.name.toLowerCase().includes('('))
                    });
                } else {
                    returnItems = returnItems.filter(item => {
                        return (item.name != null && item.name.toLowerCase().includes(this.variant.toLowerCase()))
                    });
                }
            }

            // rarity filter
            if(this.rarity != ''){
                returnItems = returnItems.filter(item => {
                    return item.rarity.toLowerCase().startsWith(this.rarity.toLowerCase())

                });
            }

            if(typeof parseFloat(this.valueAbove) === 'number' && parseFloat(this.valueAbove) > 0){
                returnItems = returnItems.filter(item => {
                    return parseFloat(item.tcg_mid) >= parseFloat(this.valueAbove)
                });
            }

            if(typeof parseFloat(this.valueBelow) === 'number' && parseFloat(this.valueBelow) > 0){
                returnItems = returnItems.filter(item => {
                    return parseFloat(item.tcg_mid) <= parseFloat(this.valueBelow)
                });
            }

            return [...returnItems];


        },

  }
}
</script>

