<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />

    <div class="content m-5 mb-0">
      <h1>Magic: the Gathering Card Speculations</h1>
      <p>EchoMTG algorithms searches the database for what is perceives could be great value pickups.</p>

    </div>

    <div class="columns is-multiline m-3">
      <div class="column is-one-quarter" v-for="(group,index) in groups" :key="`${group.name}${index}`">
        <div class="card">

          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <b-icon :icon="group.icon" />
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{group.name}}</p>
              </div>
            </div>

            <div class="content">
              {{group.seo_meta_description}}
            </div>
          </div>
          <footer class="card-footer">
            <a :href="`${group.slug}/`" class="card-footer-item">View the {{group.name}} Group</a>
          </footer>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue'
export default {
  name: 'Tools',
  components: {
    EchoBreadCrumbs
  },
  data () {
    return {
      groups: [],

    }
  },
  async fetch() {
    this.groups = (await this.$echomtg.getGroups(1,'spec')).items
  },
  computed: {
    ...mapState([
      'user',
      'authenticated'
    ]),
    crumbs() {
      return [
        {
          label: 'Magic: The Gathering',
          url: '/mtg/',
          icon: ''

        },
        {
          label: 'Speculations',
          url: '/mtg/speculations/',
          icon: ''

        }
      ]
    },
  },
  head () {
      return {
          title: `Magic Card Speculations`,
          description: `EchoMTG algorithms searches the database for what is perceives could be great value pickups.`
      }
    }
}
</script>
