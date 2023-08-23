<template>
  <div class="skinnyAd">
    <div class="columns">
      <div class="column is-7">
        <h3>{{title}}</h3>
        <p>{{description}}</p>
      </div>
      <div class="column">
        <create-account-modal />
      </div>
    </div>
  </div>
</template>
<style scoped>
  .skinnyAd {
    background-image: url('https://assets.echomtg.com/images/fanart/fico-ossio-echomtg-magic-the-gathering-fanart-final.jpg');
    border-radius: 10px;
    background-size: 100%;
    background-position: center center;

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
