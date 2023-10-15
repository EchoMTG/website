<template>
  <div>
    <nuxt v-if="user?.user_level && parseInt(user.user_level) >= 3" keep-alive />
    <section class="hero is-small is-info">
      <div class="hero-body">
          <div class="container">
              <h1 class="title is-size-4">
                Training Videos
              </h1>
              <h3 class="subtitle">
                Get up to speed with hot tips and tricks on each app.
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
              <h3>Import App</h3>
              <p>Walthrough of the Import App tool</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/EKv8I92Toyg?si=2ndgTwi4PbSb1vna"
                title="EchoMTG Import Walkthrough"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe>
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
  name: 'TrainingVideos',
  components: {
    EchoBreadCrumbs,
    FullAd,
    HelpSubNav
  },
  data () {
    return {
      helpNavPosition: 4
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
