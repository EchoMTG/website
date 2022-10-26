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


          <p>This API is open to the app developers to access a centralized inventory system. The API gives any personal collector the ability to create custom apps, spreadsheets, or sales integrations. The api system is based around EchoMTG id (emid), which is a unique numeric ID given to every item in the EchoMTG database. It does not use Multiverse IDs since Judge Foils and other promo cards do not have multiverseids, their multiverseid's start at 100000000. If you have any suggestions here, please join the discord channel and look for Teeg.</p>

          </div>
          <div class="column is-two-thirds">
          <p><strong>PHP Wrapper</strong> by Andrew Gioia: <a href="https://github.com/andrewgioia/EchoPHP" target="_blank">https://github.com/andrewgioia/EchoPHP</a></p>
          <p><strong>JAVA Wrapper for Android</strong> <a href="https://github.com/ardeay/EchoMTG-Java-API-Wrapper/" target="_blank">https://github.com/ardeay/EchoMTG-Java-API-Wrapper/</a></p>

          <h2>Prerequisites</h2>
          <hr/>
            <p><strong>1.</strong> <a href="/register/">Register</a> a user with EchoMTG so that it can submit API requests.</p>
            <p><strong>2.</strong> Familiarize yourself with the core concepts of the JSON (JavaScript Object Notation) data format. For more information, see <a href="https://json.org">json.org</a>.</p>
          </div>
        </div>
    </div>
  <hr />
    <div class="container">
      <div v-for="(doc,index) in apidocs.item" v-bind:key="`doc${index}`">
        <h1>{{doc.name}}</h1>
        <div v-for="(subdoc,index) in doc.item" v-bind:key="`docsub${index}`">
          <h3>{{subdoc.name}} <b-tag v-if="subdoc.request">{{subdoc.request.method}}</b-tag></h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import APIDocs from '@/components/api/echomtg-api.102622'

export default {
  name: 'API',
  components: {
  },
  data () {
    return {
      apidocs: APIDocs
    }
  },
  asyncData({req}) {
    //console.log('async from index',req)
  },
  computed: {
    ...mapState([
      'userName'
    ])
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
