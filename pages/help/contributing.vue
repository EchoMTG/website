<template>
  <div>
    <nuxt v-if="user?.user_level && parseInt(user.user_level) >= 3" keep-alive />
    <echo-bread-crumbs :data="crumbs" />

    <div class="columns ml-3 mt-3">
      <div class="column is-one-fifth">
        <help-sub-nav />
      </div>

      <div class="column is-four-fifths">
         <div class="container">
            <h1 class="title">Contributing to EchoMTG</h1>
            <p class="pr-6">EchoMTG is a community driven application built on top of a publically documented, but proprietary, API.
              This page explains whats available to participate from developement to database management.</p>
            <hr />
          </div>
       <div class="columns">
        <div class="column is-half">
          <h2 class="title is-size-4 mb-1">Wiki-Team</h2>
          <b-tag type="is-info">Discord</b-tag> <b-tag type="is-light">TCG Knowledge</b-tag>
          <p class="mb-2 mt-1">The team that keeps the database up to date and helps new users. The wiki team has special features in the application for updating and entering data.
            Wiki members get awarded inventory space for every database change made. There is a private discord channel for the wiki team where features, update, and ideas are discussed. Wiki team members who go above an beyond often recieve high end cards or other sealed goodies.</p>

          <p class="mb-2">To join the the wiki team you need to first be involved in the community. Join the <nuxt-link to="/about/discord/">discord server</nuxt-link> to get started.</p>
          <hr />

          <h2 class="title is-size-4 mb-1">MTG CSV Importer</h2>
          <b-tag type="is-dark" >Open Source</b-tag> <b-tag type="is-info">Tyepscript</b-tag> <b-tag type="is-light">Javascript</b-tag> <b-tag type="is-light">JSON</b-tag>
          <p class="mb-2 mt-1">A Typescript codebase that reads CSV Files from other magic app exports. It reads the data. connects to EchoMTG data, and returns a JSON response that can be read for importing in EchoMTG. This functionality is featured in <a href="/apps/import/">The Import App</a> and it deploys to Google Clound Functions.</p>
          <p class="mb-2">Anyone may contribute to this project, join our <nuxt-link to="/about/discord/">discord server</nuxt-link> and check out the github codebase below.  </p>
          <p><b-icon size="is-small" icon="github" /> <strong>Github Codebase:</strong> <a target="_blank"  href="https://github.com/EchoMTG/mtg-csv-reader">https://github.com/EchoMTG/mtg-csv-reader</a></p>

        </div>
        <div class="column is-half">
          <h2 class="title is-size-4 mb-1">Website</h2>
          <b-tag type="is-dark">Open Source</b-tag> <b-tag type="is-success">Nuxt</b-tag> <b-tag type="is-success">VueJS</b-tag> <b-tag type="is-light">Javascript</b-tag> <b-tag type="is-light">HTML</b-tag> <b-tag type="is-light">CSS</b-tag>
          <p class="mb-2 mt-1">The primary interface of EchoMTG.com is the website. The project is built on Nuxt (VueJS) with a JSON api backend. This project automatically deploys on merge to Google Cloud Run.
          </p>
          <p class="mb-2">Anyone may contribute to this project, join the <nuxt-link to="/about/discord/">discord server</nuxt-link> and check out the github codebase linked below.  </p>
          <p><b-icon size="is-small" icon="github" /> <strong>Github Codebase:</strong> <a target="_blank" href="https://github.com/EchoMTG/website">https://github.com/EchoMTG/website</a></p>
          <hr />
          <h2 class="title is-size-4 mb-1">Andriod and iOS App</h2>
          <b-tag type="is-dark">Closed Source</b-tag> <b-tag type="is-info">React Native</b-tag> <b-tag type="is-light">React</b-tag> <b-tag type="is-light">Javascript</b-tag> <b-tag type="is-light">HTML</b-tag> <b-tag type="is-light">CSS</b-tag>
          <p class="mb-2 mt-1">A React Native code base that deploys to both Google Play and Apple App Stores. This code base is private, but contributors can be invited.</p>
          <p class="mb-2">Anyone may contribute to this project, join the <nuxt-link to="/about/discord/">discord server</nuxt-link> and reach out to the @wiki-team for info.  </p>
          <p><b-icon size="is-small" icon="github" /> <strong>Github Codebase:</strong> <a target="_blank" href="https://github.com/EchoMTG/EchoMTGMobile">https://github.com/EchoMTG/EchoMTGMobile</a></p>
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
