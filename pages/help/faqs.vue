<template>
  <div>
    <nuxt keep-alive />
    <echo-bread-crumbs :data="crumbs" />

    <div class="columns ml-3 mt-3">
      <div class="column is-one-fifth">
        <help-sub-nav />
      </div>
      <div class="column is-four-fifths">
        FAQ
      </div>

    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import FullAd from '~/components/cta/FullAd.vue'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue'
import CreateAccountModal from '~/components/user/CreateAccountModal.vue'
import HelpSubNav from '~/components/help/HelpSubNav.vue'

export default {
  name: 'Faqs',
  components: {
    EchoBreadCrumbs,
    CreateAccountModal,
    FullAd,
    HelpSubNav
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
          icon: 'help-circle-outline'

        },
        {
          label: 'Frequently Asked Questions',
          url: '/help/faqs/',
          icon: 'chat-question'

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
          title: `EchoMTG Help and Support`,
          description: `General help information for the EchoMTG Application.`
      }
    }
}
</script>
