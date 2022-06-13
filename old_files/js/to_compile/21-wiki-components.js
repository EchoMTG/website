/*

Usage
<set-selector v-bind:default-selection="currentSet" @changeSet="callback"></set-selector>

Emits "changeSet" which sends "set_name","set_code" as function params

Your call back would look like callback(set_name, set_code){ ....


 */
Vue.component('set-selector', {
    props: {
        defaultSelection: {
            type: String,
            default: ''
        }
    },
    data: function data() {
        return {
            sets: [],
            selection: this.defaultSelection,
            open: false,
            search: '',
            position: 0,
            block_type: ''
        }
    },
    methods: {
        getSets: function () {
            fetch('/api/sets/all/')
                .then(res => res.json())
                .then(data => {
                    this.sets = data.sets
                })
        },
        getClassName: function(pos){
            if(this.position == pos){
                return `panel-block is-active`
            } else {
                return `panel-block`
            }

        },
        clearSearch() {
          this.search = ''
            this.position = 0
        },
        movePositionDown() {
            if(this.position < this.sets.length) this.position += 1;
        },
        movePositionUp() {
            if(this.position != 0) this.position -= 1;
        },
        getIconName: function(setcode){
            let code = setcode.toLowerCase()
            return `ss ss-${code} ss-echo `
        },
        setOpen(bool) {
            this.open = bool;
        },
        enterAction() {
            let current = this.sets[this.position]
            this.changeSet(current.name, current.set_code)

        },
        changeSet: function(set,set_code){
            this.$emit('changeSet',set,set_code);
            this.setOpen(false)
        },
        isTouchEnabled() {
            return ( 'ontouchstart' in window ) ||
                ( navigator.maxTouchPoints > 0 ) ||
                ( navigator.msMaxTouchPoints > 0 );
        },
        blockTypeTabClass: function(name){
            return (name == this.block_type) ? 'is-active' : ''
        },
        setBlockType: function(name){
            this.block_type = name
        }
    },

    created: function()   {
        this.getSets()

    },
    computed: {
        mainClass: function(){
            if(this.open){
                return `setDropDownContainer open`
            }
            return `setDropDownContainer`
        },
        searchString: function() {
            return this.search == '' ? this.defaultSelection : this.search;
        },
        filteredSets: function() {
            if (this.search == '' && this.block_type == '') return this.sets;
            let returnSets = [...this.sets]
            if(this.block_type != ''){
                returnSets = returnSets.filter(item => {
                    if (item.block_type.toLowerCase().includes(this.block_type.toLowerCase())) {
                        return true
                    }

                    if (this.block_type == 'other' && !/(core)|(block)/i.test(item.block_type)) {
                        return true
                    }

                })
            }

            return returnSets.filter(item => {

              if (item.name.toLowerCase().includes(this.search.toLowerCase())) {
                  return true
              }
            })
        }
    },
    watch: {
        open: () => {},
        search: () => {},
        block_type: () => {},
        position: () => {}
    },
    mounted(){


        this.$refs.dropSearchContainer.addEventListener('click', function (e) {
            let osh = this.$refs.dropSearchContainer.offsetHeight
            let osw = this.$refs.dropSearchContainer.offsetWidth
            if (e.offsetX > osw) {
                this.setOpen(false)
            } else if (e.offsetX < 0) {
                this.setOpen(false)
            } else if (e.offsetY > osh) {
                this.setOpen(false)
            } else if (e.offsetY < 0) {
                this.setOpen(false)
            } else {
                this.setOpen(true)
            }
        }.bind(this));

        this.$refs.dropSearchContainer.addEventListener("keydown", event => {
            // down
            if (event.isComposing || event.keyCode === 38) {
                this.movePositionUp();
                this.setOpen(true)
                event.preventDefault();
                return true;
            }
            // up
            if (event.isComposing || event.keyCode === 40) {
                this.movePositionDown();
                this.setOpen(true)
                event.preventDefault();
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
                this.setOpen(false)
                this.clearSearch();
                event.preventDefault();

                return true;
            }

        });
    },
    template: `
<div class="relativeContainer">
    <div :class="mainClass" ref="dropSearchContainer">
        <nav class="panel is-link dropSearch">
      <div class="panel-top" >
          <div class="panel-block" style="padding: 0">
            <p class="control has-icons-left">
              <input  
                    :placeholder="this.defaultSelection"
                    ref="dropSearchInput" 
                    type="text" 
                    class="input has-text-grey"
                    v-model="search"
                    @click="setOpen(true)"
              >
              <span class="icon is-left">
                <i class="fa fa-search" aria-hidden="true"></i>
              </span>
            </p>
          </div>
          <p class="panel-tabs">
            <a @click="setBlockType('')" :class="blockTypeTabClass('')">All</a>
            <a @click="setBlockType('core')" :class="blockTypeTabClass('core')">Core</a>
            <a @click="setBlockType('block')" :class="blockTypeTabClass('block')">Block</a>
            <a @click="setBlockType('other')" :class="blockTypeTabClass('other')">Other</a>
          </p>
      </div>
      <a 
        v-for="(set,index) in filteredSets"
        :class="getClassName(index)"  
        :data-set-code="set.set_code" 
        :data-set-name="set.name"
        @click="changeSet(set.name, set.set_code)"
        >
        <span class="panel-icon">
          <i :class="getIconName(set.set_code)" aria-hidden="true"></i>
        </span>
        {{set.name}}
      </a>
    
      <div class="panel-block">
        <button class="button is-link is-outlined is-fullwidth" @click="clearSearch()">
          Clear Search
        </button>
      </div>
    </nav>
    </div>
</div>
`
});

Vue.component('item-wiki-edit', { 
    props: {
        item: {  
            type: Object,  
            default: function() {
                return {} 
            },  
            required: false   
        },
        open: { 
            type: Boolean, 
            default: false
        }
    },  
    data: function data() {
        return { 
           newSet: '',
            newSetCode: '',
           
            rarities: [
                'Mythic Rare',
                'Rare',
                'Uncommon',
                'Common',
                'Basic Land',
                'Token',
                'Special'
            ]
        };

    },
    methods: {
        togglePreview: function (){
            this.$refs.previewDiv.classList.toggle('isSelected')
        },
        updateWikiItem: function(){ 
            var formData = new FormData(this.$refs.wikiUpdateForm) //document.getElementById('wikiUpdateForm'))
            console.log(this.$refs.wikiUpdateForm)
            let url = `/api/wiki/update_name/`
            console.log(formData)
            fetch(url, {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                createGrowl(data.message)
                this.closeModal()
            })
            .catch(err => {
                createGrowl(err.error)
            })

        },
        changeSet: function(set,set_code){
            this.newSet = set
            this.newSetCode = set_code
        },
        closeModal() {
            this.$refs.imageURLInput.value = '' 
            this.newSet = ''
            this.newSetCode = ''
            this.$emit('emit-wiki-close');

        },
        checkRaritySelected: function(rarity,itemRarity=''){
            return rarity.toLowerCase().includes(itemRarity.toLowerCase())
        }
    },
    computed: {
        className: function() {
            let shown = this.open ? `is-active` : ``;
            return `modal ${shown}`;
        },
        currentSet: function(){
            return (this.newSet != '') ? this.newSet : this.item.set
        },
        currentSetCode: function(){
            return (this.newSetCode != '') ? this.newSetCode : this.item.set_code
        },
        fullImage: function(){
            return this.item.image + '?' + Date.now()
        },
        croppedImage: function(){
            return this.item.image_cropped + '?' + Date.now()
        }

    },
    watch: {
        item: () => {}
    },
    template: `
    <div :class="className" ref="modal" >
        <div class="modal-background" @click="closeModal()"></div>
            <div class="modal-card"> 

                <div class="modal-card-head">
                    <p  class="modal-card-title">Edit <strong>{{item.name}}</strong></p>
                    <button clasa="button is-outlined is-clickable" @click="closeModal()">
                        <span class="icon">
                        <i class="fa fa-times-circle"></i>
                        </span>
                    </button>
                </div>
                <form class="generic-form" ref="wikiUpdateForm" id="wikiUpdateForm">
                    <div class="modal-card-body">
                        <div class="columns">
                            <div class="column is-two-thirds">
                                <div class="field-body">
                                    <fieldset class="field">
                                        <label class="label">Card Name</label>
                                        <input class="input" name="name" type="text" :value="item.name">
                                        <p class="help">{{item.name}}</p>
                                    </fieldset>
                                </div>
                                <div class="field-body">
                                    <fieldset class="field">
                                        <label class="label">Replacement Image URL</label>
                                        <input class="input" ref="imageURLInput" name="image_url" type="text" placeholder="Paste Image full https url to replace current image">
                                        <p class="help">{{item.image}}</p>
                                    </fieldset>
                                </div>
                               
                                <div class="field-body">
                                    <div class="field">
                                        <label class="label">Rarity</label>
                                  
                                        <div class="select">
                                            <select id="rarity" name="rarity" >
                                                <option 
                                                    v-for="rarity in rarities" 
                                                    :selected="checkRaritySelected(rarity,item.rarity)"
                                                    >{{rarity}}</option>
                                            </select>
                                        </div>
                                        
                                         <p class="help">{{item.rarity}}</p>
                                    </div>
                                    <div class="field"  style="flex: 100; flex-grow: 100;">
                                        <label class="label">Expansion</label>
                                        <input type="hidden" name="set_code" :value="currentSetCode">
                                        <set-selector 
                                            v-bind:default-selection="currentSet"
                                            @changeSet="changeSet"
                                            ></set-selector>
                                       
                                           <p class="help">{{currentSet}} [{{currentSetCode}}]</p>
                                    </div>
                                     
                                </div>
                                <div class="field-body">
                                    <div class="field">
                                        <label class="label">Main Type</label>
                                        <!--<input class="input" name="main_type" type="text" :value="item.main_type">-->
                                        
                                        
                                        <div class="select">
                                            <select id="main_type" name="main_type" v-model="item.main_type">
                                                <option disabled="disabled">---</option>
                                                <option value="artifact">Artifact</option>
                                                <option value="creature">Creature</option>
                                                <option value="enchantment">Enchantment</option>
                                                <option value="instant">Instant</option>
                                                <option value="land">Land</option>
                                                <option value="planeswalker">Planeswalker</option>
                                                <option value="sorcery">Sorcery</option>
                                                <option value="tribal">Tribal</option>
        
                                                <option disabled="disabled">---</option>
                                                <option value="Conspiracy">Conspiracy</option>
                                                <option value="Phenomenon">Phenomenon</option>
                                                <option value="Plane">Plane</option>
                                                <option value="Scheme">Scheme</option>
                                                <option value="Vanguard">Vanguard</option>
                                                <option value="Lesson">Lesson</option>
                                                <option value="Art">Art Cards</option>
                                                <option value="Saga">Saga</option>
                                            </select>
                                        </div>
                                        
                                        <p class="help">{{item.main_type}}</p>
                                    </div>
                                    <div class="field" style="flex: 2; flex-grow: 100;">
                                        <label class="label">Full Types</label>
                                        <input class="input" id="types" name="types" type="text" :value="item.types">
                                        <p class="help">{{item.types}}</p>
                                    </div>
                                </div>
                                <fieldset class="field-body">
                                    <div class="field"  style="flex: 10; flex-grow: 10;">
                                    
                                        <label class="label">
                                            Manacost <div class="cardcost is-pulled-right" ><small><span class="symbol colorless">1</span> = { {1} } <span class="symbol u">u</span> = { {u} } <span class="splitmana"><span class="symbol split left u">b</span><span class="symbol split right b">b</span></span> = { {ub} }</small></div>
                                        </label>
                                        <input class="input" name="manacost" type="text" :value="item.mana_cost">
                                        <p class="help">{{item.mana_cost}}</p>
                                    </div>
                                    <div class="field" style="flex: 1;">
                                        <label class="label">CMC</label>
                                        <input class="input" name="cmc" type="text" :value="item.cmc">
                                        <p class="help">{{item.cmc}}</p>
                                    </div>
                                </fieldset>
                            </div>
                            <div class="column">
                                <img alt="full item image" :src="fullImage">
                                <img alt="cropped item image" :src="croppedImage">
                            </div>
                            
                        </div>
                        
                        <div class="field-body">
                            <fieldset class="field">
                                <label class="label">Multiverse ID <small>({{item.mid}})</small></label>
                                <input class="input" name="multiverse_id" type="text" :value="item.mid">
                            </fieldset>
                            <fieldset class="field">
                                <label class="label">Collector/Set Number <small>({{item.collectors_number}})</small></label>
                                <input class="input" name="set_number" type="text" :value="item.collectors_number">
                            </fieldset>
                            <fieldset class="field">
                                <label class="label">TCGplayer ID <small>({{item.tcgplayer_id}})</small></label>
                                <input class="input" name="tcgplayer_id" type="text" :value="item.tcgplayer_id">
                            </fieldset>
                        </div>
                        <input name="emid" :value="item.emid" type="hidden">

                    </div>


                    <div class="modal-card-foot">
                        <button class="button is-success" @click="updateWikiItem()">Update</button>
                        <button type="button" class="button " @click="closeModal()">Close</button>
                    </div>
                </form>


        </div>
    </div>
    `

})