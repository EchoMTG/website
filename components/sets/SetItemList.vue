 <template>
      <div class="set-item-list-container">
        <div v-if="items.length > 0" class="is-flex padded filterBar">
          <div class="control has-icons-left">
            <input
              v-model="search"
              class="input is-small is-rounded"
              type="text"
              @input="$event.target.composing = false"
              placeholder="Name or Type.."
            />
            <span class="icon is-small is-left">
              <i class="fa fa-search"></i>
            </span>
          </div>
          <!-- ORACLE TEXT SEARCH HIDDEN, TO REDUCE PAYLOAD in HALF, oracle search needs api call to work -->
<!--
          <div class="control has-icons-left is-hidden-mobile">
            <input
              v-model="textSearch"
              class="input is-small is-rounded"
              type="text"
              @input="$event.target.composing = false"
              placeholder="Card/Oracle Text.."
            />
            <span class="icon is-small is-left">
              <i class="fa fa-search"></i>
            </span>
          </div> -->

          <div class="select is-small is-rounded has-text-grey">
            <select v-model="rarity" class="has-text-grey">
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
            </select>
          </div>

          <div
            class="select is-small is-rounded has-text-grey"
            v-if="this.variants.length > 0"
          >
            <select v-model="variant" class="has-text-grey">
              <option value="" selected>Any Variant</option>
              <option disabled>---</option>
              <option value="none">No Variants</option>
              <option v-for="(v, index) in this.variants" v-bind:key="`${v}${index}`" :value="v">
                 {{ v.replace(') (', ' ') }}

              </option>
            </select>
          </div>

          <div
            class="select is-small is-rounded has-text-grey is-hidden-mobile"
            v-if="Object.keys(cardsowned).length > 0"
          >
            <select v-model="showOwned" class="has-text-grey">
              <option value="" selected>All</option>
              <option disabled>---</option>
              <option value="true reg">Owned Regular</option>
              <option value="true foil">Owned Foil</option>
              <option value="false reg">Not Owned Regular</option>
              <option value="false foil">Not Owned Foil</option>
            </select>
          </div>

          <div class="field has-addons is-hidden-mobile">
            <p class="control">
              <a
                class="button is-small is-rounded is-static"
              >
                $ &gt;
              </a>
            </p>
            <p class="control">
              <input
                class="input is-small is-rounded valueAboveInput"
                v-model="valueAbove"
                type="text"
                placeholder="00.00"
              />
            </p>
          </div>

          <div class="field has-addons is-hidden-mobile">
            <p class="control">
              <a
                class="button is-small is-rounded is-static"
              >
                $ &lt;
              </a>
            </p>
            <p class="control">
              <input
                class="input is-small is-rounded valueAboveInput"
                v-model="valueBelow"
                type="text"
                placeholder="00.00"
              />
            </p>
          </div>

          <div class="field is-hidden-mobile">
            <p class="control">
              <a class="button is-small is-rounded" @click="toggleFullView()">
                <span class="icon">
                  <i class="fa fa-file-photo-o"></i>
                </span>
              </a>
            </p>
          </div>
          <div class="field" style="margin-left: auto" >
            <vue-json-to-csv
                :json-data="filteredItems">
                <b-button size="is-small" icon-left="download">Download Filtered List</b-button>
            </vue-json-to-csv>
          </div>


          <div class="field" style="margin-left: auto">
            <button
              class="button is-small is-dark has-text-danger is-outlined"
              @click="clearFilters()"
            >
              <span class="icon is-small is-left">
                <i class="fa fa-times-circle-o"></i>
              </span>
              <span>Clear <span class="is-hidden-mobile">Filters</span></span>
            </button>
          </div>
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

          detailed
          custom-detail-row
          @details-open="(row, index) => $buefy.toast.open(`Expanded ${row.name}`)"
          :show-detail-icon="true"
          ref="table"
          detail-key="emid"
          >
          <b-table-column v-slot="props" width="30">

            <b-tag v-if="isCardOwned(props.row.emid, 'regular')" type="is-dark"><strong class="has-text-white">{{isCardOwned(props.row.emid, 'regular')}}</strong></b-tag>
            <br>
            <b-tag v-if="isCardOwned(props.row.emid, 'foiled')" class="rainbow-background"><strong class="has-text-white">{{isCardOwned(props.row.emid, 'foiled')}}</strong></b-tag>
          </b-table-column>
          <b-table-column field="name" label="Name" sortable v-slot="props">
            <a :href="props.row.echo_url.replace('https://www.echomtg.com','')" :title="`Open ${props.row.name} Page`">
                <b-image
                    lazy
                    v-if="fullView == false"
                    :src="props.row.image_cropped"
                    custom-class="mr-3"
                    placeholder="https://assets.echomtg.com/magic/cards/cropped/placeholder.png"
                    style="height: 50px; width:70px; float: left; margin-right: 4px;" />

                <b-image
                    lazy
                    v-if="fullView == true"
                    :src="props.row.image"
                    custom-class="mr-2"
                    placeholder="https://assets.echomtg.com/magic/cards/cropped/placeholder.png"
                    style="width: 120px; height:200px; float: left; margin-right: 4px;" />
            </a>

            <b-tag class="rainbow-background has-text-white is-pulled-left mr-2" v-if="props.row.foil == 1">foil</b-tag>
            <item-inspector-wrapper :item="props.row" />
            {{props.row.types}}


          </b-table-column>
          <b-table-column :visible="parseInt(user.user_level) >= 3" label="Wiki" width="200" numeric v-slot="props">
            <b-button v-if="parseInt(user.user_level) >= 3" size="is-small" icon-left="wizard-hat" outlined @click="openWiki(props.row)" >Edit {{props.row.name}}</b-button>
          </b-table-column>
          <b-table-column field="rarity" label="Rarity" sortable width="120" v-slot="props">
            <span class="is-mobile">[{{props.row.collectors_number}}]</span>
            <em v-html="replaceSymbols(props.row.mc)"></em>
            <span class="">{{props.row.rarity}}</span>
          </b-table-column>
          <b-table-column field="collectors_number_sort" width="60" label="Set #" sortable v-slot="props">
            {{props.row.collectors_number}}
          </b-table-column>
           <b-table-column field="tcg_mid" v-if="totalRegular > 0" width="130" :label="`Regular ${cs}`" sortable v-slot="props">

            <b-field class="level-item" style="margin-bottom: 0 !important;" v-if="props.row.tcg_mid > 0">
              <p class="control">
                  <b-button v-if="props.row.tcg_mid" icon-left="plus" size="is-small" variant="contained" type="is-dark" @click="addItem(props.row.emid, 0)"></b-button>
              </p>
              <b-input
               :value="`${cs} ${props.row.tcg_mid}`"
                size="is-small"
                style="max-width: 90px;"
                disabled
                aria-disabled=""
                 />
            </b-field>

          </b-table-column>
            <b-table-column field="price_change" v-if="totalRegular > 0" width="60" label="7-Day" sortable v-slot="props">
            <span v-if="props.row.price_change !== 0" :class="changeTag(props.row.price_change)">
              {{ props.row.price_change }} %
            </span>
          </b-table-column>
          <b-table-column field="foil_price" v-if="totalFoiled > 0"  width="130" :label="`Foil ${cs}`" sortable v-slot="props">

            <b-field class="level-item" style="margin-bottom: 0 !important;" v-if="props.row.foil_price > 0">
              <p class="control">
                  <b-button v-if="props.row.foil_price" icon-left="plus" size="is-small" variant="contained" class="rainbow-background has-text-white has-text-weight-bold" @click="addItem(props.row.emid,1)"></b-button>
              </p>
              <b-input
               :value="`${cs} ${props.row.foil_price}`"
                size="is-small"
                style="max-width: 90px;"
                disabled
                aria-disabled=""
                 />
            </b-field>

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

          <!-- <tbody v-if="items.length > 0">
            <SetItemRow
              v-for="item in filteredItems"
              :key="item.emid"
              :ownsAny="Object.keys(cardsowned.regular).length > 0 || Object.keys(cardsowned.foiled).length > 0"
              :owned="isCardOwned(item.emid, 'regular')"
              :ownedfoil="isCardOwned(item.emid, 'foiled')"
              :fullview="fullView"
              :hasFoilsInSet="totalFoiled > 0"
              :hasRegularInSet="totalRegular > 0"
              @emit-wiki="openWiki(item)"
              :item="item"
            />
          </tbody> -->
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

export default {
  name: 'SetItemList',
  components: { SetItemRow, ItemWikiEdit, ItemInspectorWrapper,QuickGraph, ItemListBox, ItemToolBox },
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
      fullView: false,
      actions: 0
    };

  },
  mounted () {
    this.findVariants()
    window.scrollTo(0, 1); // account for lazy load
  },
  methods: {
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
    toggleFullView: function(){
        this.fullView = this.fullView == false ? true : false;
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

