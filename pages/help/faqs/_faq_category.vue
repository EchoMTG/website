<template>
  <div>
    <nuxt keep-alive />
    <section class="hero is-small is-info">
      <div class="hero-body">
          <div class="container">
              <h1 class="title is-size-4">
                FAQs
              </h1>
              <h3 class="subtitle">
                EchoMTG Frequently Asked Questions
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
          <div class="container mr-3">
            <b-button
              type="is-success"
              class="is-pulled-right "
              @click="showCreateModal=true"
              v-if="parseInt(user.user_level) >= 3"
              icon-left="plus"
              size="is-large">
              <b-icon icon="wizard-hat"/> Wiki Create FAQ</b-button>


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
                  <b-icon icon="currency-usd"></b-icon>
                  <span>Pricing</span>
              </b-radio-button>


          </b-field>
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
            <div v-for="faq in faqsFiltered" v-bind:key="`faq${faq.id}`" class="notification has-background-light is-relative">
              <span :id="makeFAQSlug(faq.question)" style="position: absolute; top: -70px"></span>
              <b-button v-if="parseInt(user.user_level) >= 3" type="is-info" outlined size="is-small" icon-left="pencil" @click="() => openEditModal(faq)" class="ml-2 is-pulled-right">
                Edit
              </b-button>

              <b-button v-if="parseInt(user.user_level) >= 3" type="is-danger" outlined size="is-small" icon-left="delete" @click="() => deleteFAQ(faq.id)" class="ml-2 is-pulled-right">
                Delete
              </b-button>



              <h3  class="title is-size-5 mb-2">{{faq.question}} <nuxt-link :to="{ path: path, hash:`#${makeFAQSlug(faq.question)}`}"> <b-icon type="is-info" icon="link"></b-icon></nuxt-link></h3>

              <div class="content mb-2" v-html="faq.answer" />

              <b-tag type="is-white" size="is-small">{{faq.category}}</b-tag>
            </div>
          </div>
        </div>

      </div>
    </div>

    <b-modal v-model="showEditModal">
      <div class="modal-card " style="width: auto">
          <header class="modal-card-head has-background-info">
            <p class="modal-card-title is-size-4 has-text-white"><b-icon icon="wizard-hat" /> Edit FAQ</p>
            <button
                type="button"
                class="delete"
                @click="showEditModal = false"/>
          </header>

          <section class="modal-card-body">
            <b-field label="Category">
                  <b-select
                      v-model="editItem.category">
                      <option value="inventory">Inventory</option>
                      <option value="usd">Billing</option>
                      <option value="user">My Account</option>
                      <option value="list">List/Decks</option>
                  </b-select>
              </b-field>

              <b-field label="Question">
                  <b-input
                      type="textarea"
                      v-model="editItem.question"
                      placeholder="User Question Here"
                      required>
                  </b-input>
              </b-field>

             <b-field label="Answer">
                  <b-input
                      type="textarea"
                      v-model="editItem.answer"
                      placeholder="Question answer here"
                      required>
                  </b-input>
              </b-field>



          </section>
          <footer class="modal-card-foot">
              <b-button
                  label="Close"
                  @click="showEditModal = false" />
              <b-button
                  @click="editFAQ"
                  icon-left="plus"
                  label="Update FAQ"
                  type="is-info" />
          </footer>
      </div>
    </b-modal>

    <b-modal v-model="showCreateModal">
      <div class="modal-card " style="width: auto">
          <header class="modal-card-head has-background-success">
            <p class="modal-card-title is-size-4 has-text-white"><b-icon icon="wizard-hat" /> Create new FAQ</p>
            <button
                type="button"
                class="delete"
                @click="showCreateModal = false"/>
          </header>

          <section class="modal-card-body">
            <b-field label="Category">
                  <b-select
                      v-model="createCategory">
                      <option value="inventory">Inventory</option>
                      <option value="usd">Billing</option>
                      <option value="user">My Account</option>
                      <option value="list">List/Decks</option>
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
                  @click="showCreateModal = false" />
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
      createCategory: 'inventory',
      showEditModal: false,
      editItem: {}
    }
  },
  watch: {
    category() {
      this.changeCategory()
    }
  },
  methods: {
    changeCategory() {
      if(this.category == ''){
        this.$router.push('/help/faqs/');
      } else {
        this.$router.push('/help/faqs/' + this.category + '/');
      }
    },
    clearIconClick(){
      this.search = ''
    },
    async editFAQ(){
      const res = this.$echomtg.faqEdit(this.editItem.id,this.editItem.question,this.editItem.answer,this.editItem.category)
      this.showEditModal = false;
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
      const res = await this.$echomtg.faqDelete(id)
      this.$buefy.toast.open({
        message: res.message,
        type: 'is-danger',
        queue: false
      })
      await this.$fetch()
    },
    openEditModal(item){
      this.editItem = item
      this.showEditModal = true
    },
    makeFAQSlug(question){

      return question.toLowerCase().replace(/(\s|'|:|\(|\))/gi,'-').replace('--','-').replace(/-$/,'').substring(0,50)
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
    path(){
      return this.$nuxt.$route.path
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
    if(this.$route.params['faq_category']){
      this.category = this.$route.params['faq_category'];
    }
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
