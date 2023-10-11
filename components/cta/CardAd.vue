<template>
    <div class="cardAdd">
      <div class="card has-background-light">
        <div class="card-header has-background-danger">
          <h3 class="has-text-white has-text-centered is-size-5 p-2">{{title}}</h3>
          <small class="has-text-centered pt-3 pr-2 has-text-white is-size-6">{{description}}</small>
        </div>
        <div class="has-background-black">
            <NuxtImg
              width="340"
              height="165"
              :src="image"
              :alt="applicationText"
              class=" is-fullwidth" />


            <user-sign-up-form style="overflow: hidden;" classes="has-background-black" />
        </div>

      </div>
    </div>
</template>
<style scoped>
    /* .cardAdd {

      position: relative;
    }
    .cardAdd p {
        text-shadow: 0 0 5px black;
    }  */

</style>
<script>
  import UserSignUpForm from '@/components/user/UserSignUpForm.vue'

  export default {
    name: 'SkinnyAd',
    components: {
        UserSignUpForm
    },
    props: {
      callback: {
        type: Function
      },
      title: {
        type: String,
        default: 'Track Your Collection'
      },
      image: {
        type: String,
        default: 'https://assets.echomtg.com/images/product/card-page-2023.png'
      },
      description: {
        type: String,
        default: 'Users gain access to multiple apps and get weekly email collection reports'
      },
      applicationText: {
        type: String,
        default: 'EchoMTG Data Driven Collection Management'
      }

    }
  }
  </script>
