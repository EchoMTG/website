<template>
  <div>
    <nuxt v-if="user?.user_level && parseInt(user.user_level) >= 3" keep-alive />
    <section class="hero is-info">
      <div class="hero-body">
          <div class="container">
              <h1 class="title">
                Reset Password
              </h1>
              <h3 class="subtitle">
                Use the form below to reset your password
              </h3>
          </div>
      </div>
    </section>
    <echo-bread-crumbs :data="crumbs" class="mb-5" />
    <div class="container">
      <div class="columns">
        <div class="column is-one-fifth">
          <help-sub-nav />
        </div>

        <div class="column is-four-fifths">
          <div class="content">
            <h1>Update your Password</h1>
            <p>Use the form below to change your password.</p>
          </div>
          <div class="message p-5 content is-danger" v-if="error">
            <h4>There is a problem reseting the password to this email</h4>
            <p>If the token to update your password is from more than 24 hours ago, please create another reset token <a href="/user/forgot_password/">here</a> and try again.</p>
            <p>If the token is not 24 hours old, it is likely the email you are trying to reset for doesn't exist or there is a typo email when you created the account. If you have not seen a weekly email report or welcome to echo message to your email, this is likely the case.</p>
            <p>If you continue to experience a problem <nuxt-link to="/help/support/">contact us</nuxt-link></p>
          </div>
          <div class="message p-5 content is-success" v-if="success">
            <h4>Password reset successfully.</h4>
             <p>Please <nuxt-link to="/login/">login</nuxt-link> with your new password.</p>
          </div>
          <div v-if="!authenticated && !error && !success" class="card has-background-light ">
            <div class=" p-4">


              <b-field
                label="New Password"
                 class="mr-2"
                icon="lock"
                :type="newPasswordType"
                message="Requires 1 number, 1 lowercase or uppercase. Must be 6 characters or more."
                >
                <b-input
                  icon="form-textbox-password"
                  password-reveal
                  type="password"

                  v-model="password" />
              </b-field>

                <b-button :disabled="!active" icon-left="content-save" @click="updatePassword" label="Update Password" class="level-item" type="is-info" />
            </div>
          </div>
          <div v-if="authenticated" class="card has-background-light p-4">
            You are logged in, signout to reset your password or goto the user account areas to change your password.
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FullAd from '~/components/cta/FullAd.vue'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue'
import HelpSubNav from '~/components/help/HelpSubNav.vue'
import helpMenu from '@/components/navigation/help'

export default {
  name: 'ForgotPassword',
  components: {
    EchoBreadCrumbs,
    FullAd,
    HelpSubNav
  },
  data () {
    return {
      helpNavPosition: 5,
      isSent: false,
      reset_token: '',
      error: false,
      success: false,
      active: false,
      password: ''
    }
  },
  computed: {
    crumbs() {
      return [
        {
          label: 'Help',
          url: '/help/',
          icon: 'help-circle-outline'
        },
        {
          label: this.helpNav[this.helpNavPosition].label,
          url: this.helpNav[this.helpNavPosition].to,
          icon: this.helpNav[this.helpNavPosition].icon

        }
      ]

    },
    ...mapState([
      'user',
      'authenticated'
    ]),
    helpNav() {
      return helpMenu();
    },

    newPasswordType(){
      if(this.password == '') return ''
      return this.passwordCheck(this.password) ? 'is-success' : 'is-danger'
    },

  },
  async fetch(){
    this.reset_token = this.$route.params['reset_password_token'];
  },
  watch: {
    password() {
      this.active = this.passwordCheck(this.password) ? true : false;

    }
  },
  methods: {
    passwordCheck(password){
      return (/\d/.test(password) && /[a-zA-Z]/.test(password) && this.password.length >= 6) ? true : false
    },
    async updatePassword() {

      const res = await this.$echomtg.userUpdatePasswordWithHash(this.password, this.reset_token)

      if(res.status == 'error'){
        this.error = false;
         this.$buefy.toast.open({
          message: res.message,
          type: 'is-danger',
          queue: false
        })
      } else {
        this.success = true
         this.$buefy.toast.open({
          message: res.message,
          type: 'is-info',
          queue: false
        })
      }


    }
  },
  head () {
    return {
        title: this.helpNav[this.helpNavPosition].label,
        description: this.helpNav[this.helpNavPosition].description,
        meta: [
          { 'http-equiv': 'X-Frame-Options', content: 'deny' },
        ]
    }
  }
}
</script>
