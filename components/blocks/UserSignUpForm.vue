<template>
    <section :class="`userSignupForm p-5 `+classes">
        <h3 class="is-size-4 has-text-white has-text-weight-bold">Create a Free Account</h3>
        <b-field>
          <div class="control">
              <label class="label has-text-grey">User handle</label>
            <b-input custom-class="has-backgorund-white" placeholder="User handle (custom validation for only lowercase)"
              type="text"
              required
               icon="account"
               v-model="username"
              validation-message="Only lowercase is allowed"
              pattern="[a-z]*">
            </b-input>
            </div>
        </b-field>

        <b-field>
           <div class="control has-icons-left">
              <label class="label has-text-grey">Email Address</label>
              <b-input v-model="email" placeholder="Email" custom-class="has-backgorund-white" icon="email-outline" type="email"></b-input>
            </div>
        </b-field>
        <b-field>
          <div class="control">
              <label class="label has-text-grey">Password</label>

            <b-input type="password"
                placeholder="Password"
                v-model="password"
                icon="form-textbox-password"
                password-reveal>
            </b-input>
            <p class="help has-text-grey-lighter">Must contain one letter, one number, and be at least 6 characters.</p>
            </div>
        </b-field>
        <b-field>
            <div class="control">
            <b-button
              @click="registerUser"
              icon-left="account-plus"
              class="button is-primary mythic-background">
              Create Account
            </b-button>
        </div>
        </b-field>
    </section>
</template>
<style scoped>
.create-account-box {
  border-radius: 5px;
  box-shadow: 0px 0px 10px black;
  border: 1px #333 solid;
}
</style>
<script>
import { mapState } from 'vuex'

export default {
  name: 'UserSignUpForm',
  components: { },
  data: () => {
    return {
      email: '',
      username: '',
      password: ''
    }
  },
  props: {
    classes: {
      type: String,
      default: ''
    },
    callback: {
      type: Function
    }
  },
  methods: {
    async registerUser(){
      const res = await this.$echomtg.registerUser(
        this.email,
        this.username,
        this.password
      )
      if(res.status == "success"){
        // let them know
        this.$buefy.toast.open({
          message: res.message,
          type: 'is-success'
        })

        let days = 30;

        // store a cookie
        this.$cookies.set('token', res.token,{
          path: '/',
          maxAge: 1000 * 60 * 60 * 24 * days,
          domain: '.echomtg.com'
        })

        // fetch user into the state
        this.$store.commit('user',res.user)
        this.$store.commit('authenticated',true)

        // fetch quickstats into state
        const quickstats = await this.$echomtg.inventoryQuickStats();
        if(quickstats.status == 'success'){
          this.$store.commit('quickstats',quickstats.stats);
        }

        if(this.callback){
          this.callback()
        }

      } else {
        this.$buefy.toast.open({
          message: `Error: ${res.message}`,
          type: 'is-danger'
        })
      }
      console.log(res)
    }
  }
}
</script>
