<template>
    <section :class="`userSignupForm p-5 `+classes">
      <div v-if="!authenticated">
        <h3 class="is-size-4 has-text-white has-text-weight-bold">Join now with a Free Account</h3>
        <b-field>
          <div class="control">
              <label class="label has-text-grey">User handle</label>
            <b-input custom-class="has-background-white has-text-black" placeholder="User handle "
              type="text"
              required
               icon="account"
               v-model="username"

              >
            </b-input>
            </div>
        </b-field>

        <b-field>
           <div class="control has-icons-left">
              <label class="label has-text-grey">Email Address</label>
              <b-input
                v-model="email"
                placeholder="your@email.com"
                icon="email-outline"
                type="email"
                custom-class="has-background-white has-text-black"
                validation-message="Valid email required."
                pattern="(.*?)@[a-zA-Z0-9-]*\.[a-zA-Z0-9-]{2,9}"
              ></b-input>
            </div>
        </b-field>


          <b-field
              label=" Password"
              icon="lock"
              :type="passwordType"
              message="Minimum 6 characters. 1 number, 1 lowercase or uppercase."
              >
              <b-input
                icon="form-textbox-password"
                password-reveal
                type="password"
                custom-class="has-background-white has-text-black"
                v-model="password" />
            </b-field>

        <b-field>
            <div class="control">
            <b-button
              :disabled="!active"
              @click="registerUser"
              icon-left="account-plus"
              class="button mythic-background">
              Create Account
            </b-button>
        </div>
        </b-field>
      </div>
      <div v-if="authenticated" class="content">
        <h2>You are Logged in</h2>
        <p>If you are trying to make a new account, log out and return back to this form.</p>
      </div>
    </section>
</template>
<style scoped>
.create-account-box {
  border-radius: 5px;
  box-shadow: 0px 0px 10px black;
  border: 1px #333 solid;
}
div.control input {
  color: black !important;
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
      password: '',
      active: false
    }
  },
  computed: {
    ...mapState([
      'user',
      'authenticated'
    ]),
    passwordType(){
      if(this.password == '') return ''
      return this.passwordCheck(this.password) ? 'is-success' : 'is-danger'
    },
  },
  watch: {
    password() {
      this.active = this.passwordCheck(this.password) ? true : false;
    },
    username() {
      return this.username.length > 2
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
    passwordCheck(password){
      return (/\d/.test(password) && /[a-zA-Z]/.test(password) && password.length >= 6) ? true : false
    },
    async registerUser(){
      const referrer = this.$cookies.get('referrerCode') ? this.$cookies.get('referrerCode') : '';
      const referrer_url = this.$cookies.get('referrerURL') ? this.$cookies.get('referrerURL') : 'direct';
      const res = await this.$echomtg.registerUser(
        this.email,
        this.username,
        this.password,
        referrer,
        referrer_url
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
