<template>
  <button
    type="button"
    class="button is-small"
    :class="{ 'is-loading': isLoading }"
    @click.prevent="click"
  >
    <b-icon :icon="icon" custom-size="default" />
    <span>{{ label }}</span>
  </button>
</template>

<script>
export default {
  name: 'RefreshButton',
  props: {
    icon: {
      type: String,
      default: 'refresh'
    },
    label: {
      type: String,
      default: 'Refresh'
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    click (e) {
      this.$emit('button-click', e)
    }
  }
}
</script>
