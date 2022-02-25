<template>
  <div class="login-wrapper">

    <div class="columns">
      <div class="column is-two-fifths">

        <card-component
      title="Login"
      icon="lock"
      :has-card-header-background="true"
      :has-button-slot="true"
    >
      <router-link slot="button" to="/" class="button is-small">
        Dashboard
      </router-link>

      <form method="POST" @submit.prevent="submit">
        <b-field label="E-mail Address">
          <b-input name="email" type="email" v-model="email" required autofocus />
        </b-field>

        <b-field label="Password">
          <b-input type="password" name="password" v-model="password" required />
        </b-field>

        <b-field>
          <b-checkbox type="is-black" class="is-thin">
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
    <div class="bg-image"></div>
  </div>
</template>
<style scoped>
.login-wrapper{
  position:relative;
  width: 100%;
  height: 100%;
}
.bg-image {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  background-image: url(https://assets.echomtg.com/images/fanart/fico-ossio-echomtg-magic-the-gathering-fanart-final.jpg);
  animation-name: MOVE-BG;
  background-size: 140%;
  animation-duration: 10s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}


@keyframes MOVE-BG {
   from {
     transform: scale(1.25)  translateX(0) translateY(0);

   }
   to {
     transform: scale(1.20)   translateX(-20%) translateY(20%);

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
      remember: false
    }
  },
  head () {
    return {
      title: 'Login — Admin One Nuxt.js Premium'
    }
  },
  methods: {
    async submit () {
      this.isLoading = true
      let formData = new FormData();
      formData.append('email', this.email);
      formData.append('password', this.password);

      const rawResponse = await fetch('https://www.echomtg.com/api/user/auth/', {
        method: 'POST',
        body: formData
      });
      const content = await rawResponse.json();

      this.isLoading = false
      // user logged in successfully
      if(content.status == 'success'){
        setCookie('token', content.token)
        // set vookie to domain....
        this.$buefy.snackbar.open({
          message: 'Login Successful.',
          queue: false
        })
        // reload to the homepage, which is the users dashboard

        window.location = '/'

      } else {
        this.$buefy.snackbar.open({
          message: 'Login Failed, please try again.',
          queue: false
        })
      }

    }
  }
}
</script>
