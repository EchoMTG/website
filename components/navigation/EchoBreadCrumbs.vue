<template>

  <nav class="breadcrumbBox level pt-2 pb-1 pl-3 mb-0">
    <!-- Left side -->
    <div class="level-left">
      <b-breadcrumb size="level-item is-small mb-0">
          <b-breadcrumb-item title="EchoMTG Homepage" tag='router-link' to="/"><b-icon  size="is-small" class="mr-0 pr-0" icon="home"/></b-breadcrumb-item>
          <b-breadcrumb-item
            v-for="(item, index) in data"
            tag='router-link'
            :key="item.label.toLowerCase().replace(' ','')"
            :to="item.url"
            class="is-capitalized"
            :active="(index + 1) == data.length"
            ><b-icon v-if="item.icon != ''" class="ml-0" :icon="item.icon" size="is-small" />{{item.label}}</b-breadcrumb-item>
      </b-breadcrumb>
    </div>
    <div class="level-right mr-4 is-hidden-mobile">
      <small class="level-item is-small has-text-right has-text-grey">

        Magic: the Gathering™ references are property of Wizards of the Coast. Prices update daily from TCGplayer.com.

      </small>
    </div>
  </nav>
</template>
<style lang="scss" scoped>
.breadcrumbs {
  line-height: 100%;
}
.breadcrumb a {
  font-size: .85rem;

}
</style>

<script>
import AffiliateOverlayDisclaimer from '@/components/legal/AffiliateOverlayDisclaimer.vue'
export default {
  components: { AffiliateOverlayDisclaimer },

  name: 'EchoBreadCrumbs',
  props: {
      data: {
          type: Array,
          default: () => [],
          required: true
      },
  },
  mounted() {
    // console.log(this.data)
  }

}
</script>
