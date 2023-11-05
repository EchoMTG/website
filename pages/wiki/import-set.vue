<template>
  <div class="is-relative">
    <echo-bread-crumbs :data="crumbs" />
    <section class="hero is-primary">
      <div class="hero-body">
          <div class="container">
              <h1 class="title">
                  Import Set
              </h1>
              <h3 class="subtitle">
                  Import a whole set
              </h3>
          </div>
      </div>
    </section>
    <section class="container">
      <nav class="level">
        <div class="level-left">
        <b-input type="text" v-model="set_code" />
        <b-select v-model="game">
          <option value="1">MTG</option>
          <option value="71">Lorcana</option>

        </b-select>
        <b-button @click="extract" >Extract</b-button>
        </div>
      </nav>
      <b-table :data="itemsToImport">
        <b-table-column key="name" label="Name" v-slot="props">
          {{props.row.name}}
          <img :src="props.row.image" alt="card image" width="100" />
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
  name: 'ImportSingle',
  components: {
    EchoBreadCrumbs
  },
  data () {
    return {
      set_code: '',
      search: '',
      game: 1,
      itemsToImport: []
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
        url: '/wiki/import-set',
        label: 'Fetch Set',
        icon: 'download'
      }
    ],
    ...mapState([
      'user'
    ])
  },
  asyncData({req}) {
    //console.log('async from index',req)
  },
  methods: {
    async extract(){
      const res = await this.$echomtg.getReq(`wiki/fetch_set_tcgplayer/?set_code=${this.set_code}&game=${this.game}`)
      this.itemsToImport = res.data
    }
  },
  head () {
      return {
          title: `Import Set`,
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
