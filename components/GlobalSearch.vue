<template>
  <div class="global-search-container">
        <div class="global-search closed" ref="globalSearchBox">
            <div class="search-box card">
                <header class="card-header">
                    <div class="field search-input m-0">
                       <div class="columns">
                          <div class="column searchColumn">
                            <div class="field has-addons">
                                <p class="control grow has-icons-left m-0">
                                    <input
                                        class="input is-small is-rounded has-background-white has-text-black item-search-input"
                                        v-model="search"
                                        @input="$event.target.composing = false"
                                        ref="searchInput"
                                        type="text"
                                        :placeholder="placeholderText">
                                    <b-icon icon="magnify" class="is-left" size="is-small" />
                                </p>
                                <p class="control m-0" v-if="search.length > 0">
                                     <button tabindex="-1" class="button is-small is-outlined clear-button" @click="clearSearch()">
                                          <b-icon icon="times" size="is-small" />
                                     </button>
                                </p>
                            </div>
                          </div>
                          <div class="column is-one-third expansionColumn">
                              <input class="input is-small  has-background-white has-text-black  expansion-search-input"  v-model="expansion" ref="expansionInput" type="text" placeholder="Set Name/Code...">
                          </div>
                       </div>

                    </div>
                    <div class="control inside-button">
                        <button class="button is-hidden-mobile  is-small is-outlined is-rounded has-background-grey has-text-white advanced-options-button" @click="openAdvancedOptions()">

                            <span class="buttonName">Advanced</span>
                            <b-icon icon="menu-down" size="is-small" />
                        </button>
                    </div>
                </header>
                <div  class="card-content">
                    <!-- how to message -->
                    <div class="advancedSearchOptions is-hidden-mobile"  ref="advancedSearchOptions">
                        <div class="container">
                            <div class="columns">
                                <div class="column">
                                    <div class="field has-addons">
                                        <p class="control">
                                            <button class="button is-static is-small has-text-grey">
                                                <span class="icon">
                                                    <b-icon icon="text" size="is-small" />
                                                </span>
                                                <span>Card Text</span>
                                            </button>
                                        </p>
                                        <p class="control">
                                            <input
                                                class="input is-small has-text-black"
                                                v-model="textsearch"
                                                placeholder="Scry, Deathtouch, Counter..."
                                                @input="$event.target.composing = false"
                                                ref="textsearchInput"
                                                />
                                        </p>
                                    </div>
                                    <small class="help is-size-7 has-text-grey is-hidden-mobile">Deathtouch, Shadow, Draw, Scry, Counter..</small>

                                </div>
                                <div class="column">
                                      <div class="field has-addons">
                                        <p class="control">
                                            <button class="button is-static is-small has-text-grey">

                                                <b-icon icon="human-male-height" size="is-small" />
                                                <span>Types</span>
                                            </button>
                                        </p>
                                        <p class="control">
                                           <input
                                            class="input is-small  has-text-black"
                                            v-model="types"
                                            placeholder="Land, Creature, Goblin, Wizard..."
                                            @input="$event.target.composing = false"
                                            ref="typesInput"
                                            />
                                        </p>
                                    </div>
                                    <p class="help is-size-7 has-text-grey is-hidden-mobile">Planeswalker, Instant, Dragon..</p>
                                </div>
                                 <div class="column" v-if="showinventorybuttons">
                                     <div class="field has-addons">
                                            <p class="control">
                                                <button class="button is-static is-small has-text-grey">
                                                    <span class="icon">
                                                        <b-icon icon="currency-usd" size="is-small" />
                                                    </span>
                                                    <span>Acquired Price</span>
                                                </button>
                                            </p>
                                            <p class="control">
                                                <input
                                                    class="input is-small"
                                                    v-model="acquiredOverridePrice"
                                                    placeholder="$4.50"
                                                    @input="$event.target.composing = false"
                                                    ref="acquiredInput"
                                                    />
                                            </p>
                                             <p class="control">
                                                <input
                                                    class="input is-small"
                                                    v-model="acquiredOverrideItemCount"
                                                    placeholder="15"
                                                    @input="$event.target.composing = false"
                                                    ref="itemCountInput"
                                                    />
                                            </p>
                                             <p class="control">
                                                <a class="button is-static is-small has-text-grey">
                                                    {{staticAcquiredPrice}}
                                                </a>
                                            </p>
                                        </div>
                                        <p class="help is-size-7 has-text-grey is-hidden-mobile">Acquired Price Override: (Total Acquisition Costs / Number of Cards) = avg price </p>
                                 </div>
                            </div>
                        </div>
                         <!-- total acquisition costs / total cards = avg acquisition cost -->
                    </div>

                    <div v-if="results.length > 0" ref="cardContent" class="searchResults">
                        <GlobalSearchRow
                            v-for="(result, index) in results"
                            v-bind:key="`${result.mid}-${index}`"
                            :name="result.name"
                            :setCode="result.setcode"
                            :setName="result.set"
                            :emid="result.emid"
                            :url="result.url"
                            :item="result"
                            :showinventorybuttons="showinventorybuttons"
                            :currencysymbol="currencysymbol"
                            :ref="'pos'+index"
                            :selected="index == position"
                            :acquiredprice = "staticAcquiredPrice"
                            :previewopen="index == position && previewopen"
                            :manacost="result.mana_cost"
                            :showimage="showimage"
                            :callbackname="callbackname"
                            @primaryCallback="callback(result.emid)"
                            ></GlobalSearchRow>
                    </div>
                    <!-- how to search message, shows when search is empty -->
                    <div v-if="results.length == 0 && search == ''">
                        <div class="container padded ">
                            <h5 class="title is-size-4 has-text-white">Short Cuts</h5>
                            <p class="has-text-white"><strong class="has-text-white">Shift + Delete:</strong> Clear Item Search</p>
                            <p class="has-text-white"><strong class="has-text-white">Shift + Backspace:</strong> Clear Item Search</p>
                             <p class="has-text-white"><strong class="has-text-white">ESC</strong>: Minimize and Clear Item Search, Advanced Search, and Set Search</p>
                            <p class="has-text-white"><strong class="has-text-white">Enter</strong>: Shortcut to <span v-html="callbackname"></span></p>

                        </div>
                    </div>


                    <!-- no results message -->
                    <div v-if="results.length == 0 && search != ''" class="has-text-centered p-5">

                        <p class="mb-3">No results found for "{{search}}". Report a missing card or item?</p>
                        <b-button @click="missingItemReport">File Missing Item Report</b-button>
                        <hr />

                        <b-button size="is-small" @click="clearSearch">Clear Search</b-button>
                    </div>

                </div>
               <footer class="card-footer">
                    <div class="card-footer-item has-text-white">
                        <span class="mr-4">Shortcut Keys</span>
                        <b-button size="is-small" icon="menu-down" />
                        <b-button size="is-small" icon="menu-up" />
                        <b-button size="is-small" icon="menu-left" />
                        <b-button size="is-small" icon="menu-right" />
                        <b-button size="is-small" icon="keyboard-return"> Return</b-button>
                        <b-button @click="closeFocus()" size="is-small" icon="keyboard-esc"> Return</b-button>
                    </div>

                </footer>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import GlobalSearchRow from '@/components/GlobalSearchRow'

export default {
    name: 'GlobalSearch',
    components: {
      GlobalSearchRow
    },
    props: {
        mode: String,
        firstSearch: {
            type: String,
            default: ''
        },
        showimage: {
            type: Boolean,
            default: false
        },
        open: {
            type: Boolean,
            default: false
        },
        showinventorybuttons: {
            type: Boolean,
            default: false
        },
        inventoryAddCallbackOn: {
            type: Boolean,
            default: false
        },
        showtext: {
            type: Boolean,
            default: false
        },
        showprice: {
            type: Boolean,
            default: true
        },
        callback: {
            type: Function,
            default: async function(emid){
              if(this.authenticated && this.inventoryAddCallbackOn){

                const res = await this.$echomtg.inventoryAdd(this.results[this.position].emid, {})

                this.$buefy.snackbar.open({
                  message: res.message,
                  type: 'is-warning',
                  queue: false,
                  duration: 10000,
                  position: 'is-bottom-right',
                  pauseOnHover: true,
                  actionText: 'UNDO',
                  onAction: async () => {
                      const deleted = await this.$echomtg.inventoryDeleteItem(res.inventory_id);
                      this.$buefy.snackbar.open({
                        message: `${res.inventory_id} ${deleted.message}`,
                        type: 'is-danger',
                        queue: false
                      });
                  }
                })

                 const quickstats = await this.$echomtg.inventoryQuickStats();
                if(quickstats.status == 'success'){
                  this.$store.commit('quickstats',quickstats.stats);
                }

                let inventory = [...this.currentInventoryPage]
                inventory.unshift({...res.card})

                this.$store.commit('currentInventoryPage',inventory);
                console.log('finsihed quick add')

              } else {
                window.location = this.results[this.position].url
              }

            }
        },
        callbackname: {
            type: String,
            default: '<span class="icon is-small"><i class="mdi mdi-share"></i></span><span>Open Card Page</span>'
        }
    },
    data () {
        return {
            limit: 30,
            start: 0,
            revealmore: 10,
            status: 0,
            results: [],
            expansion: '',
            position: 0,
            previewopen: false,
            search: this.firstSearch,
            acquiredOverridePrice: 0,
            acquiredOverrideItemCount: 15,
            staticAcquiredPrice: 0,
            textsearch: '',
            types: '',
        };

    },

    methods: {
      missingItemReport(){
        this.$router.push('/help/report-missing-item/')
        this.closeFocus()
      },
        searchCatalog: function() {
            this.position = 0

            if(this.search == '' && this.expansion=='' && this.textsearch=='' && this.types==''){
                this.results = []
                return true;
            }
            var $this = this

            let url = `${this.$config.API_DOMAIN}search/mass/?search=${this.search}&wcExpansion=${this.expansion}`
                url += `&limit=${this.limit}&textsearch=${this.textsearch}&type=${this.types}`

            fetch(encodeURI(url),{
              headers: this.$echomtg.getS2SHeadersNoJSON()
            }).then(response => response.json()).then(response => {

                if(response.data == undefined){
                    $this.results = []
                } else {
                    $this.results = response.data
                }

            })
        },
        enterAction: function(){
            this.closeFocus()
            this.callback(this.results[this.position].emid)
        },
        rightArrowAction: function(){

        },

        isTouchEnabled() {
            return ( 'ontouchstart' in window ) ||
                ( navigator.maxTouchPoints > 0 ) ||
                ( navigator.msMaxTouchPoints > 0 );
        },
        clearSearch: function(){
            this.search = ''
            this.expansion = ''
            this.textsearch = ''
            this.types = ''
            this.position = 0
            this.$refs.searchInput.focus()
            this.openFocus()
        },
        openAdvancedOptions: function(){
            this.textsearch = ''
            this.types = ''
            this.$refs.advancedSearchOptions.classList.toggle('open')
        },
        closeFocus() {
            this.$refs.globalSearchBox.classList.add('closed');
        },
        getCardURL(name){
            return name.replace(/ |,|_|'|\\|\/\/|\/|:|\.|&|\(|\)/gi,'-').toLowerCase().replace('--','-');
        },
        openFocus() {
            this.$refs.globalSearchBox.classList.remove('closed');
        },
        movePositionDown() {

            if((this.results.length - 1) > this.position){
                this.position = this.position + 1;
            }
        },
        displayCardPreview() {
          this.previewopen = true;
        },
        closeCardPreview() {
            this.previewopen = false;
        },
        movePositionUp() {
            if(this.position > 0){
                this.position = this.position - 1;
            }
        }

    },
    watch: {
        search: function (){
            this.searchCatalog()
            this.openFocus()
        },
        textsearch: function (){
            this.searchCatalog()
            this.openFocus()
        },
        types: function (){
            this.searchCatalog()
            this.openFocus()
        },
        expansion: function (){
            this.searchCatalog()
            this.openFocus()
        },
        position: function() {
            // HANDLES AUTO SCROLLING
            let el = 'pos'+this.position
            let fromTop = this.$refs[el][0].$el.getBoundingClientRect().top
            let pos = this.$refs.cardContent.scrollTop - 50
            if(fromTop > 380) {
                 pos = this.$refs.cardContent.scrollTop + 50
            }
            this.$refs.cardContent.scrollTop =  pos
        },
        acquiredOverridePrice: function(){
            this.staticAcquiredPrice = (this.acquiredOverridePrice / this.acquiredOverrideItemCount).toFixed(2)
        },
        acquiredOverrideItemCount: function(){
            this.staticAcquiredPrice = (this.acquiredOverridePrice / this.acquiredOverrideItemCount).toFixed(2)
        }

    },
    computed: {
        placeholderText() {
            return `Search Items to ${this.callbackname.replace(/<[^>]*>?/gm, '')}..`
        },
        ...mapState([
          'currentInventoryPage',
          'user',
          'authenticated',
          'quickstats'
        ]),
        currencysymbol() {
          return this.quickstats?.currency_symbol ? this.quickstats.currency_symbol : '$'
        }
    },
    mounted(){
        this.$refs.globalSearchBox.addEventListener('click', function (e) {
            let osh = this.$refs.globalSearchBox.offsetHeight
            let osw = this.$refs.globalSearchBox.offsetWidth
            if (e.offsetX > osw) {
                this.closeFocus()
            } else if (e.offsetX < 0) {
                this.closeFocus()
            } else if (e.offsetY > osh) {
                this.closeFocus()
            } else if (e.offsetY < 0) {
                this.closeFocus()
            } else {
                this.openFocus()
            }
        }.bind(this));

        this.$refs.globalSearchBox.addEventListener("keydown", event => {
            // down
            if (event.isComposing || event.keyCode === 38) {
                this.movePositionUp();
                this.openFocus();
                event.preventDefault();
                return true;
            }
            // up
            if (event.isComposing || event.keyCode === 40) {
                this.movePositionDown();
                this.openFocus();
                event.preventDefault();
                return true;
            }

            // left
            if (event.isComposing || event.keyCode === 37) {
                this.closeCardPreview();
                this.openFocus();
                return true;
            }

            // right
            if (event.isComposing || event.keyCode === 39) {
                this.displayCardPreview();
                this.openFocus();
                return true;
            }

            // clear search
            if(event.shiftKey && (event.keyCode === 46 || event.keyCode === 8)){
                event.preventDefault();
                this.search = '';
                return true;
            }

            // enter
            if (!this.isTouchEnabled() && (event.isComposing || event.keyCode === 13)) {
                this.enterAction();
                event.preventDefault();
                return true;
            }
            // esc
            if (event.isComposing || event.keyCode === 27) {
                this.closeFocus();
                this.clearSearch();
                event.preventDefault();
                return true;
            }



        });
    },
    created() {
        if(this.open == true){
            this.openFocus()
        }
      this.searchCatalog();

    }
}
</script>
