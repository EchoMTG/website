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
      <div class="column is-three-quarters">
        <i :class="iconString"></i>
        <h1>
          <em class="has-text-white has-shadow has-text-weight-light is-size-6">Magic the Gathering MTG</em>
          <br />
          <a v-if="setCode !== ''" class="is-size-3" :href="setURL">{{setName}} - {{setCode}}</a>
          <a v-else class="is-size-3 is-capitalized" :href="setURL">All {{setName}} Cards</a>
        </h1>
        <h2 v-if="setReleaseDate !== ''" class="has-text-weight-normal has-text-light-grey is-size-7">
          MTG {{setName}} was released on {{setReleaseDate}} with {{setTotalItems}} items.
        </h2>
        <h2 v-if="setReleaseDate == ''" class="has-text-weight-normal has-text-light-grey is-size-7">
          Top {{setTotalItems}} {{setName}} cards from Magic the Gathering .
        </h2>
      </div>
      <div class="column">
        <!-- CTA -->
      </div>
    </div>
    <i :class="`${iconString} largeBackgroundIcon`"></i>
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
    setNameClean() {
      return this.setName.replace('-',' ')
    },
    iconString(){
      return `largeSetIcon ss ss-${this.setCode.toLowerCase()} ss-echo is-size-3`
      },
  }
}
</script>

