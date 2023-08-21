<template>
  <div class="login-wrapper">

    <div class="columns login-overlay">
      <div class="column is-two-fifths has-background-black">
        <img class="ml-6 mr-6 mt-6 p-4" src="https://assets.echomtg.com/interface/echomtg-logo-white-color.svg" />

      <card-component
        class="loginScreenComponent m-6"
        title="Login"
        icon="lock"
        :has-card-header-background="true"
        :has-button-slot="true"
      >
      <router-link slot="button" to="/" class="button is-small">
        Home
      </router-link>

      <form method="POST" @submit.prevent="submit">

        <b-field label="E-mail Address">
          <b-input name="email" type="email" v-model="email" required autofocus />
        </b-field>

        <b-field label="Password">
          <b-input type="password" name="password" v-model="password" required />
        </b-field>

        <b-field>
          <b-checkbox type="is-black" class="is-thin" v-model="remember">
            Remember me
          </b-checkbox>
        </b-field>

        <hr>

        <b-field grouped>
          <div class="control">
            <button
              type="submit"
              class="button is-black"
              :class="{ 'is-loading': isLoading }"
            >
              Login
            </button>
          </div>
          <div class="control">
            <router-link
              to="/full-page/password-recovery"
              class="button is-outlined is-black"
            >
              Forgot Password?
            </router-link>
          </div>
        </b-field>
      </form>
        </card-component>
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
.login-overlay{
  position: relative;
  z-index: 1;
  height: 120%;
}

.bg-image {
  position: absolute;
  height: 130%;
  width: auto;
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
     transform: scale(1)  translateX(0) translateY(0) rotate(0deg);

   }
   25% {
     transform: scale(1.2)   translateX(5%) translateY(5%) rotate(10deg);

   }
   25% {
     transform: scale(1.5)   translateX(15%) translateY(-5%) rotate(20deg);

   }
   50% {
     transform: scale(1.40)   translateX(40%) translateY(0) rotate(0deg);

   }
   75% {
     transform: scale(1.20)   translateX(15%) translateY(-15%) rotate(-15deg);

   }
   100% {
     transform: scale(1)   translateX(0) translateY(0) rotate(0deg);

   }
}
</style>
<script>
import CardComponent from '@/components/CardComponent'

export default {
  name: 'Login',
  components: { CardComponent },
  data () {
    return {
      isLoading: false,
      email: null,
      password: null,
      remember: true
    }
  },
  head () {
    return {
      title: 'Login — EchoMTG'
    }
  },
  methods: {
    async submit () {

      this.isLoading = true
      let formData = new FormData();
      formData.append('email', this.email);
      formData.append('password', this.password);
      formData.append('remeber', this.remeber);
      let url = this.$config.API_DOMAIN + 'user/auth/'
      const rawResponse = await fetch(url, {
        method: 'POST',
        body: formData
      });

      const content = await rawResponse.json();


      // user logged in successfully
      if(content.status == 'success'){
        // remeber for a year or 1 day
        let days = this.remember == true ? 365 : 1;
        // set cookie on client
        this.$cookies.set('token', content.token,{
          path: '/',
          maxAge: 1000 * 60 * 60 * 24 * days,
          domain: '.echomtg.com'
        })

        // set vookie to domain....
        this.$buefy.snackbar.open({
          message: 'Login Successful.',
          queue: false
        })

        // fetch the meta
        const userdata = await this.$echomtg.getUserMeta();
        const quickstats = await this.$echomtg.inventoryQuickStats();


        // store the user data
        if(userdata.status == 'success'){

          this.$store.commit('user', userdata.user);
          this.$store.commit('authenticated',true);
          this.$store.commit('quickstats',quickstats.stats);
        }

        // reload to the homepage, which is the users dashboard
        this.isLoading = false
        // redirect to homepage
        this.$router.push({path: '/'});


      } else {
        this.isLoading = false
        this.$buefy.snackbar.open({
          message: 'Login Failed, please try again.',
          queue: false
        })
      }

    }
  }
}
</script>
