<template>
  <li :class="{ 'is-active': isDropdownActive }">
    <component
      :is="componentIs"
      :to="itemTo"
      :href="itemHref"
      :title="componentTitle"
      :exact-active-class="componentActiveClass"
      :class="componentClass"
      @click="menuClick"
    >
      <b-tooltip :active="!isAsideExpanded" :label="item.label" position="is-bottom">
        <b-icon
          v-if="item.icon"
          :icon="item.icon"
          :class="{ 'has-update-mark': item.updateMark }"
          custom-size="default"
        />
        <span v-if="item.label" :class="{ 'menu-item-label': !!item.icon }">{{
          item.label
        }}</span>
        <div v-if="hasSubmenuIcon" class="submenu-icon">
          <b-icon :icon="submenuIcon" custom-size="default" />
        </div>
      </b-tooltip>
    </component>
<!--
      removed sub dropdown lists
      <aside-menu-list
      v-if="hasDropdown"
      :menu="item.menu"
      :is-submenu-list="true"
    /> -->
  </li>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AsideMenuItem',
  components: {
    AsideMenuList: () => import('@/components/AsideMenuList')
  },
  props: {
    item: {
      type: Object,
      default: null
    },
    isSecondary: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isDropdownActive: false
    }
  },
  computed: {
    componentIs () {
      return this.item?.to && this.authenticated ? 'nuxt-link' : 'a'
    },
    hasSubmenuIcon () {
      return this.hasDropdown || this.item.menuSecondary
    },
    hasDropdown () {
      return !!this.item.menu
    },
    submenuIcon () {
      if (this.item.menuSecondary) {
        return 'chevron-right'
      }
      return this.isDropdownActive ? 'minus' : 'plus'
    },
    itemTo () {
      return this.item.to ? this.item.to : null
    },
    itemHref () {
      if(this.authenticated && this.item.to) return null;
      let url = this.item.href ? this.item.href : null;
      if(!this.authenticated && !url){
        url = this.item.to
      }
      return url
    },
    componentTitle () {
      return !this.isAsideExpanded && this.item.label ? this.item.label : null
    },
    componentClass () {
      const c = {
        'has-icon': !!this.item.icon,
        'has-submenu-icon': this.hasSubmenuIcon
      }

      if (this.item.state) {
        c['is-state-' + this.item.state] = true
        c['is-hoverable'] = true
      }

      if (
        this.asideActiveForcedKey &&
        this.item.menuSecondaryKey &&
        this.asideActiveForcedKey === this.item.menuSecondaryKey
      ) {
        c['is-active'] = true
      }

      return c
    },
    componentActiveClass () {
      if (this.asideActiveForcedKey) {
        return null
      }
      return 'is-active'
    },
    ...mapState(['asideActiveForcedKey', 'isAsideExpanded','authenticated'])
  },
  watch: {
    isAsideExpanded (newValue) {
      if (!newValue) {
        this.isDropdownActive = false
      }
    }
  },
  methods: {
    menuClick () {

      this.$emit('menu-click', this.item)

      if (this.hasDropdown) {
        this.isDropdownActive = !this.isDropdownActive

        if (!this.isSecondary && !this.isAsideMobileExpanded) {
          this.$store.commit('asideStateToggle', true)
        }
      }
    }
  }
}
</script>
