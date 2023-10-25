<template>
  <div>
    <aside-updates-item
      v-for="item in items"
      :key="item.id"
      :status="item.status"
      :icon="item.icon"
      :ago="item.ago"
    >
      <p>{{ item.text }}</p>
    </aside-updates-item>
  </div>
</template>

<script>
import AsideUpdatesItem from '@/components/AsideUpdatesItem'

export default {
  name: 'AsideUpdates',
  components: { AsideUpdatesItem },
  data () {
    return {
      items: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      return []

    }
  }
}
</script>
