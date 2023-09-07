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

      let navList = [
          'Magic: the Gathering',
          [
            {
              to: '/mtg/sets/',
              label: 'MTG Sets',
              icon: 'cards'
            },
            {
              to: '/mtg/types/',
              label: 'Types',
              icon: 'format-list-bulleted-type'
            },
            {
              to: '/mtg/spoilers/',
              label: 'Spoilers',
              icon: 'table-headers-eye'
            },
            {
              to: '/mtg/groups/magic-reserve-list/',
              label: 'Reserve List',
              icon: 'gold'
            },
          ],
      ];
      navList.push('Disney Lorcana')
      navList.push([
            {
              to: '/lorcana/sets/',
              label: 'Lorcana Sets',
              icon: 'cards'
            }
      ])

      let tools = toolsMenu({
        tradesurl : this.authenticated ? `/apps/trades/${this.$echomtg.tradesUserHash(this.user.id)}/` : `/apps/trades/`
      });
      navList.push('My Apps');
      navList.push([
            {
              to: '/lorcana/sets/',
              label: 'Lorcana Sets',
              icon: 'cards'
            }
      ])
      // showing tools in left
      // navList.push(tools);

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
      navList.push( [
        {
          to: '/blog/',
          label: 'Blog',
          icon: 'newspaper-variant-multiple'
        },
        {
          to: '/api/',
          label: 'API Docs',
          icon: 'code-json'
        },
        {
          to: '/about/',
          label: 'About',
          icon: 'pillar'
        },
        {
          to: '/help/',
          label: 'Support',
          icon: 'lifebuoy'
        }]
        )


      if (this.authenticated){

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
      if(this.authenticated){
        return [
          {
            action: 'logout',
            icon: 'logout',
            label: 'Log out',
            state: 'info'
          }
        ]
      } else {
        return []
      }
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
  beforeMount () {

      window.addEventListener("hashchange", this.offsetAnchor);
  },
  beforeDestroy () {
    window.removeEventListener('hashchange', this.offsetAnchor)
  },

  async mounted () {
    // always dynamically add these to the html class since we dyanmically remove and add classes with vuex state
    document.documentElement.classList['add']('has-aside-left');
    document.documentElement.classList['add']('has-navbar-fixed-top');
    document.documentElement.classList['add']('has-aside-mobile-transition');

    // STORE PERSISTANCE
    // if there is a token available, attempt to authenticated the user and populate the store
    try {
      if(this.$cookies.get('token')){
        await this.authenticatedUser()
      }
      // get sets
      await this.getSets()
    } catch (err) {
      console.log('offine')
    }


    /* Detect mobile layout */
    this.$store.dispatch('layoutMobileToggle')

    window.onresize = () => {
      this.$store.dispatch('layoutMobileToggle')
    }
  },
  methods: {
    offsetAnchor() {
        if(location.hash.length !== 0) {
            window.scrollTo(window.scrollX, window.scrollY); // add -100 to adjust all
        }
        console.log('offset ancher')
    },
    async getSets(){
      try{
        const setsData = await this.$echomtg.getSets();

        this.$store.commit('sets',setsData)
      } catch(err){
        console.log(err)
      }
    },
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
        this.$cookies.remove('token', {
          domain: '.echomtg.com',
          path: '/'
        })
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
