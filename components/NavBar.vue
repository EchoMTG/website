<template>
  <nav v-show="isNavBarVisible" id="navbar-main" class="navbar" :class="navBarClass">
    <div class="navbar-brand no-negative-margin-left">
      <a :title="toggleTooltip" class="navbar-item is-desktop-icon-only" @click.prevent="menuToggle">
        <b-icon :icon="menuToggleIcon" />
      </a>
    </div>
    <div class="is-flex is-align-items-center is-flex-grow-2" style="width: 100%;">
      <global-search
        showimage
        showinventorybuttons
        :callbackname="'Open Page'" />
    </div>
    <div v-if="isLayoutMobile" class="navbar-brand is-right">
      <a class="navbar-item navbar-item-menu-toggle" @click.prevent="menuNavBarToggle">
        <b-icon :icon="menuNavBarToggleIcon" custom-size="default" />
      </a>
    </div>
    <div class="navbar-menu fadeIn animated faster" :class="{'is-active':isMenuNavBarActive, 'no-negative-margin-right':isLayoutBoxed}">
      <div class="navbar-end">

        <div v-if="!authenticated" class="px-3 pt-2 navbar-item is-hidden-tablet">
          <router-link to="/login/"
              class="  is-fullwidth button is-secondary"
              title="Login"
            >
            <b-icon icon="login" custom-size="default" />
            <span>Login</span>
          </router-link>
        </div>
        <div v-if="!authenticated" class="px-3 pt-2 navbar-item is-hidden-tablet">
           <create-account-modal size="default" label="Free Account" />
        </div>

        <nav-bar-menu class="navbar-item pr-0 mr-0">

          <div class="is-user-name">
            <span>Recent Sets</span>
          </div>

          <div slot="dropdown" class="navbar-dropdown is-left">
            <echo-link
              v-for="si in recentSets"
              v-bind:key="si.set_code"
              :url="si.url"
              class="navbar-item"
              :title="`${si.name} Pricing List Page`"
              exact-active-class="is-active"
            >
              <i :class="getSetIconClass(si.set_code)"></i>
              <span>{{si.name}}</span>
            </echo-link>
             <echo-link
              url="/mtg/sets/"
              class="navbar-item"
              title="Magic the gathering Sets and Expansions"
              exact-active-class="is-active"
            >
              <i :class="getSetIconClass('magic')"></i>
              <span>Explore all Sets &amp; Expansions</span>
            </echo-link>
             <echo-link
              url="/mtg/spoilers/"
              title="Magic the gathering Spoilers"
              class="navbar-item"
              exact-active-class="is-active"
            >
              <b-icon icon="table-headers-eye" class="mr-2" size="default" />
              <span>Preview Upcoming Spoilers</span>
            </echo-link>
          </div>
        </nav-bar-menu>
          <echo-link
            v-if="!authenticated"
              url="/blog/"
              class="navbar-item pl-0 ml-0 "
              exact-active-class="is-active"
              title="Trading Card Blog"
            >
            <span>Articles</span>
          </echo-link>

        <div class="navbar-item p-0 m-0">
        <a
            href="https://legacy.echomtg.com"
            rel="nofollow"
            class="button is-small has-background-black is-rounded has-text-white is-contained"
            aria-label="Old Website"
            v-if="authenticated"
          >
          <b-icon icon="share" size="is-small"/>Legacy
        </a>
        </div>

        <echo-link
            url="/help/report-bug/"
            class="navbar-item has-divider mr-0 pr-1"
            exact-active-class="is-active"
            aria-label="Submit a bug report"
            title="Submit Bug Report"
          >
          <b-icon icon="bug-outline"></b-icon>
        </echo-link>
        <echo-link
            url="/help/"
            class="navbar-item has-divider mr-0 pr-1"
            exact-active-class="is-active"
            aria-label="Open the help desk"
            title="Support and Help"
          >
          <b-icon icon="help-circle-outline"></b-icon>
        </echo-link>

        <nav-bar-menu v-if="authenticated" class="navbar-item">

          <div class="is-user-name">
            <span>My Apps</span>
          </div>

          <div slot="dropdown" class="navbar-dropdown is-right">
            <echo-link
              v-for="tool in tools"
              v-bind:key="tool.icon"
              :url="tool.to"
              :title="tool.label"
              classes="navbar-item"
              exact-active-class="is-active"
            >
              <b-icon :icon="tool.icon" custom-size="default" />
              <span>{{tool.label}}</span>
            </echo-link>
          </div>
        </nav-bar-menu>


         <div v-if="authenticated" class="navbar-item mr-0 pr-0">
          <a href="/apps/inventory/" class="has-text-success has-text-weight-bold">{{user.currency_symbol}}{{ quickstats.current_value.toLocaleString("en-US", {maximumFractionDigits: 2, minimumFractionDigits: 2}) }}</a>
        </div>
        <div v-if="authenticated" class="navbar-item is-flex is-align-items-center">
          <b-taglist attached>
            <b-tag @click="openPlan" style="cursor: pointer" :type="overCardCap ? '' : 'is-dark'" :class="overCardCap ? 'has-background-danger has-text-white' : ''">
                {{quickstats.total_items}}/{{ user?.planObject?.card_cap ? user.planObject.card_cap : '?' }}
            </b-tag>
            <b-tag @click="openPlan" type="is-info" :style="`cursor: pointer;`" :class="`${user.plan}-background`">{{ user.plan }}</b-tag>
          </b-taglist>
        </div>
        <nav-bar-menu v-if="authenticated" class="has-divider has-user-avatar">
          <user-avatar />
          <div class="is-user-name">
            <span>{{ user.username }}</span>
          </div>

          <div slot="dropdown" class="navbar-dropdown is-right">
            <nuxt-link
              :to="`/${user.username.toLowerCase()}/`"
              class="navbar-item"
              exact-active-class="is-active"
            >
              <b-icon icon="card-account-details-outline" custom-size="default" />
              <span>Public Profile</span>
            </nuxt-link>
            <nuxt-link
              to="/user/profile/"
              class="navbar-item"
              exact-active-class="is-active"
            >
              <b-icon icon="account" custom-size="default" />
              <span>Edit Profile</span>
            </nuxt-link>
            <nuxt-link
              to="/user/settings/"
              class="navbar-item"
              exact-active-class="is-active"
            >
              <b-icon icon="cogs" custom-size="default" />
              <span>Edit Settings</span>
            </nuxt-link>
            <nuxt-link
              to="/user/email/"
              class="navbar-item"
              exact-active-class="is-active"
            >
              <b-icon icon="email" custom-size="default" />
              <span>Email Settings</span>
            </nuxt-link>
            <nuxt-link
              to="/user/streamer/"
              class="navbar-item"
              exact-active-class="is-active"
            >
              <b-icon icon="twitch" custom-size="default" />
              <span>Streamer</span>
            </nuxt-link>
            <nuxt-link
              to="/user/billing/"
              class="navbar-item"
              exact-active-class="is-active"
            >
              <b-icon icon="credit-card" custom-size="default" />
              <span>Billing</span>
            </nuxt-link>
            <nuxt-link
              to="/user/password/"
              class="navbar-item"
              exact-active-class="is-active"
            >
              <b-icon icon="lock" custom-size="default" />
              <span>Change Password</span>
            </nuxt-link>


            <hr class="navbar-divider">
            <a class="navbar-item" @click="() => toggleDark()">
              <b-icon icon="brightness-4"  custom-size="default" />
              <span>Toggle Darkmode</span>
            </a>
            <hr class="navbar-divider">

            <a class="navbar-item" @click="logout">
              <b-icon icon="logout" custom-size="default" />
              <span>Log Out</span>
            </a>
          </div>

        </nav-bar-menu>
        <div class="navbar-item" v-if="!authenticated">
           <div class="field is-grouped">

            <div class="control">
               <create-account-modal size="default" label="Free Account" />
            </div>
            <div class="control">
              <router-link to="/login"
                class=" button is-outlined is-primary"
                title="Login"
              >
                <b-icon icon="login" custom-size="default" />
                <span>Login</span>
              </router-link>
            </div>

          </div>
        </div>





      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import NavBarMenu from '@/components/NavBarMenu'
import UserAvatar from '@/components/UserAvatar'
import GlobalSearch from '@/components/GlobalSearch'
import toolsMenu from '@/components/navigation/tools'
import CreateAccountModal from '@/components/user/CreateAccountModal'
import EchoLink from '@/components/EchoLink.vue'

export default {
  name: 'NavBar',
  components: {
    UserAvatar,
    NavBarMenu,
    GlobalSearch,
    CreateAccountModal,
    EchoLink
  },
  data () {
    return {
      isMenuNavBarActive: false,

    }
  },
  computed: {
    tools(){
      return toolsMenu({
        tradesurl : this.authenticated ? `/${this.user.username}/trades/` : `/traders/`
      })
    },
    overCardCap(){
      if(!this?.quickstats?.total_items) return false;
      return this.user.planObject.card_cap <= parseInt(this.quickstats.total_items)
    },
    recentSets(){
      return [...this.sets.slice(0,5)];
    },
    menuNavBarToggleIcon () {
      return this.isMenuNavBarActive ? 'close' : 'menu'
    },

    // this is the navboor icon to toggle asisde left nd eight
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
      'user',
      'hasUpdates',
      'authenticated',
      'quickstats',
      'sets'
    ])
  },

  mounted () {
    this.$router.afterEach(() => {
      this.isMenuNavBarActive = false
    })
    this.dark_mode = parseInt(this.user.dark_mode)
  },
  methods: {
     getSetIconClass(set_code){
      return this.$echomtg.setIconClass(set_code) + ' is-size-4 mr-2'
    },
    openPlan(){
      this.$router.push({path: '/plans/'});
    },
    updateValue: async function (name, value){
      let body = {};
      body[name] = value;
       // need to update user in store
      const res = await this.$echomtg.updateUser(body)

      this.$buefy.toast.open({
        message: res.message,
        type: 'is-success'
      })

      // get latest user info
      const userdata = await this.$echomtg.getUserMeta();

      // update store
      if(userdata.status == 'success'){
        this.$store.commit('user', userdata.user);
      }

    },
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
    toggleDark () {
      const mode = parseInt(this.user.dark_mode) == 1 ? 0 : 1;
      this.updateValue('dark_mode',mode);
    },
    logout () {
      this.$buefy.snackbar.open({
        message: 'Logging out',
        queue: false
      })

      // destroy the cookie
      this.$cookies.remove('token', {
        path: '/',
        domain: '.echomtg.com'
      })
      // empty the store
      this.$store.replaceState({});
      this.$store.commit('authenticated',false)

      // reload to homepage
      window.location = '/';
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
