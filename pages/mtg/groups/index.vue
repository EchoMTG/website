<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />

    <div class="content m-5 mb-0">
      <h1>Magic: the Gathering Card Groups</h1>
      <p>EchoMTG groups together cards for easy viewing.</p>

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
    this.groups = (await this.$echomtg.getGroups(1)).items
  },
  computed: {
    crumbs() {
      return [
        {
          label: 'Magic: The Gathering',
          url: '/mtg/',
          icon: ''

        },
        {
          label: 'Groups',
          url: '/mtg/groups/',
          icon: ''

        }
      ]
    },
    tools() { return [
        {
          name: `Magic Reserve List`,
          description: `Card that can't be reprinted.`,
          icon: `animation`,
          url: `/mtg/groups/magic-reserve-list`
        },
        {
          name: `Magic Power 9`,
          description: `Infamous 9 cards from the Alpha set`,
          icon: `animation`,
          url: `/mtg/groups/power-9-magic-the-gathering`
        },

      ]
    }

  },
  head () {
      return {
          title: `Grouping of popular Magic the Gathering card`,
          description: `A suite of Financial oriented Collection tools and Pricing information for Magic:the Gathering Players and Store Owners`
      }
    }
}
</script>
