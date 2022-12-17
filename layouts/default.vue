<template>
  <div id="app" :class="{'container has-boxed-layout':isLayoutBoxed}">
    <nav-bar />
    <aside-menu
      :menu="menu"
      :menu-bottom="menuBottom"
      :class="{ 'has-secondary': !!menuSecondary }"
      @menu-click="menuClick"
    />
    <aside-menu
      v-if="menuSecondary"
      :menu="menuSecondary"
      :is-secondary="false"
      :label="menuSecondaryLabel"
      :icon="menuSecondaryIcon"
      @menu-click="menuClick"
      @close="menuSecondaryClose"
    />
    <nuxt />
    <!-- <aside-right /> -->
    <!-- <config-box /> -->
    <!-- <footer-bar /> -->
    <overlay @overlay-click="overlayClick" />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import NavBar from '@/components/NavBar'
import AsideMenu from '@/components/AsideMenu'
import FooterBar from '@/components/FooterBar'
import Overlay from '@/components/Overlay'
import AsideRight from '@/components/AsideRight'
import ToolsArray from '@/components/navigation/tools'
// import ConfigBox from '@/components/ConfigBox'

export default {
  name: 'App',
  components: {
    // ConfigBox,
    AsideRight,
    Overlay,
    FooterBar,
    AsideMenu,
    NavBar
  },
  data () {
    return {
      menuSecondary: null,
      menuSecondaryLabel: null,
      menuSecondaryIcon: null,
      token: null,
      user: null
    }
  },
  computed: {
    menu () {

      if (this.authenticated){
        return [
          'Tools',
          ToolsArray,
          'Magic: the Gathering',
          [
            {
              to: '/sets',
              label: 'Expansions',
              icon: 'cards'
            },
            {
              to: '/mtg/spoilers',
              label: 'Spoilers',
              icon: 'cake'
            },
            {
              to: '/magic/reserve-list/',
              label: 'Reserve List',
              icon: 'chess-king'
            },
          ],
          'My Account',
          [
           {
              to: '/my-account/profile',
              label: 'Profile',
              icon: 'account-circle'
            }
          ],
          'EchoMTG',
          [
            {
              to: '/api',
              label: 'API Docs',
              icon: 'code-json'
            },
            {
              to: '/about',
              label: 'About',
              icon: 'help-circle'
            },
            {
              to: '/about/discord',
              label: 'Discord',
              icon: 'forum'
            }
          ]
        ]
      } else {
         return [


          'Magic: the Gathering',
          [
            {
              to: '/sets',
              label: 'Expansions',
              icon: 'cards'
            },
            {
              to: '/mtg/spoilers',
              label: 'Spoilers',
              icon: 'cake'
            },
          ],
           'EchoMTG',
          [
            {
              to: '/login',
              icon: 'lock',
              label: 'Login'
            },
            {
              to: '/',
              icon: 'plus',
              label: 'Create Account'
            },
            {
              to: '/api',
              label: 'API Docs',
              icon: 'code-json'
            },
            {
              to: '/about',
              label: 'About',
              icon: 'help-circle'
            },
            {
              to: '/about/discord',
              label: 'Discord',
              icon: 'forum'
            }
          ]
        ]
      }
    },
    menuBottom () {
      return [
        {
          action: 'logout',
          icon: 'logout',
          label: 'Log out',
          state: 'info'
        }
      ]
    },
    ...mapState([
      'isOverlayVisible',
      'isLayoutBoxed',
      'isAsideVisible',
      'isAsideExpanded',
      'isNavBarVisible',
      'isLayoutAsideHidden',
      'isLayoutMobile',
      'authenticated'
    ])
  },
  watch: {
    isLayoutMobile (newVal) {
      if (newVal) {
        this.$store.commit('layoutBoxedToggle', false)
      }
    }
  },


  async mounted () {
    // STORE PERSISTANCE
    // if reloading, load store into state to persist
    let persistedUser = window.localStorage.getItem('user');
    if(persistedUser){
      this.$store.commit('user', JSON.parse(persistedUser));
      this.$store.commit('authenticated', 'true');
    }
    // STORE PERSISTANCE
    // if there is a token available, attempt to authenticated the user and populate the store
    if(this.$store.authenticated !== 'true' && this.$cookies.get('token')){
      await this.authenticatedUser()
    }

    /* Dark mode by default. Works only with '~/assets/scss/style-light-dark.scss' */
    // this.$store.commit('darkModeToggle', true)

    /* Detect mobile layout */
    this.$store.dispatch('layoutMobileToggle')

    window.onresize = () => {
      this.$store.dispatch('layoutMobileToggle')
    }
  },
  methods: {
    async authenticatedUser(){
      // fetch the meta
      const userdata = await this.$echomtg.getUserMeta();

      // store the user data
      if(userdata.status == 'success'){

        this.$store.commit('user', userdata.user);
        this.$store.commit('authenticated',true);
      } else {
        this.$store.commit('authenticated',false);
      }


    },
    // if not logged in, the menu should render different
    // if not logged in, caching should run on all the informational pages
    // logged in state is checked by the cookie
    // the cookie needs to be verified via a request, if the cookie is expired it should be deleted
    menuClick (item) {

        this.$store.commit('asideActiveForcedKeyToggle', item)
        this.$store.commit('overlayToggle', true)

      if (item.menuSecondary) {
        this.menuSecondary = item.menuSecondary
        this.menuSecondaryLabel = item.menuSecondaryLabel
          ? item.menuSecondaryLabel
          : null
        this.menuSecondaryIcon = item.menuSecondaryIcon
          ? item.menuSecondaryIcon
          : null


      } else if (item.action && item.action === 'logout') {
        this.$buefy.toast.open({
          message: 'Log out clicked',
          type: 'is-danger',
          queue: false
        })
      }
    },
    menuSecondaryClose () {
      this.menuSecondary = this.menuSecondaryLabel = this.menuSecondaryIcon = null
      this.$store.commit('asideActiveForcedKeyToggle', null)

      if (!this.isLayoutAsideHidden) {
        this.$store.commit('overlayToggle', false)
      }
    },
    overlayClick () {

      if (this.menuSecondary) {
        this.menuSecondaryClose()
      } else {
        this.$store.dispatch('asideCloseAll')
      }
    }
  }
}
</script>
