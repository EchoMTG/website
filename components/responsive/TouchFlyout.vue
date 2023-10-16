<template>
<div class="touch-flyout-ux">
  <b-button size="is-small" class="is-hidden-fullhd" icon-right="dots-vertical" :label="buttonText" @click="open = !open" />
  <div :class="`touch-flyout ${classes} ${flyoutClass}`">
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
    },
    buttonText: {
      type: String,
      default: ''
    },
    classes: {
      type: String,
      default: ''
    },
  },
  data: () => {
    return {
      open: false
    }
  },
  computed: {
    flyoutClass() {
      const compact = this.compact ? ' compact' : ''
      return this.open ? 'touch-flyout-open '+compact : ''
    }
  }
}
</script>
