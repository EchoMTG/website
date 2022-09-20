<template>
  <div class="setSummary">
    <div class="imageBox">
      <img
        :src="topcardImage"
        class="setTopImage"
        :alt="setName"
      />
    </div>
    <div class="columns">
      <div class="column is-three-fifths">
        <i :class="iconString"></i>
        <h1>
          <em class="has-text-white has-shadow has-text-weight-light is-size-6">Magic the Gathering MTG</em>
          <br />
          <a class="is-size-3" :href="setURL">{{setName}} - {{setCode}}</a>
        </h1>
        <h2 class="has-text-weight-normal has-text-light-grey is-size-7">
          MTG {{setName}} was released on {{setReleaseDate}} with {{setTotalItems}} items.
        </h2>
      </div>
      <div class="column">
        <!-- CTA -->
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SetSummary',
  props: {
    topcardImage: {
        type: String,
        default: 'https://assets.echomtg.com/magic/cards/cropped/601.hq.jpg'
    },
    setName: {
      type: String,
      default: ''
    },
    setCode: {
      type: String,
      default: ''
    },
    setReleaseDate: {
      type: String,
      default: ''
    },
    setURL: {
      type: String,
      default: 'https://www.echomtg.com/sets/'
    },
    setTotalItems: {
      type: Number,
      default: 0
    }
  },
  computed: {
    iconString(){return `largeSetIcon ss ss-${this.setCode.toLowerCase()} ss-echo is-size-3`},
  }
}
</script>

