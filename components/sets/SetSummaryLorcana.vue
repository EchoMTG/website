<template>
  <div class="setSummary">
    <div class="imageBox">
      <img
        :src="topcardImage"
        class="setTopImageLorcana"
        :alt="setName"
      />
    </div>
    <div class="columns">
      <div class="column is-three-quarters">
        <img
          src="https://assets.echomtg.com/lorcana/lorcana-ink.png"
          alt="Lorcana Ink Icon"
          class="iconLeft" />
        <h1>
          <em class="has-text-white has-shadow has-text-weight-light is-size-6">Disney Lorcana</em>
          <br />
          <a v-if="setCode !== ''" class="is-size-3" :href="setURL">{{setName}} - {{setCode}}</a>
          <a v-else class="is-size-3" :href="setURL">All {{setName}} Cards</a>
        </h1>
        <h2 v-if="setReleaseDate !== ''" class="has-text-weight-normal has-text-light-grey is-size-7">
          Lorcana {{setName}} was released on {{setReleaseDate}} with {{setTotalItems}} items.
        </h2>
        <h2 v-if="setReleaseDate == ''" class="has-text-weight-normal has-text-light-grey is-size-7">
          Top {{setTotalItems}} {{setName}} cards from Lorcana.
        </h2>
      </div>
      <div class="column">
        <!-- CTA -->
      </div>
    </div>
    <img
      alt="Disney Lorcana Logo"
      width="200"
      src="https://assets.echomtg.com/lorcana/lorcana-logo-darkblue-background.png"
      class="largeLorcanaBackgroundImage" />
  </div>
</template>

<style scoped>
.setSummary{
  background: #0b0e31 !important;
}
.setSummary div.imageBox::before{

  background-image: linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(11, 14, 49, 0.5), rgb(11, 14, 49)) !important;
}

.iconLeft{
		display: block;
		float: left;
    color: white;
    width: 100px;
		margin-right: 15px;
		opacity: .9;
}
</style>

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
  }
}
</script>

