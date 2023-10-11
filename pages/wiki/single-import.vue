<template>
  <div class="is-relative">
    <echo-bread-crumbs :data="crumbs" />
    <section class="hero is-primary">
      <div class="hero-body">
          <div class="container">
            <h1 class="title is-size-4"><span class="fa fa-present"></span> Single Import Entry</h1>
            <p class="">Search for a Missing Product, if you find a missing product, click the add product button. <br>
                If you cannot find a card specific sealed product try narrowing your search like "theros fat pack". <br>
                If that does not work, find the item on tcgplayer.com, copy the name and search the full name again here.</p>
        </div>
      </div>
    </section>
    <section>
      <div class="columns m-2" ref="searchBox">

        <div class="column">

            <b-input

                placeholder="Search by name..."
                type="search"
                v-model="search"
                size="is-small"
                class="mr-1"
                icon="magnify" />
              <b-button @click="searchSealed" icon-left="magnify" type="is-info">Search</b-button>

        </div>
        <div class="column is-hidden-touch">
          <b-select v-model="game">
            <option v-for="g in games" :value="g.id" v-bind:key="g.id">{{g.name}}</option>
          </b-select>
        </div>
      </div>
    </section>
    <section>
      <b-table :data="items" :mobile-cards="false" striped>
        <b-table-column v-slot="props" field="name" label="Name">
          <div class="is-flex">
          <img :src="props.row.image" width="100" :alt="props.row.name" />
          <span>{{props.row.name}}</span>
          </div>
        </b-table-column>
        <b-table-column v-slot="props" field="prices.tcg_mid" label="Prices">
          <strong>Market:</strong> {{props.row.prices.tcg_market}}<br>
            <strong>Low:</strong> {{props.row.prices.tcg_low}}<br>
            <strong>Mid:</strong> {{props.row.prices.tcg_mid}}<br>
            <strong>High:</strong> {{props.row.prices.tcg_high}}
        </b-table-column>
        <b-table-column v-slot="props">
          <b-button icon-left="plus" type="is-success" @click="insert(props.row)">
              Add Item
          </b-button>
        </b-table-column>
      </b-table>
    </section>

  </div>
</template>

<script>

// @ is an alias to /src
import { mapState } from 'vuex'
import APIDocs from '~/components/api/api-data';
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue';

export default {
  name: 'single',
  components: {
    EchoBreadCrumbs
  },
  data () {
    return {
      search: '',
      game: 1,
      games: [],
      items: []
    }
  },
  props: {
    apidocs: {
      type: Array,
      default: function() {
        return APIDocs.item
      }
    }
  },
  computed: {
    crumbs: () => [
      {
        url: '/wiki/',
        label: 'Wiki Dashboard',
        icon: 'wizard-hat'
      },
       {
        url: '/wiki/sealed/',
        label: 'Sealed',
        icon: 'movie-open-edit'
      }
    ],
    ...mapState([
      'user'
    ])
  },
  async fetch() {
    //console.log('async from index',req)
    await this.getGames();
  },
  methods: {
    getLargeImage(productId){
      return `https://product-images.tcgplayer.com/fit-in/874x874/${productId}.jpg`;

    },
    async getGames() {
      const data = await this.$echomtg.getGames();
      this.games = data.data
      console.log(this.games)
    },
     async searchSealed() {
            this.ready = false
            let searchEncoded = encodeURI(this.search)
            let endpoint = `https://dev.echomtg.com/api/wiki/search_sealed/?search=${searchEncoded}&game=${this.game}`
            await fetch(endpoint,{
              headers: this.$echomtg.getUserHeaders()
            }).then((response) => {
                return response.json();
            }).then((json) => {
                this.$buefy.toast.open({message: json.message})

                this.ready = true
                if(json.status == "success") {
                    this.items = json.items
                } else {
                    this.items = []
                }

            }).catch(function(err){

                this.$buefy.toast.open({message:"Search Failed"});
                this.items = []
                this.ready = true
            });
        },

      insert: function() {

          fetch('https://www.echomtg.com/api/wiki/insert/', {
              headers: this.$echomtg.getUserHeaders(),
              method: 'post',
              body: JSON.stringify(this.item)
          }).then(function(response) {
              return response.json();
          }).then(function(data) {

              this.$buefy.toast.open({message: data.message})
          }).catch(function(err){
              createGrowl("Insert Failed");
          });

      }
  },
  head () {
      return {
          title: `Wiki: Sealed`,
          meta: [
            { hid: 'og:image', property: 'og:image', content: `https://assets.echomtg.com/images/echomtg-og-default.png?1` },
            {
              hid: 'description',
              name: 'description',
              content:  `Wiki sealed manager.`
            }
          ]

      }
    }
}
</script>
