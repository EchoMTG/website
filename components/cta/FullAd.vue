<template>
  <div class="fullAd px-5 py-5">
      <h3 class="has-text-dark has-text-centered has-text-shadow is-size-3">{{title}}</h3>
      <div class="message m-6  has-background-dark">

          <div class="columns">
              <div class="column is-8">
                  <div class="px-4">
                      <p class="has-text-centered pb-3 has-text-light is-size-5">{{description}}</p>
                  </div>

                  <NuxtImg
                      :src="image"
                      alt="Trading Card collection tools screenshot"
                      style="border-radius: 10px;"
                      width="1000"
                      class="mx-3 is-fullwidth" />

                  <div class="px-4 pt-3">
                      <p class="has-text-centered has-text-grey is-size-5">{{applicationText}}</p>
                  </div>


              </div>
              <div class="column is-4">
              <user-sign-up-form style="border-radius: 5px; overflow: hidden;" classes="has-background-black is-rounded mr-3" />
              </div>
          </div>
      <!-- <div class="overlay"></div> -->
      </div>
  </div>
</template>
<style scoped>
    .fullAd {

      position: relative;
    }
    .fullAd p {
        text-shadow: 0 0 5px black;
    }
    .fullAd .overlay{
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
  import UserSignUpForm from '@/components/user/UserSignUpForm.vue'

  export default {
    name: 'FullAd',
    components: {
        UserSignUpForm
    },
    props: {
      callback: {
        type: Function
      },
      title: {
        type: String,
        default: 'You Must be Logged in to Use this Application'
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
