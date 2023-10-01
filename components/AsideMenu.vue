<template>
  <aside
    v-show="isAsideVisible"
    class="aside is-placed-left"
    :class="{
      'is-expanded': isAsideExpanded,
      'is-secondary': isSecondary
    }"
  >
    <aside-tools :has-close="isSecondary" :icon="icon" @close="close">
      <nuxt-link to="/">
        <span v-if="!isSecondary">
            <img class="expanded-logo" src="https://assets.echomtg.com/interface/echomtg-logo-white-color.svg" alt="EchoMTG Logo">
            <img class="closed-logo" src="https://assets.echomtg.com/interface/echo-mage-logo-icon.png" alt="EchoMTG Mobile Logo">

        </span>
        <span v-else-if="label">{{ label }}</span>
      </nuxt-link>
    </aside-tools>
    <div ref="menuContainer" class="menu-container" @mouseenter="psUpdate">
      <div v-if="!authenticated" class="px-3 pt-2 is-hidden-tablet">
       <router-link to="/login/"
          class="  is-fullwidth button is-secondary"
          title="Login"
        >
          <b-icon icon="login" custom-size="default" />
          <span>Login</span>
        </router-link>
      </div>
      <div class="menu is-menu-main">
        <template v-for="(menuGroup, index) in menu">
          <p
            v-if="typeof menuGroup === 'string'"
            :key="index"
            class="menu-label"

          >
            {{ menuGroup }}
          </p>
          <aside-menu-list
            v-else
            :key="index"
            :menu="menuGroup"
            @menu-click="menuClick"

          />
        </template>
      </div>
    </div>
    <div class="menu is-menu-bottom">
      <aside-menu-list :menu="menuBottom" @menu-click="menuClick" />
    </div>
  </aside>
</template>
<style lang="scss">
.menu-list a {
  padding: .2em 0 !important;
}
.aside.aside .menu-label{
  margin-top: .5em !important;
  margin-bottom: .3em !important;
  padding-left: .5rem;
}
.menu {
  font-size: .85rem !important;
}
.has-aside-expanded .menu-list .icon {
    width: 1.8rem !important;
}
</style>
<script>
import { mapState } from 'vuex'
import PerfectScrollbar from 'perfect-scrollbar'
import AsideTools from '@/components/AsideTools'
import AsideMenuList from '@/components/AsideMenuList'

export default {
  name: 'AsideMenu',
  components: { AsideTools, AsideMenuList },
  props: {
    menu: {
      type: Array,
      default: () => []
    },
    menuBottom: {
      type: Array,
      default: () => []
    },
    isSecondary: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    }
  },
  computed: mapState([
    'isAsideVisible',
    'isAsideExpanded',
    'isAsideMobileExpanded',
    'authenticated'
  ]),
  mounted () {
    this.ps = new PerfectScrollbar(this.$refs.menuContainer)
  },
  methods: {
    menuClick (item) {


      this.$emit('menu-click', item)
    },
    psUpdate () {
      if (this.ps) {
        this.ps.update()
      }
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
