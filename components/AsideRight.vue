<template>
  <aside v-show="isAsideRightVisible || !isLayoutAsideHidden" class="aside is-placed-right">
    <div ref="container" class="aside-container" @mouseenter="psUpdate">
      <aside-updates @data-updated="psInit" />
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex'
import PerfectScrollbar from 'perfect-scrollbar'
import AsideUpdates from '@/components/AsideUpdates'

export default {
  name: 'AsideRight',
  components: { AsideUpdates },
  computed: mapState([
    'isAsideRightVisible',
    'isLayoutAsideHidden'
  ]),
  methods: {
    psInit () {
      this.ps = new PerfectScrollbar(this.$refs.container)
    },
    psUpdate () {
      if (this.ps) {
        this.ps.update()
      }
    }
  }
}
</script>
