<template>
  <div class="aside-tools" :class="{ 'has-icon': !!icon }">
    <div class="aside-tools-label">
      <b-icon v-if="icon" :icon="icon" custom-size="default" />
      <slot />
    </div>
    <a v-if="hasClose" class="aside-close" @click="close">
      <b-icon icon="close" custom-size="default" />
    </a>
  </div>
</template>

<script>
export default {
  name: 'AsideTools',
  props: {
    icon: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    hasClose: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
