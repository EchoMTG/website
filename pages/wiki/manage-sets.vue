<template>
  <div class="is-relative">
    <echo-bread-crumbs :data="crumbs" />
    <section class="hero is-primary">
      <div class="hero-body">
          <div class="container">
              <h1 class="title">
                  Manage Sets
              </h1>
              <h3 class="subtitle">
                  Add and edit sets and expansions
              </h3>
          </div>
      </div>
    </section>
    <b-button @click="isAddModalActive = !isAddModalActive">Add Expansion</b-button>

    <b-modal v-model="isAddModalActive">

        <div class="card">
             <header class="card-header">
              <p class="card-header-title">
                Add Expansion
              </p>
              <b-button icon-left="close" type="is-dark" class="card-header-icon" aria-label="close" @click="cancel()">
              </b-button>
            </header>
            <section class="card-content">
                <form id="addExpansionForm" method="post">
                    <fieldset>
                        <label>Expansion Name</label>
                        <b-input type="text" v-model="expansion.name" />
                    </fieldset>
                    <div class="columns">
                        <div class="column is-three-fifths">
                            <fieldset>
                                <label>Release Date</label>
                                <b-input  v-model="expansion.release_date" type="date" />
                            </fieldset>
                            <fieldset>
                                <label>Set Code (3-4 letters)</label>
                               <b-input type="text" v-model="expansion.set_code" />
                            </fieldset>
                            <fieldset>
                                <label>Pack Code (pack's set code)</label>
                                <b-input type="text" v-model="expansion.pack_code" />
                            </fieldset>
                            <fieldset>
                                <label>Total Cards</label>
                                <b-input type="number" min="0" v-model="expansion.total_cards" />
                            </fieldset>

                        </div>
                        <div class="column">
                            <fieldset>
                                <label>Block Type</label>
                                <b-select v-model="expansion.type" >

                                    <option>block</option>
                                    <option>core</option>
                                    <option>duel</option>
                                    <option>special</option>
                                    <option>planechase</option>
                                    <option>promo</option>
                                    <option>commander</option>

                                </b-select>
                            </fieldset>

                            <fieldset>
                                <label>Format</label>
                                <b-select v-model="expansion.format">

                                    <option value="1">Standard</option>
                                    <option value="2">Modern</option>
                                    <option value="3">Legacy</option>

                                </b-select>
                            </fieldset>
                            <fieldset>
                                <label>Packs Per Box</label>
                                <b-input type="number" style="max-width: 70px" v-model="expansion.packs_per_box" />
                            </fieldset>

                        </div>



                    </div>
                </form>
            </section>
            <footer class="card-footer p-4">
                <b-button type="is-success" class="mr-2" @click="addExpansion">Add Expansion</b-button>
                <b-button type="is-dark" @click="cancel()">Cancel</b-button>
            </footer>
        </div>

    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import APIDocs from '~/components/api/api-data';
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue';

export default {
  name: 'ManageSets',
  components: {
    EchoBreadCrumbs
  },
  data () {
    return {
      new_set_code: '',
      search: '',
      scryfall_data: {},
      expansion: {},
      isAddModalActive: false
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
        url: '',
        label: 'Wiki',
        icon: 'wizard-hat'
      },
      {
        url: '/wiki/dashboard',
        label: 'Wiki Dashboard',
        icon: 'wizard-hat'
      },
       {
        url: '/wiki/manage-sets',
        label: 'Manage Sets',
        icon: 'movie-open-edit'
      }
    ],
    ...mapState([
      'user'
    ])
  },
  fetch() {
    if(this.user.user_level < 2){
      this.$nuxt.context.error({
          statusCode: 403,
          message: 'Not authorized to access this page. These pages are for WIKI team only.'
        });
    }
  },
  methods: {
    async getDataFromScryfall(){
      const res = await fetch(`https://api.scryfall.com/sets/${this.new_set_code}`);
      this.scryfall_data = await res.json();

    },
    async getExpansions() {
        this.ready = false
        let endpoint = `/api/sets/all/`
        await fetch(endpoint).then((response) => {
            return response.json();
        }).then((json) => {

            this.items = json.sets
            this.ready = true
        });
    },
     async addExpansion(){
        console.log(this.expansion)
        let $this = this

        await fetch('/api/wiki/add_expansion/', {
            method: 'post',
            body: JSON.stringify(this.expansion)
        }).then(function(response) {
            return response.json();
        }).then(function(data) {

            if(data.status == 'error'){
                createGrowl(data.message, 'times', 'red')
            } else {
                createGrowl(data.message, 'plus', 'green')
                $this.resetForm();
                $this.cancel();
                $this.$parent.getExpansions();
            }
        });



    },

  },
  head () {
      return {
          title: `Manage Sets`,
          meta: [
            { hid: 'og:image', property: 'og:image', content: `https://assets.echomtg.com/images/echomtg-og-default.png?1` },
            {
              hid: 'description',
              name: 'description',
              content:  `Manage the magic from the wiki dashboard!`
            }
          ]

      }
    }
}
</script>
