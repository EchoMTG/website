<template>
  <div>
    <section class="hero is-primary mb-4">
      <div class="hero-body">
          <div class="container">
              <h1 class="title">
                  API Documentation for EchoMTG
              </h1>
              <h3 class="subtitle">
                  Magic: the Gathering API for EchoMTG Collection Tools
              </h3>
          </div>
      </div>
    </section>
    <div class="container content">
        <div class="columns">
          <div class="column is-two-thirds">
            <h4>About the API</h4>
            <p>This API is open to any EchoMTG user interested in writing custom scripts, apps, or integrations. The api system is based around EchoMTG id (emid), which is a unique numeric ID given to every item in the EchoMTG database. It does not use Multiverse IDs since Judge Foils and other promo cards do not have multiverseids, their multiverseid's start at 100000000. If you have any suggestions here, please join the discord channel and look for Teeg.</p>
            <h4>Prerequisites</h4>
            <p><strong>1.</strong> <a href="/register/">Register</a> a user with EchoMTG so that it can submit API requests.</p>
            <p><strong>2.</strong> Familiarize yourself with the core concepts of the JSON (JavaScript Object Notation) data format. For more information, see <a href="https://json.org">json.org</a>.</p>

          </div>
          <div class="column is-one-third">
              <h4>Community API Wrappers</h4>
              <p><strong>PHP Wrapper</strong> by Andrew Gioia: <a href="https://github.com/andrewgioia/EchoPHP" target="_blank">https://github.com/andrewgioia/EchoPHP</a></p>
              <p><strong>JAVA Wrapper for Android</strong> <a href="https://github.com/ardeay/EchoMTG-Java-API-Wrapper/" target="_blank">https://github.com/ardeay/EchoMTG-Java-API-Wrapper/</a></p>

             </div>
        </div>
    </div>
  <hr />
  <div class="container">
    <b-input size="is-medium" v-model="search" aria-placeholder="search API endpoint" placeholder="Search API Endpoints" />
  </div>
  <hr />

      <div v-for="(doc,index) in filteredAPIDocs" v-bind:key="`doc${index}`" :id="getSubDocID(doc.name)">
        <div class="container mb-4">
          <h1 class="title is-size-3" >{{doc.name}}</h1>
          <div v-if="doc.description" v-html="$md.render(doc.description)"></div>
        </div>


        <div
          v-for="(subdoc,index) in doc.item"
          v-bind:key="`docsub${index}`"
          :id="getSubDocID(subdoc.name)"
          :class="getEndpointClass(index)"
          >
          <div class="container">
            <h3 class="title is-size-4 mt-5">
              <b-tag v-if="subdoc.request" type="is-dark">{{subdoc.request.method}}</b-tag>
              {{subdoc.name}}
              <a :href="`#${getSubDocID(subdoc.name)}`"><b-icon icon="link"></b-icon></a>
            </h3>
            <div class="columns">

              <div class="column is-half">
                <api-description-tabs :description="subdoc.request.description" :response="subdoc.response" />

              </div>
              <div class="column is-half">
                <b-field class="mt-2" :label="`URL ${subdoc.request.method} Endpoint`">
                  <b-input @mousedown="this.highlight(event)" :value="subdoc.request.url.raw" />
                </b-field>
                <div v-if="subdoc.request.body && subdoc.request.body.raw !== undefined">
                  <b-field  v-if="subdoc.request.body.raw" :label="`Example ${subdoc.request.method} Body`">
                    <b-input
                      type="textarea"
                      rows="8"
                      placeholder="Maxlength automatically counts characters"
                      :value="subdoc.request.body.raw"
                      />
                  </b-field>
                </div>

              </div>

            </div>
          </div>
        </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import APIDocs from '@/components/api/echomtg-api.102622'
import ApiDescriptionTabs from '@/components/api/ApiDescriptionTabs.vue'

export default {
  name: 'API',
  components: {
    ApiDescriptionTabs
  },
  data () {
    return {
      apidocs: APIDocs,
      search: ''
    }
  },
  watch: {
    search() {
      console.log(this.search)
    }
  },
  asyncData({req}) {
    //console.log('async from index',req)
  },
  computed: {
    filteredAPIDocs() {
      var docs = [...this.apidocs.item]
      var s = this.search.toLowerCase();
      console.log('filtering',docs,this.apidocs.item)
      this.apidocs.item.map((doc,index) => {
        console.log('search',s,index, doc)
        docs[index].item = [...doc.item].filter(it => it.name.includes(s))

      })

      return docs
    }
  },
  methods: {
    getSubDocID(name) {
      return name.toLowerCase().replace(/(\s|'|:|\(|\))/gi,'-').replace('--','-').replace(/-$/,'')
    },
    highlight(event){
      console.log(event)
      // this.value.select()

    },
    getEndpointClass(i){
      let bg = (i % 2 == 0) ? 'has-background-light' : '';
      return `pb-6 pt-4 ${bg}`;
    }
  },
  head () {
      return {
          title: `Magic:the Gathering API for Collectors`,
          meta: [
            { hid: 'og:image', property: 'og:image', content: `https://assets.echomtg.com/images/echomtg-og-default.png?1` },
            {
              hid: 'description',
              name: 'description',
              content:  `An API to power a suite of Financial oriented Collection tools and Pricing information for Magic:the Gathering Players and Store Owners`
            }
          ]

      }
    }
}
</script>
