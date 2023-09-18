<template>
  <div>
    <nuxt v-if="user?.user_level && parseInt(user.user_level) >= 3" keep-alive />
    <section class="hero is-info">
      <div class="hero-body">
          <div class="container">
              <h1 class="title">
                Forgot PAssword
              </h1>
              <h3 class="subtitle">
                Can't remember your password? Reset it with the form below. An email with be sent to you with a link.
                Click the link to open a dialouge box to reset your password.
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
          <div class="card-content pt-1 px-3">
            <div class="level">
                <b-input icon="email" type="text" class="level-item mr-2"	v-model="email" placeholder="friends@email.com"  />

                <b-button icon-right="arrow-right-bold" @click="send" label="Share Now" class="level-item" type="is-info" />
            </div>
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
      loading: false,
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
      this.loading = true;
      this.email = '';

      const res = this.$echomtg.userResetPassword(this.email)
      this.$buefy.toast.open({
        message: res.message,
        type: 'is-info',
        queue: false
      })

      this.loading = false;

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
