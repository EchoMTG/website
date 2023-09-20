<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />

    <div class="content m-5 mb-0">
      <h1>Disney Lorcana</h1>
      <p>Disney Lorcana is a collectible card game (TCG) that features Disney characters in a magical world.
 The game is set in the world of Lorcana, which is a combination of the words "lore" and "arcana".</p>
 <p>Players take on the role of Illumineers and use magic ink to summon a team of Disney characters called glimmers.</p>
 <p>The game is expected to compete with other popular TCGs like Magic: The Gathering and the Pokémon Trading Card Game. </p>
<p>The game was released in late 2023 by Ravensburger in collaboration with The Walt Disney Company. The premier set, "The First Chapter", was released to board game stores on August 18, 2023. The game was released to major retailers on September 1, 2023. </p>
    </div>

    <div class="columns is-multiline m-3">
      <div class="column is-one-quarter" v-for="(tool,index) in tools" :key="`${tool.name}${index}`">
        <div class="card">

          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <b-icon :icon="tool.icon" />
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{tool.name}}</p>
              </div>
            </div>

            <div class="content">
              {{tool.description}}
            </div>
          </div>
          <footer class="card-footer">
            <a :href="tool.url" class="card-footer-item">View the {{tool.name}} Group</a>
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
      test: null,
    }
  },
  computed: {
    crumbs() {
      return [
        {
          label: 'Disney Lorcana',
          url: '/lorcana/',
          icon: ''

        }
      ]
    },
    tools() { return [
        {
          name: `Lorcana Sets and Expansions`,
          description: `Lorcana sets, expansions, promos.`,
          icon: `cards`,
          url: `/lorcana/sets/`
        },
        {
          name: `Lorcana Card Types`,
          description: `Lorcana cards grouped by type.`,
          icon: `format-list-bulleted-type`,
          url: `/lorcana/types/`
        },
        {
          name: `Lorcana Spoilers`,
          description: `Preview unreleased Disney Lorcana cards about to enter the game.`,
          icon: `table-headers-eye`,
          url: `/lorcana/spoilers/`
        }

      ]
    },
    ...mapState([
      'user',
      'authenticated'
    ])

  },
  head () {
      return {
          title: `Search Disney Lorcana: Prices and Card information for the Magical Collectible Card Game Lorcana`,
          description: `Search Disney Lorcana, a magical TCG in the world of Lorcana. Join Illumineers, summon Disney characters, and compete with TCG giants. Available now! `
      }
    }
}
</script>
