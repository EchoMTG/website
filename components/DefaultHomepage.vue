<template>
  <div class="homepage">
    <section class="section is-title-bar has-background-black">
      <div class="level">

        <div class="level-item has-text-centered">
          <h3 class="title is-3 mb-0 has-text-white">EchoMTG Proudly Tracks <span class="has-text-primary">${{millions}} Million</span> in Player Inventory</h3>
        </div>

      </div>
    </section>
    <div class="columns">
      <div class="column is-7 p-6">
        <h1 class="title is-1 has-text-white">Start getting weekly updates on your Magic the Gathering collection!</h1>
        <p class="subtitle has-text-grey-lighter has-shadow is-4">Free membership gives you access to digital binder collection tools and user-only pricing features.</p>
      </div>
      <div class="column is-5">

        <UserSignUpForm  class="mt-6" />
      </div>
    </div>
    <tiles>
      <div class="card">
          <div class="cardContent m-3">
            <h2 class="title">
            Collection tracking focused on financials!
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
import UserSignUpForm from './blocks/UserSignUpForm'

export default {
  name: 'DefaultHomepage',
  data () {
    return {
      millions: 200
    }
  },
  components: {
      Tiles,
      UserSignUpForm
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
