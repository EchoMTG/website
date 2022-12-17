<template>
  <div class="is-relative">
    <echo-bread-crumbs :data="crumbs" />
    <section class="hero is-primary">
      <div class="hero-body">
          <div class="container">
              <h1 class="title">
                  Import Single
              </h1>
              <h3 class="subtitle">
                  Missing a card or item? Use this tool.
              </h3>
          </div>
      </div>
    </section>

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
      search: '',
      docs: [],
      api_token: ''
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
  asyncData({req}) {
    //console.log('async from index',req)
  },
  methods: {

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
