<template>
  <div id="app" :class="{'container has-boxed-layout':isLayoutBoxed}">
    <nav-bar />
    <aside-menu
      :menu="menu"
      :menu-bottom="menuBottom"
      :class="{ 'has-secondary': !!menuSecondary }"
      @menu-click="menuClick"
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
import toolsMenu from '@/components/navigation/tools'
import shellUser from '@/store/shellUser'

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
      token: null
    }
  },
  computed: {

    menu () {
      if(this.user && this.user.username != ''){
        this.$echomtg.log('user, auth', this.authenticated,this.user);
      }
      let navList = [
          'Magic: the Gathering',
          [
            {
              to: '/mtg/sets/',
              label: 'Sets',
              icon: 'cards'
            },
            {
              to: '/mtg/spoilers/',
              label: 'Spoilers',
              icon: 'cake'
            },
            {
              to: '/mtg/groups/magic-reserve-list/',
              label: 'Reserve List',
              icon: 'chess-king'
            },
          ],
      ];


      if (this.authenticated){
        let tools = toolsMenu({
          tradesurl : `/apps/trades/${this.$echomtg.tradesUserHash(this.user.id)}/`
        });
        navList.push('Tools');
        navList.push(tools);
        navList.push('My Account');
        navList.push([
           {
              to: '/user/profile/',
              label: 'Profile',
              icon: 'account-circle'
            },
            {
              to: '/user/settings/',
              label: 'Settings',
              icon: 'cogs'
            },
            {
              to: '/user/streamer/',
              label: 'Streamer Perks',
              icon: 'twitch'
            },
            {
              to: '/logout/',
              icon: 'lock',
              label: 'Logout'
            },
          ])

      }
      if (this.user && parseInt(this.user.user_level) > 2){
       navList.push('Wiki Tools');
        navList.push([
           {
              to: '/wiki/dashboard',
              label: 'Wiki Home',
              icon: 'wizard-hat'
            },
            {
              to: '/wiki/import-set',
              label: 'Import Set',
              icon: 'download'
            },
            {
              to: '/wiki/import-single',
              label: 'Fetch Single',
              icon: 'bone'
            },
            {
              to: '/wiki/manage-sets',
              label: 'Manage Sets',
              icon: 'movie-open-edit'
            },
          ])
      }

      navList.push('EchoMTG')
      navList.push( [{
          to: '/api/',
          label: 'API Docs',
          icon: 'code-json'
        },
        {
          to: '/about/',
          label: 'About',
          icon: 'help-circle'
        },
        {
          to: '/about/discord/',
          label: 'Discord',
          icon: 'forum'
        }]
        )

      if (!this.authenticated){
          navList.push('User');
          navList.push([
            {
              to: '/login/',
              icon: 'lock',
              label: 'Login'
            },
            {
              to: '/',
              icon: 'plus',
              label: 'Create Account'
            },
          ])
      }

      return navList;
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
      'isDarkModeActive',
      'isLayoutAsideHidden',
      'isLayoutMobile',
      'authenticated',
      'user'
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
    // always dynamically add these to the html class since we dyanmically remove and add classes with vuex state
    document.documentElement.classList['add']('has-aside-left');
    document.documentElement.classList['add']('has-navbar-fixed-top');
    document.documentElement.classList['add']('has-aside-mobile-transition');

    // STORE PERSISTANCE
    // if reloading, load store into state to persist
    // let persistedUser = window.localStorage.getItem('user');
    // if(persistedUser){
    //   await this.authenticatedUser()
    //   let userObject = JSON.parse(persistedUser);
    //   this.$store.commit('user', userObject);
    //   this.$store.commit('authenticated', true);
    //   if(parseInt(userObject.dark_mode) == 1){
    //     this.$store.commit('darkModeToggle', true)
    //   } else {
    //     this.$store.commit('darkModeToggle', false)
    //   }

    // }
    // STORE PERSISTANCE
    // if there is a token available, attempt to authenticated the user and populate the store
    if(this.$cookies.get('token')){
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
      if(userdata.status === 'success'){

        const quickstats = await this.$echomtg.inventoryQuickStats();

        this.$store.commit('user', userdata.user);
        this.$store.commit('quickstats', quickstats.stats);
        this.$store.commit('authenticated',true);
        if(parseInt(userdata.user.dark_mode) == 1){
          this.$store.commit('darkModeToggle', true)
        } else {
          this.$store.commit('darkModeToggle', false)
        }
      } else {
        this.$store.commit('authenticated',false);
        this.$store.commit('user', shellUser);
        window.localStorage.removeItem('user')
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
