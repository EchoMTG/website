<template>
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
</template>
<script>

  import { mapState } from 'vuex'

  export default {

    name: "SetSelector",
    props: {
        defaultSelection: {
            type: String,
            default: ''
        }
    },
    data: function data() {
        return {
            selection: this.defaultSelection,
            open: false,
            search: '',
            position: 0,
            block_type: ''
        }
    },
    methods: {
        getSets: async function () {
          if(this.sets.length > 0) return;

            try{
              const setsData = await this.$echomtg.getSets();

              this.$store.commit('sets',setsData)
            } catch(err){
              console.log(err)
            }
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

    async created()   {
        await this.getSets()
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
        },
        ...mapState([
          'sets'
        ])
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
    }
  }
</script>
