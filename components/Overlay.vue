<template>
  <div v-if="isOverlayVisible" class="ui-overlay" :class="{'off-navbar':isLayoutAsideHidden}" @click="click" />
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Overlay',
  computed: mapState([
    'isOverlayVisible',
    'isLayoutAsideHidden'
  ]),
  methods: {
    click () {
      this.$emit('overlay-click')
    }
  }
}
</script>
