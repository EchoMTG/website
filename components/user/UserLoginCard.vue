<template>
    <card-component
            :class="`loginScreenComponent m-6 `+classes"
            title="Login"
            icon="lock"
            :has-card-header-background="true"
            :has-button-slot="true"
          >
          <!-- <router-link slot="button" to="/" class="button is-small">
            Home
          </router-link> -->

          <form method="POST" @submit.prevent="submit">

            <b-field label="E-mail Address">
              <b-input 
                name="email" 
                custom-class="has-background-white has-text-black" 
                type="email"
                placeholder="your@email.com" 
                v-model="email" 
                required 
                autofocus />
            </b-field>

            <b-field label="Password">
              <b-input 
                type="password" 
                custom-class="has-background-white has-text-black" 
                name="password" 
                password-reveal
                v-model="password" required />
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
                  class="button is-outlined is-black has-text-info"
                >
                  Forgot Password?
                </router-link>
              </div>
            </b-field>
          </form>
        </card-component>
</template>
    <style scoped>
    .loginScreenComponent input{
        background-color: white !important;
    }
</style>
<script>
import CardComponent from '@/components/CardComponent'

export default {
 name: 'UserLoginCard',
 components: {
    CardComponent
 },
 props: {
    classes: {
      type: String,
      default: ''
    },
    redirectPath: {
        type: String
    },
    callback: {
      type: Function
    }
  },
 data () {
    return {
      isLoading: false,
      email: null,
      password: null,
      remember: true
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

        if(this.callback){
            this.callback()
        }
        if(this.redirectPath){
            // redirect to homepage
            this.$router.push({path: this.redirectPath});
        }


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
