<template>
  <div>
    <nuxt v-if="user?.user_level && parseInt(user.user_level) >= 3" keep-alive />
    <section class="hero is-info">
      <div class="hero-body">
          <div class="container">
              <h1 class="title">
                Submit a Bug Report
              </h1>
              <h3 class="subtitle">
                EchoMTG is a community driven application. Bugs can be submitted on <a target="_blank" href="https://github.com/EchoMTG/website/issues/new?assignees=&labels=UI+BUG&projects=&template=bug_report.md&title=%5BBUG%5D+">Github</a> or to the @wiki-team through our <nuxt-link to="/about/discord/">discord server</nuxt-link>.  
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
          
        <div class="columns">
          <div class="column is-half">
            <h2 class="title is-size-4 mb-1">Application Error</h2>
            <p>Report application errors by <a target="_blank" href="https://github.com/EchoMTG/website/issues/new?assignees=&labels=UI+BUG&projects=&template=bug_report.md&title=%5BBUG%5D+">directly reporting on Github</a> or by <nuxt-link to="/about/discord/">joining discord</nuxt-link> and reporting to the @wiki-team</p>
            <hr />
            <h2 class="title is-size-4 mb-1">API Error</h2>
            <p>Report API errors by <a target="_blank" href="https://github.com/EchoMTG/website/issues/new?assignees=&labels=UI+BUG&projects=&template=bug_report.md&title=%5BBUG%5D+">directly reporting on Github</a> or by <nuxt-link to="/about/discord/">joining discord</nuxt-link> and reporting to the @wiki-team</p>
            <hr />
            <h2 class="title is-size-4 mb-1">Mobile App Error</h2>
            <p>Report mobile app errors by <a target="_blank" href="https://github.com/EchoMTG/website/issues/new?assignees=&labels=UI+BUG&projects=&template=bug_report.md&title=%5BBUG%5D+">directly reporting on Github</a> or by <nuxt-link to="/about/discord/">joining discord</nuxt-link> and reporting to the @wiki-team</p>
          </div>
          <div class="column is-half">
            <h2 class="title is-size-4 mb-1">Missing Items</h2>
            <p>Report missing items by <nuxt-link to="/about/discord/">joining discord</nuxt-link> and reporting to the @wiki-team</p>
              <hr />
            <h2 class="title is-size-4 mb-1">Data Error</h2>
              <p>Report database errors by <nuxt-link to="/about/discord/">joining discord</nuxt-link> and reporting to the @wiki-team</p>
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
  name: 'Faqs',
  components: {
    EchoBreadCrumbs,
    FullAd,
    HelpSubNav
  },
  data () {
    return {
      helpNavPosition: 2
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
