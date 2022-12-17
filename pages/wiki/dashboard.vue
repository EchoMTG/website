<template>
  <div class="is-relative">
    <echo-bread-crumbs :data="crumbs" />
    <section class="hero is-primary">
      <div class="hero-body">
          <div class="container">
              <h1 class="title">
                  Wiki Dashboard
              </h1>
              <h3 class="subtitle">
                  Top level view of all things WIKI!
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
  name: 'Dashboard',
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
          title: `Echo Wiki Dashboard`,
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
