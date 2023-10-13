<template>
  <tr>
    <!--<td v-if="card.extra_details.echo_id !== undefined ">{{card.extra_details.echo_id}}</td>-->
    <td>{{card.quantity}}</td>
    <td>{{card.name}}</td>
    <td v-if="listtype !== 'error'">{{card.expansion}}</td>
    <td v-if="listtype !== 'error'">{{card.set_code}}</td>
    <td colspan="2" v-if="listtype == 'error'">
      <set-selector :callback="setExpansion" />
    </td>
    <td>
    <b-select
      size="is-small"
      v-model="card.language">
        <option v-for="opt in languages" v-bind:key="opt.lang" :value="opt.lang">{{opt.name}}</option>
      </b-select>
    </td>
    <td>
      <b-select
        size="is-small"
        v-model="card.foil">
        <option v-for="opt in foils" v-bind:key="opt.value" :value="opt.value">{{opt.name}}</option>
      </b-select>
    </td>
    <td>
      <b-select
        size="is-small"
        v-model="card.condition">
        <option v-for="opt in conditions" v-bind:key="opt.value" :value="opt.value">{{opt.name}}</option>
      </b-select>
    </td>
    <td>{{card.acquire_price}}</td>
    <td>{{card.acquire_date}}</td>
    <td>
      <a v-if="listtype !== 'error'" @click="importCard(listtype,ckey)" class="button is-small is-success has-icon has-text-white">
        <b-icon icon="arrow-up" size="is-small"/>
          <!--<span>Remove</span>-->
      </a>
      <a @click="removeCard(listtype,ckey)" class="button is-small is-danger has-icon has-text-white">
        <b-icon icon="delete" size="is-small"/>
          <!--<span>Remove</span>-->
      </a>
    </td>
</tr>
</template>
<script>
import { mapState } from 'vuex'
import SetSelector from '@/components/magic/SetSelector.vue'

export default {
  name: 'ImportItemRow',
  components: {
    SetSelector
  },
  data () {
    return {
      sets: [],
      expansion: '',
      languages: [{
              lang: 'en',
              name: 'English'
          },{
              lang: 'de',
              name: 'German'
          },{
              lang: 'fr',
              name: 'French'
          },{
              lang: 'ru',
              name: 'Russian'
          },{
              lang: 'it',
              name: 'Italian'
          },{
              lang: 'es',
              name: 'Spanish'
          },{
              lang: 'pt',
              name: 'Portuguese'
          },{
              lang: 'CT',
              name: 'Chinese Traditional'
          },{
              lang: 'CS',
              name: 'Chinese Simplified'
          },{
              lang: 'jp',
              name: 'Japanese'
          },{
              lang: 'kr',
              name: 'Korean'
          }
      ],
      foils: [
          {
              name: 'Normal',
              value: false
          },{
              name: 'Foil',
              value: true
          }
      ],

      conditions: [
          {
              name: 'Near Mint',
              value: 'nm'
          },{
              name: 'Lightly Played',
              value: 'lp'
          },{
              name: 'Moderately Played',
              value: 'mp'
          },{
              name: 'Heavily Played',
              value: 'hp'
          },{
              name: 'Damaged',
              value: 'D'
          },{
              name: 'Altered',
              value: 'alt'
          },{
              name: 'Artist Proof',
              value: 'art'
          },{
              name: 'Signed',
              value: 'sgn'
          },{
              name: 'BGS Graded',
              value: 'bgs'
          },{
              name: 'PSA Graded',
              value: 'psa'
          }
      ]
    }
  },
  props: {
    card: {
      type: Object,
      required: true
    },
    ckey: {
      type: Number,
      required: true
    },
    listtype: {
      type: String
    }
  },
  methods: {
    removeCard: function(listtype,index) {
        let arrName = listtype == 'error' ? 'errorCards' : 'cards'
        this.$delete(this.$parent[arrName],index)
    },
    importCard:async function(listtype,index){
        let arrName = listtype == 'error' ? 'errorCards' : 'cards'
        let results = await this.$parent.importCard(this.$parent[arrName][index])
        if(results.status == 'success'){
            this.$delete(this.$parent[arrName], index);
        } else {

            this.$parent.errorCards.push(this.$parent[arrName][index])
            this.$delete(this.$parent[arrName], index);
        }

    },
    setExpansion: function(obj){

        let arrName = this.listtype == 'error' ? 'errorCards' : 'cards'
        let item = this.$parent[arrName][this.ckey]
        item.set_code = obj.set_code;
        item.expansion = obj.name;
        this.$set(this.$parent[arrName], this.ckey, item)
    },
    setFoil: function(value, obj){
        let arrName = obj.listtype == 'error' ? 'errorCards' : 'cards'
        let item = this.$parent[arrName][obj.index]
        item.foil = value;
        this.$set(this.$parent[arrName], obj.index, item)
    },
    setLanguage: function(value, obj){
        let arrName = obj.listtype == 'error' ? 'errorCards' : 'cards'
        let item = this.$parent[arrName][obj.index]
        item.language = value;
        this.$set(this.$parent[arrName], obj.index, item)
    },
    setCondition: function(value, obj){
        let arrName = obj.listtype == 'error' ? 'errorCards' : 'cards'
        let item = this.$parent[arrName][obj.index]
        item.condition = value;
        this.$set(this.$parent[arrName], obj.index, item)
    },

  },
  created(){
    this.card.condition = this.card.condition.toLowerCase();
    this.card.language = this.card.language.toLowerCase();
  }
}
</script>
