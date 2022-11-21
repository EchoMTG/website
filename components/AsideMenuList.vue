<template>
  <ul :class="{ 'menu-list': !isSubmenuList }">
    <aside-menu-item
      v-for="(item, index) in menu"
      :key="index"
      :is-secondary="isSecondary"
      :item="item"
      @menu-click="menuClick"
    />
  </ul>
</template>

<script>
import AsideMenuItem from '@/components/AsideMenuItem'
import { mapState } from 'vuex'

export default {
  name: 'AsideMenuList',
  components: {
    AsideMenuItem,
    ...mapState(['asideActiveForcedKey', 'isAsideExpanded'])
  },
  props: {
    isSubmenuList: {
      type: Boolean,
      default: false
    },
    isSecondary: {
      type: Boolean,
      default: false
    },
    menu: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    menuClick (item) {

      this.$emit('menu-click', item)

    }
  }
}
</script>
