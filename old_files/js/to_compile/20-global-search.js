Vue.component('search-row',{
    props: [
        'currencysymbol',
        'name',
        'emid',
        'setCode',
        'item',
        'setName',
        'callbackname',
        'showinventorybuttons',
        'manacost',
        'url',
        'showimage',
        'selected',
        'previewopen',
        'acquiredprice'
    ],
    data: function data() {
        return {
            quantityFoil: 1,
            quantity: 1,
            priceAcquired: this.acquiredprice,
            priceAcquiredFoil: this.acquiredprice,
        };

    },
    methods: {
        primaryCallback: function (){
            this.$emit('primaryCallback');
        },
        togglePreview: function (){
            this.$refs.previewDiv.classList.toggle('isSelected')
        },
        addRowToInventory: function(foil=0){

            let ap = foil == 0 ? parseFloat(this.priceAcquired) : parseFloat(this.priceAcquiredFoil);
            let qty = foil == 0 ? this.quantity : this.quantityFoil;
            let url = `/api/inventory/add/`
            let payload = {
                foil: foil,
                emid: this.emid,
                acquired_price: ap,
                quantity: qty
            }
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(payload)
            })
                .then(res => res.json())
                .then(data => {
                    createGrowl(data.message)
                    reloadInventory();
                    reloadInventoryStats();
                })
                .catch(err => {
                    createGrowl(err.error)
                })


        }
    },
    computed: {
        className: function() {

            let hasImage = this.showimage ? `searchHasImage` : ``;
            let selected = this.selected ? `isSelected` : ``;
            return `searchRow ${hasImage} ${selected}`;
        },
        iconClassName: function() {

            let stl = this.setCode.toLowerCase()
            return `ss ss-${stl} ss-echo ss-2x`;
        },
        previewOpenClass: function(){
          return (this.previewopen) ? 'previewIcon open' : 'previewIcon'
        },
        croppedImage: function(){
            // https://assets.echomtg.com/magic/cards/cropped/61502.hq.jpg
            return `https://assets.echomtg.com/magic/cards/cropped/${this.emid}.hq.jpg`
        },
        cardImage: function(){
            //
            return `https://assets.echomtg.com/magic/cards/original/${this.emid}.jpg`
        },
        regularPrice: function(){
            let price = (this.item.tcg_market > 0) ? this.item.tcg_market : this.item.tcg_mid;
            if(this.acquiredprice == 0) this.priceAcquired = price;
            return price > 0 ? price : 0
        },
        foilPrice: function(){
            let price = (this.item.foil_price > 0) ? this.item.foil_price : 0;
            if(this.acquiredprice == 0) this.priceAcquiredFoil = price;
            return price;
        }
    },
    template: `
        <div ref="main" :class="this.className">
            <i v-if="!showimage" :class="this.iconClassName"></i>
            <div v-if="showimage" class="searchImage">
                <div class="mana" v-html="manacost"></div>
                <i :class="this.iconClassName"></i>
                <img :src="croppedImage" :alt="this.name">
            </div>
           
            <div class="itemName is-flex is-flex-direction-column">
                <div>
                    <h4><a :href="url">{{name}}</a></h4>
                    <div :class="this.previewOpenClass" >
                        <div class="icon" @click="togglePreview">
                            <i class="fa fa-image"></i>
                        </div>
                        <div class="cardPreview" ref="previewDiv">
                            <img :src="this.cardImage" @click="togglePreview">
                        </div>
                    </div>
                </div>
                <div>
                    <p>{{setName}}</p>
                </div>
            </div>
            <div class="is-flex is-flex-direction-column searchRowPrices">
                <div>
                    <span v-if="regularPrice > 0" class="has-text-info">{{currencysymbol}}{{regularPrice}}</span>
                </div>
                <div>
                    <span v-if="foilPrice > 0"  class="has-text-warning">{{currencysymbol}}{{foilPrice}}</span>
                </div>
            </div>
            
            <div v-if="!showimage" v-html="manacost"></div>
            <div v-if="showinventorybuttons" class="is-flex is-flex-direction-column inventoryButtons">
                <div  v-if="regularPrice > 0 || foilPrice == 0" class="field has-addons">
                   <p class="control">
                        <button @click="addRowToInventory(0)" class="button is-small is-outlined is-info">
                           <span class="icon">
                              <i class="fa fa-plus"></i>
                            </span>
                            <span>Reg.</span>
                        </button>
                   </p>     
                   <p class="control">     
                        <input class="input is-info is-small  has-background-dark has-text-grey-light searchInput searchQuantity" 
                        v-model="quantity"
                         maxlength="3"
                         />
                   </p>
                   <p class="control">     
                        <input class="input is-info is-small has-background-dark has-text-grey-light searchInput searchAcquiredPrice" 
                        v-model="priceAcquired" 
                        />
                   </p>
                </div>
                <div v-if="foilPrice > 0" class="field has-addons is-small">
                
                    <p class="control">
                        <button @click="addRowToInventory(1)" class="button is-small is-outlined is-warning">
                             <span class="icon">
                              <i class="fa fa-plus"></i>
                            </span>
                            <span>Foil</span>
                        </button>
                    </p>
                    <p class="control">
                        <input class="input is-warning is-small searchInput has-background-dark has-text-grey-light searchQuantity" 
                        v-model="quantityFoil"
                         maxlength="3"
                         />
                    </p>
                    <p class="control">
                        <input class="input is-warning is-small searchInput has-background-dark has-text-grey-light searchAcquiredPrice" 
                        v-model="priceAcquiredFoil" />
                    </p> 
                
                </div>
            </div> 
            <div v-if="!showinventorybuttons"  class="searchRowUtilities">
                <button v-html="callbackname" class="button is-small is-outlined" v-if="callbackname != ''" @click="primaryCallback()"></button>
            </div>
             
            
        </div>
    `

})
Vue.component('global-search', {
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
            default: function(emid){
                window.location = this.results[this.position].url
            }
        },
        callbackname: {
            type: String,
            default: '<span class="icon is-small"><i class="fa fa-share"></i></span><span>Open Card Page</span>'
        },
        currencysymbol: {
            type: String,
            default: '$'
        }
    },
    data: function data() {
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
        searchCatalog: function() {
            this.position = 0

            if(this.search == '' && this.expansion=='' && this.textsearch=='' && this.types==''){
                this.results = []
                return true;
            }
            var $this = this

            let url = `${api_url}search/mass/?search=${this.search}&wcExpansion=${this.expansion}`
                url += `&limit=${this.limit}&textsearch=${this.textsearch}&type=${this.types}`

            fetch(encodeURI(url)).then(response => response.json()).then(response => {

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

    },
    template: `
<div class="global-search-container">
        <div class="global-search closed" ref="globalSearchBox">
            <div class="search-box card">
                <header class="card-header">
                    <div class="field search-input">
                       <div class="columns">
                          <div class="column searchColumn">
                            <div class="field has-addons">
                                <p class="control grow has-icons-left">
                                    <input 
                                        class="input is-small is-rounded item-search-input" 
                                        v-model="search" 
                                        @input="$event.target.composing = false"
                                        ref="searchInput" 
                                        type="text" 
                                        :placeholder="placeholderText">
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-search"></i>
                                    </span>
                                </p>
                                <p class="control">
                                     <button tabindex="-1" class="button is-small is-outlined clear-button" @click="clearSearch()">
                                          <span class="icon">
                                             <i class="fa fa-times-circle-o"></i>
                                          </span>
                                     </button>
                                </p>
                            </div>
                          </div>
                          <div class="column is-one-third expansionColumn">
                              <input class="input is-small expansion-search-input"  v-model="expansion" ref="expansionInput" type="text" placeholder="Set Name/Code...">
                          </div>
                       </div>
                                         
                    </div>
                    <div class="control inside-button">
                        <button class="button is-small is-outlined is-rounded advanced-options-button" @click="openAdvancedOptions()">
                            
                            <span class="buttonName">Advanced</span>
                            <span class="icon">
                                <i class="fa fa-caret-down"></i>
                            </span>
                        </button>
                    </div>  
                </header>
                <div  class="card-content">
                    <!-- how to message -->
                    <div class="advancedSearchOptions" ref="advancedSearchOptions">
                        <div class="container">
                            <div class="columns">
                                <div class="column">
                                    <div class="field has-addons">
                                        <p class="control">
                                            <a class="button is-static is-small has-text-grey">
                                                <span class="icon">
                                                    <i class="fa fa-text-height"></i>
                                                </span>
                                                <span>Card Text</span>
                                            </a>
                                        </p>
                                        <p class="control">
                                            <input 
                                                class="input is-small" 
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
                                            <a class="button is-static is-small has-text-grey">
                                                <span class="icon">
                                                    <i class="fa fa-male"></i>
                                                </span>
                                                <span>Types</span>
                                            </a>
                                        </p>
                                        <p class="control">
                                           <input 
                                            class="input is-small" 
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
                                                <a class="button is-static is-small has-text-grey">
                                                    <span class="icon">
                                                        <i class="fa fa-usd"></i>
                                                    </span>
                                                    <span>Acquired Price</span>
                                                </a>
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
                        <search-row 
                            v-for="(result, index) in results"
                            v-bind:name="result.name"
                            v-bind:setCode="result.setcode"
                            v-bind:setName="result.set"
                            v-bind:emid="result.emid"
                            v-bind:url="result.url"
                            v-bind:item="result"
                            v-bind:showinventorybuttons="showinventorybuttons"
                            v-bind:currencysymbol="currencysymbol"
                            :ref="'pos'+index"
                            v-bind:selected="index == position"
                            v-bind:acquiredprice = "staticAcquiredPrice"
                            v-bind:previewopen="index == position && previewopen"
                            v-bind:manacost="result.mana_cost"
                            :showimage="showimage"
                            :callbackname="callbackname"
                            @primaryCallback="callback(result.emid)"
                            ></search-row>
                    </div>
                    <!-- how to search message, shows when search is empty -->
                    <div v-if="results.length == 0 && search == ''">
                        <div class="container padded">
                            <h5 class="title is-size-4">Short Cuts</h5>
                            <p><strong>Shift + Delete:</strong> Clear Item Search</p>
                            <p><strong>Shift + Backspace:</strong> Clear Item Search</p>
                            <p><strong>ESC</strong>: Minimize and Clear Item Search, Advanced Search, and Set Search</p>
                            <p><strong>Enter</strong>: Shortcut to <span v-html="callbackname"></span></p>
                            
                        </div> 
                    </div>
                  
                    
                    <!-- no results message -->
                    <div v-if="results.length == 0 && search != ''">
                        No results found for "{{search}}".
                        <button class="button small" @click="clearSearch()">Clear Search</button>
                    </div>
                   
                </div>
               <footer class="card-footer">
                    <p class="card-footer-item">
                        
                        <a @click="this.movePositionUp()" class="button is-small ">
                            <span class="fa fa-caret-down"></span>
                        </a>
                        &nbsp;
                       <a @click="this.movePositionDown()" class="button is-small ">
                            <span class="fa fa-caret-up"></span>
                        </a>
                        &nbsp; results &nbsp; 
                        <a @click="this.closeCardPreview()" class="button is-small ">
                            <span class="fa fa-caret-left"></span>
                        </a>
                        &nbsp;
                       <a @click="this.displayCardPreview()" class="button is-small ">
                            <span class="fa fa-caret-right"></span>
                        </a> 
                         &nbsp; toggle preview &nbsp;
                        <a @click="enterAction()" class="button is-small">
                            <span class="icon">↵</span>
                            <span>Return</span>
                        </a>&nbsp;
                        to {{callbackname.replace(/<[^>]*>?/gm, '')}}  &nbsp;
                        
                        <a @click="closeFocus()" class="button is-small">ESC</a>
                        &nbsp; to exit.
                    </p>
                    
                </footer>
            </div>
        </div> 
    </div>
        `
})