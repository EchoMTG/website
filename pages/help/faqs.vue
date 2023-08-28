<template>
  <div>
    <nuxt keep-alive />
    <echo-bread-crumbs :data="crumbs" />

    <div class="columns ml-3 mt-3">
      <div class="column is-one-fifth">
        <help-sub-nav />
      </div>
      <div class="column is-four-fifths">
        <div class="container">
          <h1 class="title is-size-2">EchoMTG Frequently Asked Questions</h1>
          <b-input
            type="search"
            class="mb-5"
            icon="magnify"
            style="max-width: 500px"
            aria-placeholder="Search Frequently Asked Questions"
            placeholder="Search Frequently Asked Questions"
            v-model="search"
            icon-right="close-circle"
            icon-right-clickable
            @icon-right-click="clearIconClick"
            size="is-medium" />
          <b-field class="mb-5">
             <b-radio-button v-model="category"
                native-value=""
                type="is-light">

                <span>All FAQs</span>
            </b-radio-button>
            <b-radio-button v-model="category"
                native-value="inventory"
                type="is-light">
                <b-icon icon="book-open-page-variant-outline"></b-icon>
                <span>Inventory</span>
            </b-radio-button>

            <b-radio-button v-model="category"
                native-value="database"
                type="is-light">
                <b-icon icon="database"></b-icon>
                <span>Database</span>
            </b-radio-button>
            <b-radio-button v-model="category"
                native-value="list"
                type="is-light">
                <b-icon icon="format-list-checkbox"></b-icon>
                <span>Lists/Decks</span>
            </b-radio-button>
            <b-radio-button v-model="category"
                native-value="user"
                type="is-light">
                <b-icon icon="account"></b-icon>
                <span>My Account</span>
            </b-radio-button>
            <b-radio-button v-model="category"
                native-value="usd"
                type="is-light">
                <b-icon icon="credit-card"></b-icon>
                <span>Billing</span>
            </b-radio-button>


        </b-field>
          <div v-for="faq in faqsFiltered" v-bind:key="`faq${faq.id}`" class="notification has-background-light">
                  <div class="content">
                      <h3>
                          {{faq.question}} <strong class="is-pulled-right">{{faq.category}} </strong>
                      </h3>
                      <p v-html="faq.answer">

                      </p>
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
      helpNavPosition: 1,
      faqs: [],
      search: '',
      category: ''
    }
  },
  methods: {
    clearIconClick(){
      this.search = ''
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
    faqsFiltered(){
      let filteredResults = [...this.faqs];

      if(this.category != ''){
        filteredResults = filteredResults.filter(
          (faq) => (faq.category == this.category)
        )
      }

      if(this.search != ''){
        return filteredResults.filter(
          (faq) => (faq.question.includes(this.search.toLowerCase()) || faq.answer.includes(this.search.toLowerCase()) || faq.category.includes(this.search.toLowerCase()))
        )
      }
      return filteredResults
    }

  },
  async fetch(){
    const data = await this.$echomtg.getFAQs();
    this.faqs = data.data
  },
  head () {
    return {
        title: this.helpNav[this.helpNavPosition].label,
        description: this.helpNav[this.helpNavPosition].description
    }
  }
}
</script>
