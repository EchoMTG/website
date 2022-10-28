<template>
  <div class="is-relative">
    <section class="hero is-primary">
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

    <div class="has-background-light is-sticky">
      <div class="container ">
        <div class="columns">
              <div class="column is-two-thirds">
                <b-field
                  label="API Search">
                  <b-input
                        size="is-medium"
                        v-model="search"
                        icon-right="close-circle"
                        icon-right-clickable
                        @icon-right-click="clearSearch"
                        icon="magnify"
                        aria-placeholder="Search name, description, or url of EchoMTG's API"
                        placeholder="Search name, description, or url of EchoMTG's API" />

                </b-field>
              </div>
              <div class="column is-one-thirds">
                <b-field
                    label="Your API Token"
                    >
                  <b-input size="is-medium" v-model="api_token" />
                  </b-field>
              </div>
        </div>
      </div>
    </div>
    <div class="container content mt-5" v-if="search == ''">
        <div class="columns">
          <div class="column is-two-thirds">
            <h4>About the EchoMTG API</h4>
            <p>This API returns <a target="_blank" href="https://json.org">JSON</a> and is open to any EchoMTG user interested in writing custom scripts, apps, or integrations.
              The api system is uses EchoMTG identifiers (emid), a unique numeric ID given to every item in the EchoMTG database. Multiverse IDs were not used because Judge Foils and other promo cards do not have multiverseids.
              Two community API wrappers are available: <a href="https://github.com/andrewgioia/EchoPHP" target="_blank">PHP Wrapper</a> by Andrew Gioia and <a href="https://github.com/ardeay/EchoMTG-Java-API-Wrapper/" target="_blank">JAVA Wrapper for Android</a>.
              If you have any suggestions or questions please join the <a href="/about/discord">discord channel</a> and look for Teeg. </p>

          </div>
          <div class="column is-one-third is-hidden-mobile">
              <h4>API Tokens</h4>
              <p>Attain a token by <a href="/register/">Registering an Echo user</a>. When logged in your API token appear in these docs. API Tokens expire after 24 hours. New tokens are attained by <a href="#auth-retrieving-a-user-token">Authenticating</a>.
              If your application integration for Echo users needs permanent tokens, join <a href="/about/discord">discord </a> and ask for Teeg. </p>

             </div>
        </div>


    </div>


      <div v-for="(doc,index) in this.docs" v-bind:key="`doc${index}`" :id="getSubDocID(doc.name)">
        <div class="container mb-4" v-if="filterAPIDocs(doc.item) && filterAPIDocs(doc.item).length > 0 && search == ''" >
          <h2 class="title is-size-3 mb-2" >{{doc.name}}</h2>
          <div v-if="doc.description" v-html="$md.render(doc.description)"></div>
        </div>

        <div v-if="Array.isArray(doc.item) && doc.item.length > 0">
          <div
            v-for="(subdoc,index) in filterAPIDocs(doc.item)"
            v-bind:key="`docsub${index}`"
            :id="getSubDocID(subdoc.name)"
            :class="getEndpointClass(index)"
            >
            <div class="container">
              <h3 class="title is-size-4 mt-5 mb-3">
                <b-tag class="mr-3" v-if="subdoc.request" size="is-medium" type="is-dark">{{subdoc.request.method}}</b-tag>
                {{subdoc.name}}
                <a :href="`#${getSubDocID(subdoc.name)}`"><b-icon icon="link"></b-icon></a>
              </h3>
              <div class="columns">

                <div class="column is-half">
                  <api-description-tabs
                    :description="subdoc.request.description"
                    :response="subdoc.response"
                    :request="subdoc.request"
                    :token="api_token"
                    />
                </div>
                <div class="column is-half">
                  <b-field class="mt-2" :label="`URL ${subdoc.request.method} Endpoint`">
                    <b-input @mousedown="this.highlight(event)" :value="subdoc.request.url.raw" />
                  </b-field>
                  <b-field class="mt-2" :label="`Authentication Header`">
                    <b-input @mousedown="this.highlight(event)" :value="`Bearer ${api_token}`" />
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
      search: '',
      docs: [],
      api_token: ''
    }
  },
  props: {
    apidocs: {
      type: Array,
      default: function() {
        return APIDocs.item
      }
    }
  },
  mounted() {
    this.docs = [...this.apidocs]
    this.api_token = this.$cookies.get('token') ? this.$cookies.get('token'): '[LOGIN FOR API KEY]';
  },
  watch: {
    search() {
      //this.filterAPIDocs()
    }
  },
  asyncData({req}) {
    //console.log('async from index',req)
  },
  methods: {
    filterAPIDocs(items) {
      if(!Array.isArray(items)) return [];
      if(this.search == '') return items;
      return items.filter(it => {
        console.log(it)
        if(it.name.toLowerCase().includes(this.search.toLowerCase())) return true;
        if(it.request.description && it.request.description.toLowerCase().includes(this.search.toLowerCase())) return true;
        if(it.request.url.raw.includes(this.search.toLowerCase())) return true;
        return false;
      });
    },
    clearSearch() {
      this.search = ''
    },
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
