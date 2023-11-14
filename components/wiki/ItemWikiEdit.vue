<template>
  <div v-if="authenticated && parseInt(user.user_level) > 2" :class="isDarkModeActive ? 'has-background-black' : 'has-background-white'">
      <div class="modal-card">
        <div class="modal-card-head has-background-dark ">
            <p  class="modal-card-title has-text-white is-size-5 has-text-weight-bold">
              <b-icon icon="wizard-hat" /> Wiki Edit {{item.name}}</p>
            <b-button icon-left="close" @click="$emit('close')">
            </b-button>
        </div>
        <div class="generic-form" ref="wikiUpdateForm" id="wikiUpdateForm">
          <div class="modal-card-body has-background-light">
              <div class="columns">
                  <div class="column is-two-thirds">
                      <div class="field-body">
                          <fieldset class="field">
                              <label class="label">Card Name</label>
                              <input class="input" name="name" type="text" v-model="item.name">
                              <p class="help">{{originalItem.name}}</p>
                          </fieldset>
                      </div>
                      <div class="field-body">
                          <fieldset class="field">
                              <label class="label">Replacement Image URL</label>
                              <input class="input" v-model="imageurl" ref="imageURLInput" name="image_url" type="text" placeholder="Paste Image full https url to replace current image">
                              <p class="help">{{originalItem.image}}</p>
                          </fieldset>
                      </div>

                      <div class="field-body">
                          <div class="field">
                              <label class="label">Rarity</label>

                              <div class="select">
                                  <select id="rarity" name="rarity" >
                                      <option
                                          v-for="rarity in rarities"
                                          v-bind:key="rarity"
                                          :selected="checkRaritySelected(rarity,item.rarity)"
                                          >{{rarity}}</option>
                                  </select>
                              </div>

                                <p class="help">{{item.rarity}}</p>
                          </div>
                          <div class="field"  style="flex: 100; flex-grow: 100;">
                              <label class="label">Expansion</label>
                              <input type="hidden" name="set_code" v-model="item.set_code">
                              <SetSelector
                                  v-bind:default-selection="currentSet"
                                  @changeSet="changeSet"
                                  />

                                  <p class="help">{{originalItem.set}} [{{originalItem.set_code}}]</p>
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

                              <p class="help">{{originalItem.main_type}}</p>
                          </div>
                          <div class="field" style="flex: 2; flex-grow: 100;">
                              <label class="label">Full Types</label>
                              <input class="input" id="types" name="types" type="text" v-model="item.types">
                              <p class="help">{{originalItem.types}}</p>
                          </div>
                      </div>
                      <fieldset class="field-body">
                          <div class="field"  style="flex: 10; flex-grow: 10;">

                              <label class="label">
                                  Manacost <div class="cardcost is-pulled-right" ><small><span class="symbol colorless">1</span> = { {1} } <span class="symbol u">u</span> = { {u} } <span class="splitmana"><span class="symbol split left u">b</span><span class="symbol split right b">b</span></span> = { {ub} }</small></div>
                              </label>
                              <input class="input" name="manacost" type="text" v-model="item.mana_cost">
                              <p class="help">{{originalItem.mana_cost}}</p>
                          </div>
                          <div class="field" style="flex: 1;">
                              <label class="label">CMC</label>
                              <input class="input" name="cmc" type="text" v-model="item.cmc">
                              <p class="help">{{originalItem.cmc}}</p>
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
                      <label class="label">Multiverse ID <small>({{originalItem.mid}})</small></label>
                      <input class="input" name="multiverse_id" type="text" v-model="item.mid">
                  </fieldset>
                  <fieldset class="field">
                      <label class="label">Collector/Set Number <small>({{originalItem.collectors_number}})</small></label>
                      <input class="input" name="set_number" type="text" v-model="item.collectors_number">
                  </fieldset>
                  <fieldset class="field">
                      <label class="label">TCGplayer ID <small>({{originalItem.tcgplayer_id}})</small></label>
                      <input class="input" name="tcgplayer_id" type="text" v-model="item.tcgplayer_id">
                  </fieldset>
              </div>
              <input name="emid" v-model="item.emid" type="hidden">

          </div>


          <div class="modal-card-foot">
              <b-button type="is-success" @click="updateWikiItem">Update</b-button>
              <button type="button" class="button " @click="$emit('close')">Close</button>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import SetSelector from '@/components/wiki/SetSelector'
import { mapState } from 'vuex'

export default {
  name: 'ItemWikiEdit',
  components: { SetSelector },
  props: {
      item: {
          type: Object,
          default: function() {
              return {}
          },
          required: false
      },
      originalItem: {
          type: Object,
          default: function() {
              return {}
          },
          required: false
      },
      callback: {
        type: Function,
        required: false
      }
  },
  data: function data() {
      return {
          newSet: '',
          imageurl: null,
          isImageModalActive: false,
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
    async updateWikiItem(){
        try {

          let body = {
            "emid": this.item.emid,
          }
          // name
          if(this.item.name != this.originalItem.name){
            body.name = this.item.name;
          }
          // rarity
          if(this.item.rarity != this.originalItem.rarity){
            body.rarity = this.item.rarity;
          }
          // cmc
          if(this.item.cmc != this.originalItem.cmc){
            body.cmc = this.item.cmc;
          }
          // mana cost
          if(this.item.mana_cost != this.originalItem.mana_cost){
            body.mana_cost = this.item.mana_cost;
          }
          // expansion
          if(this.item.set_code !== this.originalItem.set_code){
            body.set_code = this.item.set_code;
          }

          // main_type
          if(this.item.main_type !== this.originalItem.main_type){
            body.main_type = this.item.main_type;
          }

            // types
          if(this.item.types !== this.originalItem.types){
            body.types = this.item.types;
          }

            // tcgplayer_id
          if(this.item.tcgplayer_id !== this.originalItem.tcgplayer_id){
            body.tcgplayer_id = this.item.tcgplayer_id;
          }

            // multiverse_id
          if(this.item.mid !== this.originalItem.mid){
            body.multiverse_id = this.item.mid;
          }

            // set_number
          if(this.item.collectors_number !== this.originalItem.collectors_number){
            body.set_number = this.item.collectors_number;
          }

          // set_number
          if(this.item.card_text != this.originalItem.card_text){
            body.oracle_text = this.item.card_text;
          }

          // flavor_text
          if(this.item.flavor_text != this.originalItem.flavor_text){
            body.flavor_text = this.item.flavor_text;
          }

          // flavor_text
          if(this.imageurl !== '' && this.imageurl !== null){
            body.imageurl = this.imageurl;
          }

          const data = await this.$echomtg.wikiItemPatch(body)

          if(data.status == 'success'){

            this.$buefy.snackbar.open({
              message: data.message,
              queue: true
            })
          } else {
             this.$buefy.snackbar.open({
              message: data.message,
              queue: true
            })
          }
        } catch (err){
          console.log(err)
        }

        this.$emit('close')

    },
    changeSet: function(set,set_code){
        this.newSet = set
        this.item.set_code = set_code
    },
    checkRaritySelected: function(rarity,itemRarity=''){
        return rarity.toLowerCase().includes(itemRarity.toLowerCase())
    }
  },
  computed: {
    currentSet: function(){
        return (this.newSet != '') ? this.newSet : this.item.set
    },
    currentSetCode: function(){
        return (this.newSetCode != '') ? this.newSetCode : this.item.set_code
    },
    fullImage: function(){
        return this.item?.image ? this.item.image + '?' + Date.now() : ''
    },
    croppedImage: function(){
        return this.item?.image_cropped ? this.item.image_cropped + '?' + Date.now() : ''
    },
    ...mapState([
      'user',
      'authenticated',
      'isDarkModeActive'
    ])

  }
}
</script>
