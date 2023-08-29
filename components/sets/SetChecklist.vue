 <template>
      <div class="set-item-list-container">
        <div class="set-summary-printable">

        </div>

     <div class="checklist-filters p-3 level">
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
        </div>
        <b-table
          striped
          :data="filteredItems"
          ref="table"

          >
          <b-table-column v-slot="props" centered label="R" width="30">
            <span v-if="isCardOwned(props.row.emid, 'regular')" >{{isCardOwned(props.row.emid, 'regular')}}</span>
            <b-icon v-if="!props.row.tcg_mid > 0" size="is-small" icon="cancel" />
          </b-table-column>
          <b-table-column v-slot="props" centered label="F" width="30">
            <span v-if="isCardOwned(props.row.emid, 'foiled')">{{isCardOwned(props.row.emid, 'foiled')}}</span>
            <b-icon v-if="!props.row.foil_price > 0" size="is-small" icon="cancel" />
          </b-table-column>
          <b-table-column field="name" label="Name" sortable v-slot="props">
<!--
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
             -->

            {{props.row.name}}




          </b-table-column>
          <b-table-column field="mc" label="MC" sortable v-slot="props">
            {{props.row.mc.replace(/\{\{|\}\}/ig,'')}}
          </b-table-column>
           <!-- <b-table-column field="types" label="Types" sortable  v-slot="props">
            {{props.row.types}}
          </b-table-column> -->

          <b-table-column field="rarity" label="Rarity" sortable v-slot="props">
            <span class="">{{props.row.rarity}}</span>
          </b-table-column>
          <b-table-column field="collectors_number_sort" width="60" label="C#" sortable v-slot="props">
            {{props.row.collectors_number}}
          </b-table-column>
           <b-table-column field="tcg_mid" v-if="totalRegular > 0" :label="`Regular ${cs}`" sortable v-slot="props">

            <span v-if="props.row.tcg_mid > 0">
             {{cs}}{{props.row.tcg_mid}}
            </span>

          </b-table-column>
            <!-- <b-table-column field="price_change" v-if="totalRegular > 0" width="60" label="7-Day" sortable v-slot="props">
            <span v-if="props.row.price_change !== 0" :class="changeTag(props.row.price_change)">
              {{ props.row.price_change }} %
            </span>
          </b-table-column> -->
          <b-table-column field="foil_price" v-if="totalFoiled > 0"  :label="`Foil ${cs}`" sortable v-slot="props">
            <span v-if="props.row.foil_price > 0">
             {{cs}}{{props.row.foil_price}}
            </span>
          </b-table-column>





        </b-table>



      </div>
</template>

<script>


import ItemInspectorWrapper from '~/components/items/ItemInspectorWrapper.vue'
import { mapState } from 'vuex'

export default {
  name: 'SetItemList',
  components: { ItemInspectorWrapper },
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
    }
  },
   watch: {
    rarity: () => {},
    showOwned: () => {},
    items: function() {
        this.findVariants()

    },
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
    replaceSymbols(str){
      return this.$echomtg.replaceSymbols(str)
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


            return [...returnItems];


        },

  }
}
</script>

