<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />

    <div class="content m-5 mb-0">
      <h1>Magic: the Gathering Card</h1>
      <p>Greetings, fellow Planeswalkers and enthusiasts of Magic: The Gathering! Within this interconnected web of knowledge, we gather to explore the intricate tapestry that is the world of Magic. Organized with precision and care, these web pages serve as portals to various dimensions of this beloved game.</p>
      <p>Magic: The Gathering is a renowned and captivating collectible card game (CCG) that has enthralled millions of players since its inception in 1993. Created by mathematician Richard Garfield and published by Wizards of the Coast, Magic combines strategic gameplay, intricate card interactions, and a rich fantasy world to offer a truly immersive experience. In Magic, players assume the roles of powerful Planeswalkers, capable of summoning creatures, casting spells, and wielding enchantments in their quest for victory.</p>
      <p>The game is played using a customizable deck of Magic cards, each representing a spell, creature, artifact, or other magical effect. Players engage in tactical battles, strategically deploying creatures and spells to reduce their opponents' life total from 20 to zero. The depth of gameplay arises from the vast variety of cards, each with distinct abilities, mechanics, and synergies. Magic offers an array of formats, ranging from casual play to competitive tournaments, accommodating a broad spectrum of player preferences and skill levels.</p>

As you traverse this interconnected network of Magic: The Gathering web pages, may you find inspiration, knowledge, and camaraderie among fellow Planeswalkers. With each click, you take a step closer to mastering the art of Magic, unraveling its mysteries, and forging unforgettable memories in a world where imagination knows no bounds.

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
          label: 'Magic: the Gathering',
          url: '/mtg/',
          icon: ''

        }
      ]
    },
    tools() { return [
        {
          name: `Magic Expansions`,
          description: `Magic the gathering sets, expansions, precon decks.`,
          icon: `cards`,
          url: `/mtg/sets/`
        },
        {
          name: `Magic Types`,
          description: `Magic the gathering cards grouped by type.`,
          icon: `format-list-bulleted-type`,
          url: `/mtg/types/`
        },
        {
          name: `Magic Groups`,
          description: `Specific groups for magic cards, like reserve list.`,
          icon: `lightbulb-group`,
          url: `/mtg/groups/`
        },
        {
          name: `Magic Speculations`,
          description: `Proprietary algorithm finds potentially high valuable cards are low costs.`,
          icon: `currency-usd`,
          url: `/mtg/speculations/`
        },
       {
          name: `Magic Spoilers`,
          description: `Preview unreleased magic cards about to enter the game.`,
          icon: `table-headers-eye`,
          url: `/mtg/spoilers/`
        },
        {
          name: `Magic Alters`,
          description: `A gallery of altered magic the gathering cards by artists`,
          icon: `brush`,
          url: `/mtg/alters/`
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
          title: `Magic: The Gathering - Explore Expansions, Card Types, and Values`,
          description: `Magic: The Gathering website that has pages for game expansions,card types and mechanics, and gain insights into card values and collecting. `
      }
    }
}
</script>
