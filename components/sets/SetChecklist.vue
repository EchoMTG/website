 <template>
  <div class="set-item-list-container">
    <div class="container set-summary-printable py-5">

      <h1 class="title is-size-4"><span class="is-capitalized">{{user.username}}'s</span> {{set.name}} Collection Checklist</h1>

      <nav class="level">
        <div class="has-text-weight-bold">Regular Set Value {{quickstats.currency_symbol}}{{sumRegulars.toFixed(2)}}</div> <div>{{set.set_code}} released on {{set.release_date}}</div> <div>Total Cards {{set.items.length}}</div>    <div class="has-text-weight-bold">Foil Set Value {{quickstats.currency_symbol}}{{sumFoils.toFixed(2)}}</div>
      </nav>
      <nav class="level">
      <div>You've collected {{ownedRegular}} of {{totalRegular}} regular cards: {{percentOwnedRegular}}%</div>
      <div>You've collected {{ownedFoil}} of {{totalFoiled}} foil cards: {{percentOwnedFoil}}%</div>
      </nav>
    </div>

    <div class="checklist-filters p-3 level has-background-light">
        <div class="level-item">
          Print {{set.name}} Checklist as is or apply filters and print
        </div>


        <b-select v-model="rarity" class="level-item ">
          <option value="" selected>Any Rarity</option>
          <option disabled>---</option>
          <option value="common">Common</option>
          <option value="uncommon">Uncommon</option>
          <option value="rare">Rare</option>
          <option value="mythic">Mythic</option>
          <option value="special">Special</option>
          <option value="basic land">Basic Land</option>
          <option value="token">Token</option>
        </b-select>

        <b-select v-if="this.variants.length > 0" v-model="variant" class="level-item ">
          <option value="" selected>Any Variant</option>
          <option disabled>---</option>
          <option value="none">No Variants</option>
          <option v-for="(v, index) in this.variants" v-bind:key="`${v}${index}`" :value="v">
              {{ v.replace(') (', ' ') }}

          </option>
        </b-select>

          <b-select v-if="Object.keys(cardsowned).length > 0" v-model="showOwned" class="level-item">
            <option value="" selected>All</option>
            <option disabled>---</option>
            <option value="true reg">Owned Regular</option>
            <option value="true foil">Owned Foil</option>
            <option value="false reg">Not Owned Regular</option>
            <option value="false foil">Not Owned Foil</option>
          </b-select>

        <b-button
          size="default"
          type="is-danger"
          class="level-item"
          icon-left="printer"
          @click="print()">Print Now ({{isApple ? 'CMD' : 'CTRL'}} + p) </b-button>
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
            {{props.row?.mc && props.row.mc.replace(/\{\{|\}\}/ig,'')}}
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
    set: {
      type: Object,
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
      actions: 0,
      isApple: false
    };

  },
  mounted () {
    this.isApple = /(Mac|iPhone|iPod|iPad)/i.test(window.navigator.userAgent);
    this.findVariants()
    window.scrollTo(0, 1); // account for lazy load
    console.log(this.user)
  },
  methods: {
    print() {
      window.print()
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
    ...mapState(['userLevel','user','authenticated','quickstats']),
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
    ownedFoil(){
      return Object.keys(this.cardsowned.foiled).length
    },
    ownedRegular(){
      return Object.keys(this.cardsowned.regular).length
    },
    percentOwnedRegular() {
      return ((this.ownedRegular / this.totalRegular) * 100).toFixed(2)
    },
    percentOwnedFoil() {
      return ((this.ownedFoil / this.totalFoiled) * 100).toFixed(2)
    },
    sumFoils(){
      let sum = 0
      this.items.forEach(item => sum += item.foil_price)
      return sum
    },
    sumRegulars(){
      let sum = 0
      this.items.forEach(item => sum += item.tcg_mid)
      return sum
    },

  }
}
</script>

