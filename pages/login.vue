<template>
  <div class="login-wrapper">

    <div class="columns login-overlay">
      <div class="column is-two-fifths login-background">
        <img class="ml-6 mr-6 mt-6 p-4" src="https://assets.echomtg.com/interface/echomtg-logo-white-color.svg" />
        <user-login-card classes="has-background-black" redirect-path="/" />

      </div>
    </div>
    <img class="bg-image" src="https://assets.echomtg.com/images/fanart/fico-ossio-echomtg-magic-the-gathering-fanart-final.jpg"/>
  </div>
</template>
<style scoped>
.login-wrapper{
  position:relative;
  width: 100%;
  height: calc(100vh - 100px);
  overflow: hidden;
}
.login-background{
  background: rgba(0,0,0,.8);
}
.login-overlay{
  position: relative;
  z-index: 1;
  height: 120%;
}

.bg-image {
  position: absolute;
  height: 110%;
  width: auto;
  max-width: none;
  top: 0;
  left: 0;
  z-index: -1;
  animation-name: MOVE-BG;
  animation-duration: 60s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}


@keyframes MOVE-BG {
   0% {
     transform: scale(1.2)  translateX(0) translateY(0) rotate(0deg);

   }
   25% {
     transform: scale(1.3)   translateX(5%) translateY(5%) rotate(10deg);

   }
   25% {
     transform: scale(1.5)   translateX(15%) translateY(-5%) rotate(20deg);

   }
   50% {
     transform: scale(1.8)   translateX(20%) translateY(0) rotate(0deg);

   }
   75% {
     transform: scale(1.40)   translateX(5%) translateY(-10%) rotate(-15deg);

   }
   100% {
     transform: scale(1.2)   translateX(0) translateY(0) rotate(0deg);

   }
}
</style>
<script>

import UserLoginCard from '@/components/user/UserLoginCard.vue'

export default {
  name: 'Login',
  components: { UserLoginCard },
  head () {
    return {
      title: 'Login — EchoMTG',
      meta: [
        { 'http-equiv': 'X-Frame-Options', content: 'deny' },
      ]
    }
  },

}
</script>
