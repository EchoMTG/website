<template>
  <div class="homepage">
    <section class="section is-title-bar has-background-black">
      <div class="level">

        <div class="level-item has-text-centered">
          <h3 class="title is-3 mb-0 has-text-white">EchoMTG Proudly Tracks <span class="has-text-primary">${{millions}} Million</span> in Player Inventory</h3>
        </div>

      </div>
    </section>

    <tiles>
      <div class="card">
          <div class="cardContent m-3">
            <h2 class="title">
            Collection tracking focused on financials
            </h2>
          </div>
      </div>
      <div class="card">
          <div class="cardContent m-3">

              <h2 class="title">
              Appreciation calculated from price acquired
              </h2>

          </div>
      </div>
    </tiles>

  </div>
</template>

<script>
import Tiles from '@/components/Tiles'

export default {
  name: 'DefaultHomepage',
  data () {
    return {
      millions: 200
    }
  },
  components: {
      Tiles
    },
  props: {
    icon: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    hasClose: {
      type: Boolean,
      default: false
    }
  },
  methods: {
  }
}
</script>
