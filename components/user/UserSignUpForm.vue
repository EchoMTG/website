<template>
    <section :class="`userSignupForm p-5 is-relative `+classes">

      <div v-if="!authenticated">
        <h2 class="is-size-4 has-text-white has-text-weight-bold">Start a Free Account</h2>

        <b-field
          label="User handle"
          :type="userType"
          :message="usernameMessage"
          >
          <b-input
            custom-class="has-background-white has-text-black"
            placeholder="User handle "
            required
            type="text"
            @blur="checkUserName"
            icon="account"
            v-model="username"
          />
        </b-field>

        <b-field
          label="Email Address"
          >
              <b-input
                v-model="email"
                placeholder="your@email.com"
                icon="email-outline"
                type="email"
                custom-class="has-background-white has-text-black"
                validation-message="Valid email required."
                pattern="(.*?)@[a-zA-Z0-9-]*\.[a-zA-Z0-9-]{2,9}"
              />
        </b-field>


          <b-field
              label="Password"
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
            <b-button
              :disabled="!active"
              @click="registerUser"
              icon-left="account-plus"
              class="button mythic-background">
              Create Account
            </b-button>

        </b-field>
        <small class="has-text-grey-light">By creating an account, you agree to the user <a href="/legal/terms-and-conditions/">Terms and Conditions</a></small>
        <b-loading v-model="loading" :is-full-page="false" />
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
label.label {
  color: #999 !important;
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
      usernameStatus: false,
      usernameMessage: '',
      loading: false
    }
  },
  computed: {
    ...mapState([
      'user',
      'authenticated'
    ]),
    passwordType(){
      if(this.password == '') return ''
      return this.passwordStatus ? 'is-success' : 'is-danger'
    },
    userType(){
      if(this.username == '') return ''
      return this.usernameStatus ? 'is-success' : 'is-danger'
    },
    active(){

      if(this.usernameStatus && this.passwordStatus && this.loading == false) return true;
      return false;
    },
    passwordStatus() {
      return this.passwordCheck(this.password) ? true : false;
    }
  },
  watch: {
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
    emailCheck(){

    },
    async checkUserName(){
      if(this.username.length <= 2){
        this.usernameStatus = false;
        return false;
      }
      const res = await this.$echomtg.getReq(`user/unique_check/?value=${this.username}&type=username`)
      this.usernameMessage = res.message;
      this.usernameStatus = res.status == 'success' ?  true : false;
      return res.status == 'success' ?  true : false;
    },
    async registerUser(){
      await this.checkUserName();


      if(this.usernameStatus == true){
        this.loading = true;
        const referrer = this.$cookies.get('referrerCode') ? this.$cookies.get('referrerCode') : '';
        const referrer_url = this.$cookies.get('referrerURL') ? this.$cookies.get('referrerURL') : 'direct';
        const entry_url = this.$cookies.get('entryURL') ? this.$cookies.get('entryURL') : 'n/a';
        const capture_url = window.location.href;

        // !TEST they canoot create a user without a uniqye username and email
        const res = await this.$echomtg.registerUser(
          this.email,
          this.username,
          this.password,
          referrer,
          referrer_url,
          entry_url,
          capture_url
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
          this.loading = false;
        }
      }
    }
  }
}
</script>
