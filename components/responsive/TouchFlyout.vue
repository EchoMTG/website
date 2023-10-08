<template>
<div class="touch-flyout-ux">
  <b-button size="is-small" class="is-hidden-desktop" icon-left="dots-vertical" @click="this.open = !this.open" />
  <div :class="`touch-flyout ${flyoutClass}`">
    <slot></slot>
  </div>
</div>
</template>
<script>

export default {
  name: 'TouchFlyout',
  data: () => {
    return {
      open: false
    }
  },
  computed: {
    flyoutClass() {
      return this.open ? 'flyout-open' : 'flyout-closed'
    }
  }
}
</script>
