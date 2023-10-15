<template>
  <div>
    <nuxt v-if="user?.user_level && parseInt(user.user_level) >= 3" keep-alive />
    <section class="hero is-small is-info">
      <div class="hero-body">
          <div class="container">
              <h1 class="title is-size-4">
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
                <h3 class="title is-size-5 mb-2">Complete this form to Submit a Report</h3>
                <div v-if="!authenticated" class="message is-danger p-5 mb-4 is-flex">
                  <b-icon icon="alert" type="is-danger" />
                  <span class="ml-3">Please <nuxt-link to="/login/">login</nuxt-link> to submit a missing item report.</span>
                </div>
                <div class="message is-success p-5" v-if="submitted == true">
                  <p class="mb-2">Thank you, your report was submitted to the Wiki team on <nuxt-link :to="`/about/discord/`">discord</nuxt-link>. </p>

<code style="white-space: pre;" class="is-block p-5 has-background-black has-text-green mb-3">Game: {{ game }}
Name: {{ name }}
Expansion: {{ expansion }}
Reference URL: {{ referenceUrl }}
Image URL: {{ referenceUrl }}</code>
                  <b-button type="is-success" @click="resetForm" :disabled="isDisabled" icon-left="restart">Create Another Report</b-button>
                  <nuxt-link class="button is-info ml-2" :to="`/about/discord/`">Join Discord</nuxt-link>
                </div>
                <div class="message p-5" v-if="submitted == false">
                  <b-field custom-class="is-small" label="Game or Brand" message="" >
                    <b-select size="is-small" v-model="game">
                      <option >Magic: the Gathering</option>
                      <option >Disney Lorcana</option>
                    </b-select>
                  </b-field>
                  <b-field
                    custom-class="is-small"
                    label="Card or Item"
                    message="Name of the missing product. A search will be conducted on right." >
                    <b-input size="is-small" required icon="text"  v-model="name" />
                  </b-field>
                  <b-field custom-class="is-small" label="Set or Expansion" required message="Name of the product its included in. Ex. Innistrad or Commander Doctor Who" >
                    <b-input size="is-small" v-model="expansion" icon="text" />
                  </b-field>

                  <b-field custom-class="is-small" label="Reference URL" required message="Paste Full URL from TCGplayer, eBay, Scryfall, or any reference with product data." >
                    <b-input type="url" pattern="https://.*" size="is-small" v-model="referenceUrl" icon="link" />
                  </b-field>
                  <b-field custom-class="is-small" label="Image URL (optional)" message="Paste the full image URL" >
                    <b-input type="url" pattern="https://.*" size="is-small" v-model="imageUrl" icon="link" />
                  </b-field>
                  <b-button type="is-primary" @click="submit" :disabled="isDisabled" icon-left="receipt-text-arrow-right-outline">Submit Missing item Report</b-button>


                </div>
              </div>
              <div class="column is-relative">
                <h3 v-if="searchResults.length > 0" class="title is-size-5 mb-2">Is it one of these?</h3>
                <div class="columns is-multiline is-gapless">
                  <div v-for="item in searchResults" v-bind:key="item.emid" class="column  is-one-third ">
                    <div class="message is-dark has-text-white is-fullwidth p-2	 mb-2 mr-2">

                      <nuxt-link class="is-block is-flex is-flex-direction-column has-text-centered" :to="item.url">
                        <p class="is-size-7 ">{{item.name}}</p>
                        <NuxtImg width="100" :src="item.image" :alt="item.name" />

                        <p class="is-size-7">{{item.set}}</p>

                      </nuxt-link>
                    </div>
                  </div>
                </div>

                <b-loading  v-model="loading" :is-full-page="false" ></b-loading>

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
      game: 'Magic: the Gathering',
      imageUrl: '',
      searchResults: [],
      loading: false,
      disabled: true,
      timer: null,
      submitted: false,
    }
  },
  watch: {
    name() {
      if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
      }
      this.timer = setTimeout(async () => {
        this.search();
      },800);
    }
  },
  methods: {
    async submit(){

      const res = await this.$echomtg.wikiReportMissingItem({
        name: this.name,
        expansion: this.expansion,
        reference_url: this.referenceUrl,
        game: this.game,
        image: this.imageUrl,
        additional_details: this.additionDetails
      })

      this.$buefy.toast.open({message: res.message})
      this.submitted = true
    },
    resetForm(){
      this.name = ''
      this.referenceUrl = ''
      this.expansion = ''
      this.imageUrl = ''
      this.submitted = false
      this.searchResults = []
    },
    async search(){
      this.loading = true;
      this.searchResults = await this.$echomtg.search(this.name);
      this.loading = false;

    }
  },
  computed: {
    isDisabled() {
      if(this.name !== '' && this.referenceUrl != '' && this.expansion !== '') return false;
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
