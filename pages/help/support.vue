<template>
  <div>
    <nuxt keep-alive />
    <section class="hero is-info">
      <div class="hero-body">
          <div class="container">
              <h1 class="title">
                General Support
              </h1>
              <h3 class="subtitle">
                Resources to Find help related to the EchoMTG application and community.
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
        <div class="column is-two-fifths">
            <h2 class="title is-size-3"><span class="fa fa-comments-o  has-text-grey"></span> Join Discord for Help</h2>
            <p>For general support, help, or missing card inquires, please <a href="https://discord.gg/9CGwDs8nBj">Join our Discord server</a> and reach out to the community. <a href="https://discord.gg/9CGwDs8nBj">Click here to join.</a></p>
            <hr>
            <iframe src="https://discordapp.com/widget?id=377518692210180121&theme=dark" width="100%" height="500" allowtransparency="true" frameborder="0"></iframe>
        </div>

        <div class="column is-two-fifths">
            <div class="layout">
                <h2 class="title is-size-4"><b-icon icon="youtube" size="is-medium" class="has-text-grey" /> How To Videos</h2>
                <p>Learn the basics of EchoMTG from video on our YouTube channel <a href="https://www.youtube.com/channel/UC464feRBwDJdSkXaqfwoVIg/videos">YouTube Channel</a> for general how-to videos.</p>
                <hr />
                <h2 class="title is-size-4"><b-icon icon="road" size="is-medium" class="has-text-grey" /> Developer Roadmap</h2>
                <p>Gain insight into what is being worked on for both bugs and feature at our Github boards <a target="_blank" href="https://github.com/orgs/EchoMTG/projects/4">Roadmap Board</a> and <a target="_blank" href="https://github.com/EchoMTG/website/discussions">Feature and Support Board</a></p>
                <hr>
                <h2 class="title is-size-4"><b-icon icon="lock" size="is-medium" class="has-text-grey" /> Forgot your password?</h2>
                <p>If you have access to your email you may <nuxt-link to="/help/forgot-password/">Reset Password</nuxt-link>. Note its ofter user may mistype their email when creating an account, and when resetting their password they do not get an email. If you think this happened please contact Iona, see info below.</p>
                <nuxt-link to="/help/forgot-password/" class="button is-outlined is-small is-info mt-2">Reset Password</nuxt-link>
                <hr/>
                <h2 class="title is-size-4"><b-icon icon="delete" size="is-medium" class="has-text-grey" /> Delete Account</h2>
                <p>Deleting account will erase all your data based on GDPR and CCPA standards. You must be logged in to delete your account. When logged in, under my account click <nuxt-link to="/user/delete/">Delete Account</nuxt-link>. </p>
                <nuxt-link to="/user/delete/" class="button is-warning is-small mt-2">Delete Account</nuxt-link>
                <hr/>
                <h2 class="title is-size-5"><b-icon icon="email" class="has-text-grey" />  Email EchoMTG Directly</h2>

                <p>EchoMTG is a small family run business passion project, please note email responses take may take up to 7 days. For product support and missing card inquires please join Discord and let the community know what cards or sets we are missing.</p>
                <hr />
                <div class="columns">
                  <div class="column">
                    <h3><strong>Iona</strong></h3>
                    <p>Billing &amp; Account Questions<br/><a href='m&#97;i&#108;t&#111;&#58;&#37;69on&#37;61&#64;e&#99;h%6Fmt&#103;&#46;%63om'>&#105;o&#110;a&#64;ech&#111;mtg&#46;com</a></p>
                  </div>
                  <div class="column">
                    <h3><strong>Teeg</strong></h3>
                    <p>Code &amp; Features Questions<br/><a href="mailto:&#116;&#101;&#101;&#103;&#64;&#101;&#99;&#104;&#111;&#109;&#116;&#103;&#46;&#99;&#111;&#109;">&#116;&#101;&#101;&#103;&#64;&#101;&#99;&#104;&#111;&#109;&#116;&#103;&#46;&#99;&#111;&#109;</a></p>
                  </div>
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
import CreateAccountModal from '~/components/user/CreateAccountModal.vue'
import HelpSubNav from '~/components/help/HelpSubNav.vue'
import helpMenu from '@/components/navigation/help'

export default {
  name: 'Help',
  components: {
    EchoBreadCrumbs,
    CreateAccountModal,
    FullAd,
    HelpSubNav
  },
  data () {
    return {
      helpNavPosition: 0
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
  head () {
    return {
        title: this.helpNav[this.helpNavPosition].label,
        description: this.helpNav[this.helpNavPosition].description
    }
  }
}
</script>
