<template>
  <div>
    <nuxt keep-alive />
    <echo-bread-crumbs :data="crumbs" />

    <div class="columns ml-3 mt-3">
      <div class="column is-one-fifth">
        <help-sub-nav />
      </div>
      <div class="column is-four-fifths">
        <div class="container mr-3">
          <b-button
            type="is-success"
            class="is-pulled-right "
            @click="showCreateModal=true"
            v-if="parseInt(user.user_level) >= 3"
            icon-left="plus"
            size="is-large">
             <b-icon icon="wizard-hat"/> Wiki Create FAQ</b-button>
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
            <b-button type="is-danger" outlined size="is-small" icon-left="delete" @click="() => deleteFAQ(faq.id)" class="ml-2 is-pulled-right">
               Delete
            </b-button>
            <b-tag type="is-dark" class="is-pulled-right">{{faq.category}}</b-tag>
            <h3 class="title is-size-5 mb-2">{{faq.question}} </h3>
            <div class="content" v-html="faq.answer" />
          </div>
        </div>
      </div>

    </div>

    <b-modal v-model="showCreateModal">
      <div class="modal-card " style="width: auto">
          <header class="modal-card-head has-background-info">
            <p class="modal-card-title is-size-4 has-text-white"><b-icon icon="wizard-hat" /> Create new FAQ</p>
            <button
                type="button"
                class="delete"
                @click="$emit('close')"/>
          </header>


          <section class="modal-card-body">
            <b-field label="Category">
                  <b-select
                      v-model="createCategory">
                      <option value="inventory">Inventory</option>
                  </b-select>
              </b-field>

              <b-field label="Question">
                  <b-input
                      type="textarea"
                      v-model="createQuestion"
                      placeholder="User Question Here"
                      required>
                  </b-input>
              </b-field>

             <b-field label="Answer">
                  <b-input
                      type="textarea"
                      v-model="createAnswer"
                      placeholder="Question answer here"
                      required>
                  </b-input>
              </b-field>



          </section>
          <footer class="modal-card-foot">
              <b-button
                  label="Close"
                  @click="$emit('close')" />
              <b-button
                  @click="createFAQ"
                  icon-left="plus"
                  label="Create New FAQ"
                  type="is-success" />
          </footer>
      </div>
    </b-modal>
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
      category: '',
      showCreateModal: false,
      createQuestion: '',
      createAnswer: '',
      createCategory: 'inventory'
    }
  },
  methods: {
    clearIconClick(){
      this.search = ''
    },
    async editFAQ(id){
      const res = this.$echomtg.faqEdit(id,this.createQuestion,this.createAnswer,this.createCategory)

      this.$buefy.toast.open({
        message: res.message,
        type: 'is-success',
        queue: false
      })
      await this.$fetch()
    },
    async createFAQ(){
      const res = await this.$echomtg.faqCreate(this.createQuestion,this.createAnswer,this.createCategory)
      this.createQuestion = ''
      this.createAnswer = ''
      this.createCategory = 'inventory'
      this.showCreateModal = false
      this.$buefy.toast.open({
        message: res.message,
        type: 'is-success'
      })

      await this.$fetch()
    },
     async deleteFAQ(id){
      console.log(id)
      const res = await this.$echomtg.faqDelete(id)
      this.$buefy.toast.open({
        message: res.message,
        type: 'is-danger',
        queue: false
      })
      await this.$fetch()
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
