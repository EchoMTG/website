<template>
  <div>
    <nuxt v-if="user?.user_level && parseInt(user.user_level) >= 3" keep-alive />
    <section class="hero is-info">
      <div class="hero-body">
          <div class="container">
              <h1 class="title">
                {{this.helpNav[this.helpNavPosition].label}}
              </h1>
              <h3 class="subtitle">
                {{this.helpNav[this.helpNavPosition].description}}
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
              <div class="column">
                <div v-if="!authenticated" class="message is-danger p-5 mb-4 is-flex">
                  <b-icon icon="alert" type="is-danger" />
                  <span class="ml-3">Please <nuxt-link to="/login/">login</nuxt-link> to submit a missing item report.</span>
                </div>
                <div class="message p-5">
                  <b-field label="Game or Brand" message="" >
                    <b-select size="is-small" v-model="game">
                      <option :value="1">Magic: the Gathering</option>
                      <option :value="71">Disney Lorcana</option>
                    </b-select>
                  </b-field>
                  <b-field
                    label="Card or Item"
                    message="Name of the missing product. A search will be conducted on right." >
                    <b-input size="is-small" required icon="text"  v-model="name" />
                  </b-field>
                  <b-field label="Set or Expansion" required message="Name of the product its included in. Ex. Innistrad or Commander Doctor Who" >
                    <b-input size="is-small" v-model="expansion" icon="text" />
                  </b-field>

                  <b-field label="Reference URL" required message="Paste Full URL from TCGplayer, eBay, Scryfall, or any reference with product data." >
                    <b-input size="is-small" v-model="referenceUrl" icon="text" />
                  </b-field>
                  <b-field label="Image URL" message="Full image URL" >
                    <b-input size="is-small" v-model="imageUrl" icon="text" />
                  </b-field>
                  <b-button type="is-primary" :disabled="isDisabled" icon-left="receipt-text-arrow-right-outline">Submit Missing item Report</b-button>


                </div>
              </div>
              <div class="column">
                <h3 v-if="searchResults.length > 0" class="title is-size-4">Is it one of these?</h3>
                <div class="columns is-multiline is-gapless">
                  <div v-for="item in searchResults" v-bind:key="item.emid" class="column is-flex is-one-third is-flex-direction-column	has-text-centered mb-2">
                    <nuxt-link class="message is-dark has-text-white is-full-width is-block" :to="item.url">
                      <p>{{item.name}}</p>
                      <NuxtImg width="100" :src="item.image" :alt="item.name" />
                      <div>
                        <p>
                        <span class="is-size-7">{{item.set}}</span>
                        </p>
                      </div>
                    </nuxt-link>
                  </div>
                </div>

            <b-loading :active="loading" />

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
  name: 'TrainingVideos',
  components: {
    EchoBreadCrumbs,
    FullAd,
    HelpSubNav
  },
  data () {
    return {
      helpNavPosition: 6,
      name: '',
      expansion: '',
      additionDetails: '',
      referenceUrl: '',
      game: 1,
      imageUrl: '',
      searchResults: [],
      loading: false,
      disabled: true,
    }
  },
  watch: {
    name() {
      this.search();
    }
  },
  methods: {
    async submit(){

    },
    async search(){
      this.loading = true;
      this.searchResults = await this.$echomtg.search(this.name);
      this.loading = false;

    }
  },
  computed: {
    isDisabled() {
      if(this.name !== '' && this.referenceUrl != '') return false;
      return true;
    },
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
