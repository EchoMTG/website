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
          <h1 class="title is-size-2">Frequently Asked Questions</h1>
          <b-input type="search" class="mb-5" v-model="search" size="is-medium" />
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
      search: ''
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
      if(this.saerch != ''){
        return this.faqs.filter(
          (faq) => (faq.question.includes(this.search.toLowerCase()) || faq.answer.includes(this.search.toLowerCase()) || faq.category.includes(this.search.toLowerCase()))
        )
      }
      return this.faqs
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
