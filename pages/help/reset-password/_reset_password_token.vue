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
          <div class="message content is-danger" v-if="error">
            <h1>There is a problem reseting the password to this email</h1>
            <p>If the token to update your password is from more than 24 hours ago, please create another reset token <a href="/user/forgot_password/">here</a> and try again.</p>
            <p>If the token is not 24 hours old, it is likely the email you are trying to reset for doesn't exist or there is a typo email when you created the account. If you have not seen a weekly email report or welcome to echo message to your email, this is likely the case.</p>
            <p>If you continue to experience a problem <nuxt-link to="/help/support/">contact us</nuxt-link></p>
          </div>
          <div class="message content is-danger" v-if="success">
            <h1>There is a problem reseting the password to this email</h1>
            <p>If the token to update your password is from more than 24 hours ago, please create another reset token <a href="/user/forgot_password/">here</a> and try again.</p>
            <p>If the token is not 24 hours old, it is likely the email you are trying to reset for doesn't exist or there is a typo email when you created the account. If you have not seen a weekly email report or welcome to echo message to your email, this is likely the case.</p>
            <p>If you continue to experience a problem <nuxt-link to="/help/support/">contact us</nuxt-link></p>
          </div>
          <div v-if="!authenticated && !error && !success" class="card has-background-light ">
            <div class="level p-4">
                <b-input icon="lock" type="password" class="level-item mr-2"	v-model="password"  />

                <b-button icon-left="content-save" @click="updatePassword" label="Update Password" class="level-item" type="is-info" />
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
      success: false
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
    }

  },
  async fetch(){
    this.reset_token = this.$route.params['reset_password_token'];
  },
  methods: {
    async updatePassword() {

      const res = this.$echomtg.userUpdatePasswordWithHash(this.password, this.reset_token)

      if(res.status == 'error'){
        this.error = false;
         this.$buefy.toast.open({
          message: res.message,
          type: 'is-danger',
          queue: false
        })
      } else {
        this.sucess = true
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
        description: this.helpNav[this.helpNavPosition].description
    }
  }
}
</script>
