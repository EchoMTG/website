<template>
  <card-component
    class="is-card-widget"
    :icon="trendingIcon"
    :has-button-slot="false"
    :has-title-slot="true"
  >
    <span slot="title">
      <b>{{ previousValue ? previousValue : '' }}</b> <b>{{ previousPeriod }}</b>
    </span>

    <div class="level is-mobile">
      <div class="level-item">
        <div class="is-widget-label">
          <h3 class="subtitle is-spaced">
            {{ label }}
          </h3>
          <h1 class="title">
            <growing-number :value="parseInt(number)" :prefix="prefix" :suffix="suffix" />
          </h1>
        </div>
      </div>
      <div v-if="icon" class="level-item has-widget-icon">
        <div class="is-widget-icon">
          <b-icon :icon="icon" size="is-large" :type="type" />
        </div>
      </div>
    </div>
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import GrowingNumber from '@/components/GrowingNumber'
export default {
  name: 'CardWidget',
  components: { GrowingNumber, CardComponent },
  props: {
    icon: {
      type: String,
      default: 'plus'
    },
    number: {
      type: Number,
      default: null
    },
    prefix: {
      type: String,
      default: null
    },
    suffix: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    previousNumber: {
      type: Number,
      default: 0
    },
    previousPeriod: {
      type: String,
      default: null
    }
  },
  computed: {
    trendingIcon () {
      return this.previousNumber < this.number
        ? 'arrow-up-bold'
        : 'arrow-down-bold'
    },
    previousValue () {

      return this.previousNumber
    }
  },
}
</script>
