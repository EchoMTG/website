<template>
  <div>
    <div class="homepage">
      <div class="overlay"></div>


      <!-- <div class="pl-6 pt-6 pr-6 pb-0">

      </div> -->
      <div class="columns is-gapless">
        <div class="column is-7 ">
          <div class="pt-5 pl-5 pr-3 ">
            <div class="echo-header-text">
              <h1 class="title  has-text-white has-text-weight-light is-size-1-tablet is-size-3-mobile">Data-Driven Trading Card Collection Tools by EchoMTG</h1>
              <p class="subtitle has-text-grey-light has-shadow is-size-4-tablet is-size-6-mobile">Free membership starts with collection tools, user-only pricing, and weekly asset tracking. It makes collecting fun!</p>
              <div class="columns is-mobile">
                  <div class="column">
                    <p class="has-text-white"><b-icon class="mr-2" icon="email-outline"/>Weekly Email Reports</p>
                    <p class="has-text-white"><b-icon class="mr-2" icon="card-multiple-outline"/>Multiple Apps</p>
                    <p class="has-text-white"><b-icon class="mr-2" icon="comment-text-multiple-outline"/>TCG Community</p>
                  </div>
                  <div class="column">
                    <p class="has-text-white"><b-icon class="mr-2" icon="upload-multiple"/> Daily Price Updates</p>
                    <p class="has-text-white"><b-icon class="mr-2" icon="chart-areaspline"/> Asset Tracking</p>
                    <p class="has-text-white"><b-icon class="mr-2" icon="handshake"/>Public Tradelist</p>
                  </div>
              </div>

            </div>
          </div>
        </div>
        <div class="column is-5">
          <UserSignUpForm classes="mt-5  signup-hero-background"  />
        </div>
      </div>
      <section class="py-3 has-background-black">
        <div class="level">

          <div class="level-item has-text-centered">
            <h3 class="title is-size-3-tablet is-size-4-mobile mb-0 has-text-weight-normal has-text-white"><span class="has-text-weight-bold">EchoMTG</span> is Proudly Tracking Over <span class="has-text-success has-text-weight-bold">${{millions}} Million</span> in Player Inventory</h3>
          </div>

        </div>
      </section>
    </div>
    <div class="container mt-4">
      <tiles>
        <promotion-card-widget
          image="https://assets.echomtg.com/images/product/collection-app-2023.png"
          class="tile is-child"
          title="Collection Tracking"
          icon="chart-areaspline"
          type="black"
          description="Financial Focused Tracking" />
        <promotion-card-widget
          image="https://assets.echomtg.com/images/product/dashboard-2023.png"
          class="tile is-child"
          title="Multiple Apps"
          icon="tools"
          type="info"
          description="Lists, Decks, Watchlists and many more" />
        <promotion-card-widget
          image="https://assets.echomtg.com/images/product/card-page-2023.png"
          class="tile is-child"
          title="Real-Time Pricing"
          icon="currency-usd"
          type="success"
          description="Charts, 7-day Gain/Loss Calculations" />
        <promotion-card-widget
          image="https://assets.echomtg.com/images/product/earnings-app-2023.png"
          class="tile is-child"
          title="Emailed Reports"
          icon="email-outline"
          type="danger"
          description="Weekly Automated Assessment Emails" />

      </tiles>
    </div>


  </div>

</template>
<style scoped>
.echo-header-text{
  text-shadow: 0 0 4px black, 0 0 10px black,0 0 30px black;
}
</style>
<script>
import Tiles from '@/components/Tiles'
import PromotionCardWidget from '@/components/marketing/PromotionCardWidget'
import UserSignUpForm from '@/components/user/UserSignUpForm'
import FooterBar from './FooterBar.vue'

export default {
  name: 'DefaultHomepage',
  data () {
    return {
      millions: 560
    }
  },
  components: {
      Tiles,
      UserSignUpForm,
      PromotionCardWidget,
      FooterBar
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
