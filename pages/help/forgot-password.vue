<template>
  <div>
    <nuxt v-if="user?.user_level && parseInt(user.user_level) >= 3" keep-alive />
    <section class="hero is-info">
      <div class="hero-body">
          <div class="container">
              <h1 class="title">
                Forgot Password
              </h1>
              <h3 class="subtitle">
                Can't remember your password? Reset it with the form below.
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
          <div class="content" v-if="isSent">
            <h1>You will get an email sent to <strong>{{this.email}}</strong></h1>
            <p>Open your email program and click the reset password link to proceed</p>
          </div>
          <div class="content" v-if="!isSent">
            <h1>Forgot your Password?</h1>
            <p>No worries, use the form below to reset your password. An email will be sent to you with a temporary hash, goto your email and click that button to reset your password.</p>
          </div>
          <div v-if="!authenticated && !isSent" class="card has-background-light ">
            <div class="level p-4">
                <b-input icon="email" type="text" class="level-item mr-2"	v-model="email" placeholder="your@email.com"  />

                <b-button icon-right="arrow-right-bold" @click="resetPassword" label="Reset Password" class="level-item" type="is-info" />
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
      email: ''
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
  methods: {
    async resetPassword() {
      this.isSent = true;

      const res = this.$echomtg.userForgotPassword(this.email)
      this.$buefy.toast.open({
        message: res.message,
        type: 'is-info',
        queue: false
      })

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
