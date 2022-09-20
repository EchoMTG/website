 <template>
      <div class="has-background-white set-item-list-container">
        <div v-if="items.length > 0" class="is-flex padded filterBar">
          <div class="control has-icons-left">
            <input
              v-model="search"
              class="input is-small is-rounded has-background-dark has-text-grey"
              type="text"
              @input="$event.target.composing = false"
              placeholder="Name or Type.."
            />
            <span class="icon is-small is-left">
              <i class="fa fa-search"></i>
            </span>
          </div>

          <div class="control has-icons-left is-hidden-mobile">
            <input
              v-model="textSearch"
              class="input is-small is-rounded has-background-dark has-text-grey"
              type="text"
              @input="$event.target.composing = false"
              placeholder="Card/Oracle Text.."
            />
            <span class="icon is-small is-left">
              <i class="fa fa-search"></i>
            </span>
          </div>

          <div class="select is-small is-rounded has-text-grey">
            <select v-model="rarity" class="has-text-grey">
              <option value="" selected>Any Rarity</option>
              <option disabled>---</option>
              <option value="common">Common</option>
              <option value="uncommon">Uncommon</option>
              <option value="rare">Rare</option>
              <option value="mythic">Mythic</option>
              <option value="special">Special</option>
              <option value="basic land">Basic Land</option>
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
              <option v-for="v in this.variants" :value="v">
                 {{ v.replace(') (', ' ') }}

              </option>
            </select>
          </div>

          <!-- <div
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
          </div> -->

          <div class="field has-addons is-hidden-mobile">
            <p class="control">
              <a
                class="button is-small is-rounded is-static has-background-dark has-text-grey"
              >
                $ >
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
                class="button is-small is-rounded is-static has-background-dark has-text-grey"
              >
                $ <
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
        <table id="set-table" class="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th class="owned">
                <span class="green fa fa-check-circle"></span>
              </th>

              <th class="is-clickable" @click="changeSortMetric('name')">
                <span>Name</span>
                <span v-if="this.sortMetric == 'name'" class="icon">
                  <i
                    v-if="this.sortDirection == 'DESC'"
                    class="fa fa-caret-down"
                  ></i>
                  <i
                    v-if="this.sortDirection == 'ASC'"
                    class="fa fa-caret-up"
                  ></i>
                </span>
              </th>
              <th class="is-clickable" @click="changeSortMetric('rarity')">
                <span>Rarity</span>
                <span v-if="this.sortMetric == 'rarity'" class="icon">
                  <i
                    v-if="this.sortDirection == 'DESC'"
                    class="fa fa-caret-down"
                  ></i>
                  <i
                    v-if="this.sortDirection == 'ASC'"
                    class="fa fa-caret-up"
                  ></i>
                </span>
              </th>
              <th
                class="is-clickable is-hidden-mobile"
                @click="changeSortMetric('collectors_number')"
              >
                <span>C#</span>
                <span
                  v-if="this.sortMetric == 'collectors_number'"
                  class="icon"
                >
                  <i
                    v-if="this.sortDirection == 'DESC'"
                    class="fa fa-caret-down"
                  ></i>
                  <i
                    v-if="this.sortDirection == 'ASC'"
                    class="fa fa-caret-up"
                  ></i>
                </span>
              </th>
              <th
                class="is-clickable"
                @click="changeSortMetric('price_change')"
              >
                <span>Change</span>
                <span v-if="this.sortMetric == 'price_change'" class="icon">
                  <i
                    v-if="this.sortDirection == 'DESC'"
                    class="fa fa-caret-down"
                  ></i>
                  <i
                    v-if="this.sortDirection == 'ASC'"
                    class="fa fa-caret-up"
                  ></i>
                </span>
              </th>
              <th class="is-clickable" @click="changeSortMetric('tcg_mid')">
                <span>Reg. Price</span>
                <span v-if="this.sortMetric == 'tcg_mid'" class="icon">
                  <i
                    v-if="this.sortDirection == 'DESC'"
                    class="fa fa-caret-down"
                  ></i>
                  <i
                    v-if="this.sortDirection == 'ASC'"
                    class="fa fa-caret-up"
                  ></i>
                </span>
              </th>
              <th class="is-clickable" @click="changeSortMetric('foil_price')">
                <span>Foil Price</span>
                <span v-if="this.sortMetric == 'foil_price'" class="icon">
                  <i
                    v-if="this.sortDirection == 'DESC'"
                    class="fa fa-caret-down"
                  ></i>
                  <i
                    v-if="this.sortDirection == 'ASC'"
                    class="fa fa-caret-up"
                  ></i>
                </span>
              </th>
            </tr>
          </thead>

          <tbody v-if="items.length > 0">
            <SetItemRow
              v-for="item in filteredItems"
              :key="item.emid"
              :owned="isCardOwned(item.emid, 'regular')"
              :ownedfoil="isCardOwned(item.emid, 'foiled')"
              :fullview="fullView"
              @emit-wiki="openWiki(item)"
              :item="item"
            />
          </tbody>

          <!-- shown if note logged in -->
        </table>
        <ItemWikiEdit
          :item="wikiItem"
          @emit-wiki-close="closeWiki()"
          :open="wikiOpen"
        />
      </div>
</template>

<script>

import SetItemRow from '@/components/sets/SetItemRow';
import ItemWikiEdit from '@/components/wiki/ItemWikiEdit';

export default {
  name: 'SetItemList',
  components: { SetItemRow, ItemWikiEdit },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    cardsowned: {
      type: Object,
      default: () => {}
    },
    userlevel: {
      type: String,
      default: '1'
    },

  },
  data: function data() {
    return {
      title: 'Set Items List',
      setCode: '',
      sortMetric: 'tcg_mid',
      sortDirection: 'DESC',
      search: '',
      rarity: '',
      showOwned: '',
      valueAbove: 0,
      valueBelow: 0,
      textSearch: '',
      wikiItem: {},
      wikiOpen: false,
      variant: '',
      variants: [],
      fullView: false
    };

  },
  mounted () {

    this.$echomtg.log('cards owned', this.cardsowned)
    this.findVariants()
  },
  methods: {
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
        this.wikiOpen = true
    },
    closeWiki() {
        this.wikiOpen = false
    },
    isCardOwned: function(emid, type='regular') {
        return this.cardsowned?.[type] ? this.cardsowned[type]?.[emid] : 0
    },
    clearFilters: function() {
        this.search='';
        this.rarity='';
        this.textSearch='';
        this.valueAbove=0;
        this.valueBelow=0;
    },
    changeSortMetric: function(value){
        if(value == this.sortMetric) this.swapDirection();
        this.sortMetric = value
    },
    swapDirection: function(){
        this.sortDirection = (this.sortDirection == 'ASC') ? 'DESC' : 'ASC';
    },
    defaultSortBy: function(a,b){
        const aVal = a[this.sortMetric]
        const bVal = b[this.sortMetric]

        let comparison = 0;

        if(this.sortDirection == 'ASC') {
            if (aVal > bVal) {
                comparison = 1;
            } else if (aVal < bVal) {
                comparison = -1;
            }
        } else {
            if (aVal < bVal) {
                comparison = 1;
            } else if (aVal > bVal) {
                comparison = -1;
            }
        }
        return comparison;
    },
    sortByPrice: function(a,b){
        // T added for tokens
        let valA = a[this.sortMetric] != '' ? a[this.sortMetric]+"" : "0"
        let valB = b[this.sortMetric] != '' ? b[this.sortMetric]+"" : "0"

        const priceA = parseFloat(valA.replace('T','1000'))
        const priceB = parseFloat(valB.replace('T','1000'))

        if(this.sortDirection == 'ASC') {
            return priceA - priceB
        } else {
          return priceB - priceA
        }
    }

  },
  watch: {
    sortMetric: () => {},
    search: () => {},
    textSearch: () => {},
    rarity: () => {},
    valueAbove: () => {},
    valueBelow: () => {},
    showOwned: () => {},
    items: function() {
        this.findVariants()

    }
  },
  computed: {
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
                        return !this.cardsowned?.regular ? !this.cardsowned?.regular.hasOwnProperty(item.emid) : false;
                    });
                }

                if(this.showOwned == "false foil"){
                    returnItems = returnItems.filter(item => {
                        return !this.cardsowned?.foiled ? !this.cardsowned?.foiled.hasOwnProperty(item.emid) : false;
                    });
                }

            }

            // card name and types
            if(this.search != '') {
                returnItems = returnItems.filter(item => {
                    if(item.name.toLowerCase().includes(this.search.toLowerCase())){
                        return true
                    }

                    if(item.t != null && item.t.toLowerCase().includes(this.search.toLowerCase())) {
                        return true
                    }
                    if(item.collectors_number != null && item.collectors_number.toLowerCase().includes(this.search.toLowerCase())) {
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


            // sort it
            switch(this.sortMetric.toLowerCase()){
                case 'price':
                case 'tcg_mid':
                case 'tcg_market':
                case 'price_change':
                case 'tcg_low':
                case 'foil_price':
                case 'collectors_number':
                    return [...returnItems.sort(this.sortByPrice)]

                default:
                    return [...returnItems.sort(this.defaultSortBy)]
            }


        },

  }
}
</script>

