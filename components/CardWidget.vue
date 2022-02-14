<template>
  <card-component
    class="is-card-widget"
    :icon="trendingIcon"
    :has-button-slot="true"
    :has-title-slot="true"
  >
    <span slot="title">
      <b>{{ previousValue }}</b> in <b>{{ previousPeriod }}</b>
    </span>
    <button
      slot="button"
      type="button"
      class="button is-small"
      @click="buttonClick"
    >
      <b-icon icon="settings" custom-size="default" />
    </button>
    <div class="level is-mobile">
      <div class="level-item">
        <div class="is-widget-label">
          <h3 class="subtitle is-spaced">
            {{ label }}
          </h3>
          <h1 class="title">
            <growing-number :value="number" :prefix="prefix" :suffix="suffix" />
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
import numeral from 'numeral'
import CardComponent from '@/components/CardComponent'
import GrowingNumber from '@/components/GrowingNumber'
export default {
  name: 'CardWidget',
  components: { GrowingNumber, CardComponent },
  props: {
    icon: {
      type: String,
      default: null
    },
    number: {
      type: Number,
      default: 0
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
      let valueString =
        this.previousNumber < 1000
          ? this.previousNumber
          : numeral(this.previousNumber).format('0,0')

      if (this.prefix) {
        valueString = this.prefix + valueString
      }

      if (this.suffix) {
        valueString += this.suffix
      }

      return valueString
    }
  },
  methods: {
    buttonClick () {
      this.$buefy.snackbar.open({
        message: 'Got click',
        queue: false
      })
    }
  }
}
</script>
