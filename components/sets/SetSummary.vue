<template>
  <div class="setSummary">
    <div class="imageBox">
      <NuxtImg
        :src="topcardImage"
        width="400"
        class="setTopImage"
        quality="100"
        :alt="setName"
      />
    </div>
    <div class="columns">
      <div class="column is-three-quarters">
        <i :class="iconString"></i>
        <h1  class="has-text-white">
          <em class="has-text-white has-shadow has-text-weight-light is-size-6 is-size-7-touch">Magic the Gathering MTG</em>
          <br />
          <a v-if="setCode !== ''" class=" is-size-3 is-size-5-touch" :href="setURL">{{setName}}</a> {{dynamicTitle}}
        </h1>
        <p class=" has-text-weight-normal has-text-white is-size-7" v-html="dynamicDescription"></p>
      </div>
      <div class="column">
        <!-- CTA -->
      </div>
    </div>
    <i :class="`${iconString} largeBackgroundIcon is-hidden-touch`"></i>
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
    customTitle: {
      type: String,
      default: ''
    },
    customDescription: {
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
    dynamicTitle() {
      return (this.customTitle !== '') ? this.customTitle : `- ${this.setCode}`
    },
    dynamicDescription() {
      if(this.customDescription !== '') return this.customDescription;
      return this.setReleaseDate == '' ?
        `Top ${this.setTotalItems} ${this.setName} cards from Magic the Gathering.`
        :
        `MTG ${this.setName} was released on ${this.setReleaseDate} with ${this.setTotalItems} items.`
    },
    setNameClean() {
      return this.setName.replace('-',' ')
    },
    iconString(){
      return `largeSetIcon ss ss-${this.setCode.toLowerCase()} ss-echo is-size-3`
      },
  }
}
</script>

