<template>
<div class="touch-flyout-ux">
  <b-button size="is-small" class="is-hidden-fullhd" icon-left="dots-vertical" @click="open = !open" />
  <div :class="`touch-flyout ${flyoutClass}`">
    <slot></slot>
  </div>
</div>
</template>
<script>

export default {
  name: 'TouchFlyout',
  props: {
    compact: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      open: false
    }
  },
  computed: {
    flyoutClass() {
      const compact = this.compact ? ' compact' : ''
      return this.open ? 'touch-flyout-open'+compact : ''
    }
  }
}
</script>
