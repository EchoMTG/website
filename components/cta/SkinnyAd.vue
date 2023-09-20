<template>
  <div class="skinnyAd">

    <div class="columns">
      <div class="column is-8">
        <div class="px-4">
          <h3 class="has-text-white has-text-shadow is-size-3">{{title}}</h3>
          <p class="has-text-light is-size-5">{{description}}</p>
        </div>
      </div>
      <div class="column is-4">

        <create-account-modal size="is-large" classes="mt-3" />
      </div>
    </div>
    <!-- <div class="overlay"></div> -->
  </div>
</template>
<style scoped>
  .skinnyAd {
    /* background-image: url('https://assets.echomtg.com/images/fanart/fico-ossio-echomtg-magic-the-gathering-fanart-final.jpg'); */
    background-image: url('https://assets.echomtg.com/images/echo-mtg-pile-cards.jpg');
    border-radius: 10px;
    background-size: 50% auto;
    background-position: bottom left;
    position: relative;
  }
  .skinnyAd h3, .skinnyAd p {
    text-shadow: 0 0 5px black;
  }
  .skinnyAd .overlay{
    position:absolute;
    z-index: 0 !important;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:linear-gradient(to bottom, rgba(0,0,0,1),rgba(0,0,0,0.4), rgba(0,0,0,0.1));
  }

</style>
<script>
import CreateAccountModal from '@/components/user/CreateAccountModal.vue'

export default {
  name: 'SkinnyAd',
  components: {
    CreateAccountModal
  },
  props: {
    callback: {
      type: Function
    },
    title: {
      type: String,
      default: 'Create an Account to Access this Feature'
    },
    description: {
      type: String,
      default: 'Free to Signup Today'
    }

  }
}
</script>
