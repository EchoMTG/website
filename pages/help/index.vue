<template>
  <div>
    <nuxt keep-alive />
    <echo-bread-crumbs :data="crumbs" />
    <div class="content m-5 mb-0">
      <h1>EchoMTG Help Section</h1>
      <p>Find help related to the EchoMTG application</p>

    </div>
     <div class="columns is-multiline m-3">
      <div class="column is-one-quarter" v-for="(section,index) in helpSections" :key="`${section.name}${index}`">
        <div class="card">

          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <b-icon :icon="section.icon" />
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{section.name}}</p>
              </div>
            </div>

            <div class="content">
              {{section.description}}
            </div>
          </div>
          <footer class="card-footer">
            <a :href="section.url" class="card-footer-item">Open {{section.name}} Help Section</a>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FullAd from '~/components/cta/FullAd.vue'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue'
import CreateAccountModal from '~/components/user/CreateAccountModal.vue'

export default {
  name: 'Help',
  components: {
    EchoBreadCrumbs,
    CreateAccountModal,
    FullAd
  },
  data () {
    return {

    }
  },
  computed: {
    crumbs() {
      return [
        {
          label: 'Help',
          url: '/help/',
          icon: 'lifebuoy'

        }
      ]
    },
    helpSections() {
      return [
        {
          name: 'Support',
          description: 'Resources to get your help',
          url: '/help/support/',
          icon: 'lifebuoy'
        },
        {
          name: 'Frequently Asked Question',
          description: 'Quick question answers for commonly asked questions',
          url: '/apps/faqs/',
          icon: 'help-circle-outline'

        }
      ]
    },
    ...mapState([
      'user',
      'authenticated'
    ])
  },
  watch: {
  },
  async asyncData({$echomtg, $cookies}) {

  },

  mounted() {

  },
  methods: {


  },
  head () {
      return {
          title: `EchoMTG Help`,
          description: `Search user tradelists for magic the gathering and flesh and blood games.`
      }
    }
}
</script>
