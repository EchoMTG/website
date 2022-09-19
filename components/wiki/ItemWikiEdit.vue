<template>
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
                                        <SetSelector
                                            v-bind:default-selection="currentSet"
                                            @changeSet="changeSet"
                                            />

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
</template>
<script>
import SetSelector from '@/components/wiki/SetSelector'

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
              this.$echomtg.createGrowl(data.message)
              this.closeModal()
          })
          .catch(err => {
              this.$echomtg.createGrowl(err.error)
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
          return this.item?.image ? this.item.image + '?' + Date.now() : ''
      },
      croppedImage: function(){
          return this.item?.image_cropped ? this.item.image_cropped + '?' + Date.now() : ''
      }

  },
  watch: {
      item: () => {}
  },
}
</script>
