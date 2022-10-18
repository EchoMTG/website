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
      :is-secondary="true"
      :label="menuSecondaryLabel"
      :icon="menuSecondaryIcon"
      @menu-click="menuClick"
      @close="menuSecondaryClose"
    />
    <nuxt />
    <aside-right />
    <!-- <config-box /> -->
    <footer-bar />
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

      if (this.amILoggedIn() && this.amIAuthed()){
        return [
          'Tools',
          [
            {
              to: '/tools/',
              icon: 'tools',
              label: 'Tools'
            },
            {
              to: '/',
              icon: 'chart-timeline-variant-shimmer',
              label: 'Dashboard'
            },
            {
              to: '/tools/inventory/',
              icon: 'ballot',
              label: 'Inventory'
            },
            {
              to: '/tools/inventory/sealed/',
              icon: 'wallet-giftcard',
              label: 'Sealed'
            },
            {
              to: '/tools/lists/',
              icon: 'format-list-checkbox',
              label: 'Lists'
            },
            {
              to: '/tools/watch-list/',
              icon: 'eye',
              label: 'Watch List'
            }

          ],
          'Magic: the Gathering',
          [
            {
              to: '/sets',
              label: 'Expansions',
              icon: 'cards',
              updateMark: true
            },
            {
              to: '/magic/reserve-list/',
              label: 'Reserve List',
              icon: 'chess-king'
            },

            {
              label: 'Dropdown',
              icon: 'arrow-down-bold-circle',
              menu: [
                {
                  href: '#void',
                  label: 'Sub-item One'
                },
                {
                  href: '#void',
                  label: 'Sub-item Two'
                }
              ]
            },
            {
              label: 'Submenus',
              icon: 'view-list',
              menuSecondaryKey: 'submenu-1',
              menuSecondaryIcon: 'view-list',
              menuSecondaryLabel: 'Example',
              menuSecondary: [
                'Something',
                [
                  {
                    icon: 'view-list',
                    href: '#void',
                    label: 'Sub-item One'
                  },
                  {
                    icon: 'view-list',
                    href: '#void',
                    label: 'Sub-item Two'
                  }
                ],
                'Dropdown',
                [
                  {
                    label: 'Submenus',
                    icon: 'view-list',
                    menu: [
                      {
                        href: '#void',
                        label: 'Sub-item One'
                      },
                      {
                        href: '#void',
                        label: 'Sub-item Two'
                      }
                    ]
                  }
                ]
              ]
            }
          ],
          'My Account',
          [
           {
              to: '/profile',
              label: 'Profile',
              icon: 'account-circle'
            },
            {
              to: '/full-page/error',
              label: 'Error v.1',
              icon: 'power-plug'
            },
          ],
          'About',
          [
            {
              href: 'https://justboil.me/bulma-admin-template/one',
              label: 'About',
              icon: 'help-circle'
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
              icon: 'cards',
              updateMark: true
            },
          ],
           'EchoMTG',
          [
            {
              to: '/login',
              icon: 'lock',
              label: 'Login'
            },
             [
            {
              to: '/',
              icon: 'plus',
              label: 'Create Account'
            }
          ],
          ],
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
      'isNavBarVisible',
      'isLayoutAsideHidden',
      'isLayoutMobile'
    ])
  },
  watch: {
    isLayoutMobile (newVal) {
      if (newVal) {
        this.$store.commit('layoutBoxedToggle', false)
      }
    }
  },
  created () {

  },
  async fetch() {

  },
  mounted () {
    /* Dark mode by default. Works only with '~/assets/scss/style-light-dark.scss' */
    // this.$store.commit('darkModeToggle', true)

    /* Detect mobile layout */
    this.$store.dispatch('layoutMobileToggle')

    window.onresize = () => {
      this.$store.dispatch('layoutMobileToggle')
    }
  },
  methods: {
    // if not logged in, the menu should render different
    // if not logged in, caching should run on all the informational pages
    // logged in state is checked by the cookie
    // the cookie needs to be verified via a request, if the cookie is expired it should be deleted
    amILoggedIn() {
      // uses this cookie package for SSR https://www.npmjs.com/package/cookie-universal-nuxt
      return undefined !== this.$cookies.get('token')

    },
    async amIAuthed() {
      this.token = this.$cookies.get('token')
      let response = await fetch('https://www.echomtg.com/api/user/meta/?auth='+this.token)
      let data = await response.json()

      if(data.status == 'success'){
        data.user.name = data.user.first_name + ' ' + data.user.last_name
        this.$store.commit('user', data.user)
        return data.user
      } else {
        return null
      }
    },
    menuClick (item) {

      if (item.menuSecondary) {
        this.menuSecondary = item.menuSecondary
        this.menuSecondaryLabel = item.menuSecondaryLabel
          ? item.menuSecondaryLabel
          : null
        this.menuSecondaryIcon = item.menuSecondaryIcon
          ? item.menuSecondaryIcon
          : null

        this.$store.commit('asideActiveForcedKeyToggle', item)
        this.$store.commit('overlayToggle', true)
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
