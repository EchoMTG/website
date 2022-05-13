<template>
  <nav v-show="isNavBarVisible" id="navbar-main" class="navbar" :class="navBarClass">
    <div class="navbar-brand no-negative-margin-left">
      <a :title="toggleTooltip" class="navbar-item is-desktop-icon-only" @click.prevent="menuToggle">
        <b-icon :icon="menuToggleIcon" />
      </a>
    </div>
    <div class="is-flex is-align-items-center" style="width: 100%;">
      <global-search showimage />
    </div>
    <div v-if="isLayoutMobile" class="navbar-brand is-right">
      <a class="navbar-item navbar-item-menu-toggle" @click.prevent="updatesToggle">
        <b-icon icon="bell" custom-size="default" />
      </a>
      <a class="navbar-item navbar-item-menu-toggle" @click.prevent="menuNavBarToggle">
        <b-icon :icon="menuNavBarToggleIcon" custom-size="default" />
      </a>
    </div>
    <div class="navbar-menu fadeIn animated faster" :class="{'is-active':isMenuNavBarActive, 'no-negative-margin-right':isLayoutBoxed}">
      <div class="navbar-end">
        <nav-bar-menu v-if="isUserLoggedIn" class="has-divider has-user-avatar">
          <user-avatar />
          <div class="is-user-name">
            <span>{{ userName }}</span>
          </div>

          <div slot="dropdown" class="navbar-dropdown">
            <nuxt-link
              to="/profile"
              class="navbar-item"
              exact-active-class="is-active"
            >
              <b-icon icon="account" custom-size="default" />
              <span>Edit Profile</span>
            </nuxt-link>
            <a class="navbar-item">
              <b-icon icon="settings" custom-size="default" />
              <span>Edit Settings</span>
            </a>
            <a class="navbar-item">
              <b-icon icon="lock" @click="password" custom-size="default" />
              <span>Change Password</span>
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item" @click="logout">
              <b-icon icon="logout" custom-size="default" />
              <span>Log Out</span>
            </a>
          </div>
        </nav-bar-menu>
        <!-- <nav-bar-menu class="has-divider">
          <b-icon icon="menu" custom-size="default" />
          <span>Sample Menu</span>
          <div slot="dropdown" class="navbar-dropdown">
            <nuxt-link
              to="/profile"
              class="navbar-item"
              exact-active-class="is-active"
            >
              <b-icon icon="account" custom-size="default" />
              <span>My Profile</span>
            </nuxt-link>
            <a class="navbar-item">
              <b-icon icon="settings" custom-size="default" />
              <span>Settings</span>
            </a>
            <a class="navbar-item">
              <b-icon icon="email" custom-size="default" />
              <span>Messages</span>
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item" @click="logout">
              <b-icon icon="logout" custom-size="default" />
              <span>Log Out</span>
            </a>
          </div>
        </nav-bar-menu> -->
        <div class="navbar-item" v-if="!isUserLoggedIn">
           <div class="field is-grouped">
          <p class="control">
          <router-link to="/login"
            class=" button is-secondary"
            title="Login"
          >
            <b-icon icon="login" custom-size="default" />
            <span>Login</span>
          </router-link>
          </p>
          <p class="control">
          <router-link to="/full-page/create"
            class=" button is-primary"
            title="Create Account"
          >
            <b-icon icon="account" custom-size="default" />
            <span>Make Account</span>
          </router-link>
          </p>
          </div>
        </div>
        <!-- <a
          href="https://justboil.me/bulma-admin-template/one"
          class="navbar-item has-divider is-desktop-icon-only"
          title="About"
        >
          <b-icon icon="help-circle-outline" custom-size="default" />
          <span>About</span>
        </a> -->
        <a
          class="navbar-item has-divider is-desktop-icon-only"
          :class="{ 'is-active': isAsideRightActive }"
          title="Updates"
          @click.prevent="updatesToggle"
        >
          <b-icon
            icon="bell"
            custom-size="default"
            :class="{ 'has-update-mark': hasUpdates }"
          />
          <span>Updates</span>
        </a>
        <a
          class="navbar-item is-desktop-icon-only"
          title="Log out"
          @click="logout"
        >
          <b-icon icon="logout" custom-size="default" />
          <span>Log out</span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import NavBarMenu from '@/components/NavBarMenu'
import UserAvatar from '@/components/UserAvatar'
import GlobalSearch from '@/components/GlobalSearch'

export default {
  name: 'NavBar',
  components: {
    UserAvatar,
    NavBarMenu,
    GlobalSearch
  },
  data () {
    return {
      isMenuNavBarActive: false
    }
  },
  computed: {
    isUserLoggedIn () {
      console.log('user',this.userName)

      return this.userName !== null
    },
    menuNavBarToggleIcon () {
      return this.isMenuNavBarActive ? 'close' : 'dots-vertical'
    },
    menuToggleIcon () {
      if (this.isLayoutAsideHidden) {
        return this.isAsideVisible ? 'close' : 'menu'
      }

      const isExpanded = this.isLayoutMobile ? this.isAsideMobileExpanded : this.isAsideExpanded

      return isExpanded ? 'backburger' : 'forwardburger'
    },
    toggleTooltip () {
      return this.isAsideExpanded ? 'Collapse' : 'Expand'
    },
    navBarClass () {
      let classAddon = ''

      if (!this.isLayoutBoxed) {
        classAddon += 'is-fixed-top '
      }

      if (this.navBarColor) {
        classAddon += this.navBarColor + ' '
      }

      return classAddon
    },
    ...mapState([
      'isLayoutMobile',
      'isLayoutAsideHidden',
      'isLayoutBoxed',
      'isNavBarVisible',
      'navBarColor',
      'isAsideVisible',
      'isAsideExpanded',
      'isAsideMobileExpanded',
      'isAsideRightVisible',
      'isAsideRightActive',
      'userName',
      'hasUpdates'
    ])
  },
  mounted () {
    this.$router.afterEach(() => {
      this.isMenuNavBarActive = false
    })
  },
  methods: {
    menuToggle () {
      if (this.isLayoutMobile) {
        this.$store.commit('asideMobileStateToggle')
      } else if (this.isLayoutAsideHidden) {
        this.$store.dispatch('asideVisibilityToggle')
      } else {
        this.$store.commit('asideStateToggle')
      }
    },
    menuNavBarToggle () {
      this.isMenuNavBarActive = (!this.isMenuNavBarActive)
    },
    updatesToggle () {
      this.$store.dispatch('asideRightToggle')
    },
    logout () {
      this.$buefy.snackbar.open({
        message: 'Logging out',
        queue: false
      })
      // destroy the cookie
      eraseCookie('token')
      // empty the store
      this.$store.replaceState({});
      window.location = '/'
    },
    password () {
      this.$buefy.snackbar.open({
        message: 'edit password',
        queue: false
      })
      // route to password editing
    }
  }
}
</script>
