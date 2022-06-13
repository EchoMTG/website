
Vue.component('set-view', {
    data: function data() {

        return {
            title: 'Set Name',
            items: [],
            tab: 'list',
            setCode: '',
            setData: {},
            cardsOwned: {},
        };

    },
    methods: {
        setTab: function(str){
            this.$refs[this.tab+'Tab'].parentElement.classList.remove('is-active')
            this.tab = str
            this.$refs[str+'Tab'].parentElement.classList.add('is-active')
        },
        addFullSet: function() {
            var r = confirm("Add one of everycard? This cannot be undone.");
		    if (r == true) {
                this.items.forEach(item => {
                    setTimeout(addToInventoryByEchoID(item.emid),500);
                });
                createGrowl('Set Added');
                reloadInventoryStats();
            }
        },
        getItems: function(){
            if(this.setCode == '') return

            let endpoint = `/api/data/set/?set_code=${this.setCode}`

            fetch(endpoint).then((response) => {
                return response.json();
            }).then((json) => {
                if(json.status != 'error'){
                    this.items = json.set.items;
                    this.setData = json.set;
                    this.cardsOwned = json.set.owned; // its and array when empty
                } else {
                    createGrowl(json.message);
                }
            }).catch(function (error) {
                createGrowl(error);
            });
        },
        lazyLoad: function () {
            let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
            let active = false;
            if (active === false) {
              active = true;
              setTimeout(() => {
                lazyImages.forEach(function (lazyImage) {
                  if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImages = lazyImages.filter(function (image) {
                      return image !== lazyImage;
                    });
        
                    if (lazyImages.length === 0) {
                      window.removeEventListener("scroll", this.lazyLoad);
                    }
                  }
                });
                active = false;
              }, 200)
        
            }
          },

    },
    created () {
        this.setCode = this.$parent.setCode
        this.userLevel = this.$parent.userLevel
        this.getItems()
    },
    mounted() {
        window.addEventListener("scroll", this.lazyLoad);
        window.scrollTo(0, 0);
        setTimeout(this.lazyLoad, 500)
      },
});

Vue.component('set-summary',{
    props:['items', 'name'],
    data: function data() {

        return {
            title: 'SUMMARY',
            topImage: 'https://assets.echomtg.com/magic/cards/cropped/316.hq.jpg'

        }

    },
    computed: {
        topcardImage: function(){
            if(this.items){
                return this.items[0].image_cropped
            }
            return this.topImage
        }
    }
})

Vue.component('trending-cards', {
    data: function data() {

        return {
            title: 'Trending',
        }
    }

});

Vue.component('sealed-product', {
    data: function data() {

        return {
            title: 'Sealed',

        }

    }

});
Vue.component('pull-odds', {
    data: function data() {

        return {
            title: 'Pull Odds',

        }

    },
    methods: {
        emitAddFullSet: function (){
            this.$emit('add-full-set');
        }
    }
    

});

Vue.component('set-item-list', {
    props: {
        items: {
            type: Array,
            default: [],
            required: true
        },
        cardsowned: {
            type: Object
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
        this.findVariants()
    },
    computed: {
        filteredItems: function(){
            
            if(this.items.length == 0) return
            let scrollPos = window.scrollY == 0 ? 1 : 0
            window.scroll({
                top: scrollPos,
                left: 0,
                behavior: 'smooth'
              }); // account for lazy load

            let returnItems = [...this.items]

            // show owned  
            if(this.showOwned != '') {
                if(this.showOwned == "true reg"){
                    returnItems = returnItems.filter(item => {
                        return this.cardsowned.regular.hasOwnProperty(item.emid)
                    });
                } 

                if(this.showOwned == "true foil"){
                    returnItems = returnItems.filter(item => {
                        return this.cardsowned.foiled.hasOwnProperty(item.emid)
                    });
                } 
                
                if(this.showOwned == "false reg"){
                    returnItems = returnItems.filter(item => {
                        return !this.cardsowned.regular.hasOwnProperty(item.emid)
                    });
                }

                if(this.showOwned == "false foil"){
                    returnItems = returnItems.filter(item => {
                        return !this.cardsowned.foiled.hasOwnProperty(item.emid)
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
            window.scroll({
                top: 1,
                left: 0,
                behavior: 'smooth'
              }); // account for lazy load
        }
    },
    methods: {
        findVariants(){
            this.items.forEach(item => {
                if(/\(/.test(item.name) ){
                    m = item.name.match(/\((.*)\)/m);
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
            return this.cardsowned[type].hasOwnProperty(emid) ? this.cardsowned[type][emid] : 0
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
    }

});



Vue.component('set-tr', {
    props: {
        item: { 
            type: Object,
            default: function () {
                return { name: 'card name' }
            },
            required: true
        }, 
        owned: {
            type: Number,
            default: 0
        },
        ownedfoil: {
            type: Number,
            default: 0
        },
        fullview: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        image: function() {
            return `https://assets.echomtg.com/magic/cards/original/${this.item.emid}.jpg`
        },
        imageSrcSet: function() {
            return `${this.item.image_cropped} 1x`
        },
        imageSrcSetBig: function() {
            return `${this.image} 1x`
        },
    },
    //https://assets.echomtg.com/magic/cards/magic-card-back.jpg
    template: ` 
        <tr class="setItemRow">
            <td>  
                <span v-if="owned > 0" title="You own this card" style="color: white; -webkit-text-stroke: 1px #ccc;" class="fa fa-check-circle">
                {{owned}}
                </span>
                <span v-if="ownedfoil > 0" title="You own this card" style="color: yellow; -webkit-text-stroke: 1px gold;" class="fa fa-check-circle">
                {{ownedfoil}}
                </span>
                
            </td>
            <td class="itemTDView content">
                  
            
                <a v-if="this.$parent.userlevel >= 3" href="javascript:void(0)" class="button is-small is-pulled-right is-outlined wikiButton" @click="emitWiki()" >Wiki Edit</a>
                   
                <img 
                    v-if="fullview == false"
                    :data-src="item.image_cropped" 
                    src="https://assets.echomtg.com/magic/cards/cropped/placeholder.png" 
                    :data-srcset="imageSrcSetBig"
                    height="40px" class="lazy" style="height: 40px; float: left; margin-right: 4px;">

                <img 
                    v-if="fullview == true"
                    :src="image"
                    :data-src="item.image" 
                    :data-srcset="imageSrcSet"
                    height="120px"  style="width: 120px; float: left; margin-right: 4px;">

                <strong>
                    <a :href="item.echo_url" class="card-reveal" :data-foil-price="this.item.foil_price" :data-tcg-mid="this.item.tcg_mid" :data-image="image">{{item.name}}</a></strong> 
                    {{item.types}} 
                    <span v-if="item.reserve_list == 1">Reserved List</span><br>
                <em v-html="manaSymbols(item.mc)"></em> 
                
                
                <div class="content padded" v-if="fullview">
                    {{item.card_text}}
                </div>

            </td>
            <td >
                <span class="is-mobile">[{{item.collectors_number}}]</span>
                <span class="has-text-white">{{item.rarity}}</span>
            </td>
            <td class="is-hidden-mobile">
                <span>{{item.collectors_number}}</span>
            </td>
            <td>
                <span v-if="item.price_change > 0" class="has-text-success">
                    <i class="fa  fa-chevron-up "></i>
                </span>
                <span v-if="item.price_change < 0" class="has-text-danger">
                    <i class="fa  fa-chevron-down "></i>
                </span>
                <span v-if="item.price_change != 0" class="has-text-weight-bold">{{item.price_change}}%</span>
            </td>
            <td class="is-flex-direction-column">
                <span class="has-text-weight-bold has-text-white">{{item.tcg_mid}}</span>
                <button v-if="item.tcg_mid > 0" class="button is-info is-small is-outlined " @click="inventoryQuickAdd(item.emid,0)">
                    <span class="icon">
                        <i class="fa fa-plus"></i>
                    </span>
                </button>
            </td>
            <td class="is-flex-direction-column">
                <span  class="has-text-weight-bold has-text-warning">{{item.foil_price}}</span>
                <button v-if="item.foil_price > 0" class="button is-warning is-small is-outlined " @click="inventoryQuickAdd(item.emid,1)">
                    <span class="icon">
                        <i class="fa fa-plus"></i>
                    </span>
                </button>
            </td>
        </tr>
    `,
    data: function data() {
        return {
            title: 'Item',
        };
    },
    created () {
        //window.scrollTo(0, 1); // account for lazy load
    },

    methods: {
        manaSymbols: function(mc){
            return convertSymbols(mc);
        },
        inventoryQuickAdd: function(emid,foil=0) {
            let url = `/api/inventory/add/emid=${emid}&foil=${foil}`;
            fetch(url).then(res => res.json()).then(response => {
                createGrowl(response.message);
            })
        },
        emitWiki: function (){
            this.$emit('emit-wiki',this.item);
        }
    }

});



