// get selected
// pass in selected as a prop
// show selected at selection or rest
// fix z-index and overlay
Vue.component('typeahead-bulma-dropdown', {
    data () {
        return {
            dropdownHidden: true,
            filter: '',
            massagedOptions: [],
            selected: {},
            labelToShow: ''
        }
    },
    props: {
        small: {
            type: Boolean,
            default: false
        },
        labelKey: {
            type: String
        },
        valueKey: {
            type: String
        },
        inputPlaceholder: {
            type: String,
            default: 'Search'
        },
        valueSelected: {
            type: String
        },
        callback: {
            type: Function,
            default: function(){}
        },
        passthroughObject: {
            type: Object,
            default: () => {}
        },
        opts: {
            type: Array,
            default: () => []
        }
    },
    template: `
    <nav class="panel typeahead-bulma-dropdown">
      <div class="panel-header">
        <p class="control has-icons-left has-icons-right">
          <span class="icon is-right" @click="close()">
            <a v-bind:class="clearIconClass"></a>
          </span>
          <input v-bind:class="inputClass" type="text" :placeholder="inputPlaceholder" v-model="filter" @click="open()" @keydown="open(false)">
          <span class="icon is-left">
            <i v-bind:class="searchIconClass" aria-hidden="true"></i>
            <i v-bind:class="dropdownIconClass" aria-hidden="true"></i>
          </span>
        </p>
      </div>
      <div v-bind:class="dropdownClass" ref="dropdown" @mouseleave="close()">
          <a v-bind:class="panelBlockClass"  v-for="item in filteredAndSorted" @click="select(item)">
            {{item.label}}
          </a>
      </div>
    </nav>`,
    methods: {
        select(obj) {
            this.selected = obj
            this.callback(obj,this.passthroughObject)
            this.close()
            this.filter = obj.label
            this.labelToShow = obj.label
        },
        open(clear=true){
            if(clear) this.filter = ''
            this.dropdownHidden = false
        },
        close(){
            this.dropdownHidden = true
            this.filter = this.selected.label
        },
        massageArray() {
            let $this = this

            this.opts.forEach(function (item) {
                let tempItem = {
                    label: item[$this.labelKey],
                    value: item[$this.valueKey]
                }

                if(tempItem.value.toLowerCase() == $this.valueSelected.toLowerCase()) {
                    $this.labelToShow = tempItem.label
                    $this.filter = tempItem.label
                    $this.selected = tempItem
                }
                $this.massagedOptions.push(tempItem)
            });
        }
    },
    created() {
        this.massageArray()
    },
    watch:{
      opts: function() {
          this.massageArray()
      },
        filter: function(){
          this.$refs.dropdown.scrollTop = 0;
        }
    },
    computed: {
        dropdownClass: function () {
            return {
                'is-hidden': this.dropdownHidden,
                'panel-scroll': true,
                'is-small': this.small
            }
        },
        inputClass: function () {
            return {
                'active-dropdown': !this.dropdownHidden,
                'input': true,
                'is-small': this.small
            }
        },
        dropdownIconClass: function () {
            return {
                'is-hidden': this.dropdownHidden,
                'fa': true,
                'fa-search': true
            }
        },
        searchIconClass: function () {
            return {
                'is-hidden': !this.dropdownHidden,
                'fa': true,
                'fa-caret-down': true
            }
        },
        clearIconClass: function (){
            return {
                'is-hidden': this.dropdownHidden,
                'fa': true,
                'fa-times-circle': true
            }
        },
        panelBlockClass: function (){
            return {
                'is-size-7': this.small,
                'panel-block': true,
                'has-background-white': true
            }
        },
        filteredAndSorted(){
            // function to compare names
            function compare(a, b) {
                if (a.label < b.label) return -1;
                if (a.label > b.label) return 1;
                return 0;
            }

            return this.massagedOptions.filter(item => {
                return item.label.toLowerCase().includes(this.filter.toLowerCase())
            }).sort(compare)
        }
    }
});


Vue.component('BulmaSelect', {
    data () {
        return {
            massagedOptions: [],
            selectedOption: 'en'
        }
    },
    props: {
        small: {
            type: Boolean,
            default: false
        },
        labelKey: {
            type: String
        },
        valueKey: {
            type: String
        },
        valueSelected: {
        },
        callback: {
            type: Function,
            default: function(){}
        },
        passthroughObject: {
            type: Object,
            default: () => {}
        },
        opts: {
            type: Array,
            default: () => []
        }
    },
    template: `
        <div class="field">
          <div class="control">
            <div v-bind:class="selectClass" >
              <select v-model="selectedOption" @change="fireCallback()">
                <option v-for="item in massagedOptions" :value="item.value">{{item.label}}</option>
              </select>
            </div>
          </div>
        </div>
    `,
    watch: {
         opts: function() {
             this.massageArray()
         }
    },
    methods: {
        fireCallback: function () {
            this.callback(this.selectedOption,this.passthroughObject)
        },
        massageArray() {
            let $this = this

            this.opts.forEach(function (item) {
                let tempItem = {
                    label: item[$this.labelKey],
                    value: item[$this.valueKey]
                }
                let tempVal = typeof tempItem.value == "string" ? tempItem.value.toLowerCase() : tempItem.value
                let selcVal = typeof $this.valueSelected == "string" ? $this.valueSelected.toLowerCase() : $this.valueSelected
                if(tempVal == selcVal) {
                    $this.selectedOption = tempVal
                }
                $this.massagedOptions.push(tempItem)
            });
        }
    },
    created(){
        this.massageArray()
        // default
        if(this.valueSelected == ''){
            this.selectedOption = this.massagedOptions[0].value
        } else {
            this.selectedOption = typeof this.valueSelected == "string" ? this.valueSelected.toLowerCase() : this.valueSelected
        }

    },
    computed: {
        selectClass: function () {
            return {
                'select': true,
                'is-small': this.small
            }
        }
    }
});