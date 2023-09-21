<template>
  <div>
    <div class="homepage">
      <div class="overlay"></div>


      <!-- <div class="pl-6 pt-6 pr-6 pb-0">

      </div> -->
      <div class="columns is-gapless">
        <div class="column is-7 ">
          <div class="pt-6 pl-6 pr-3">
            <div class="echo-header-text">
              <h1 class="title is-1 has-text-white has-text-weight-light">Data-Driven Trading Card Collection Tools</h1>
              <p class="subtitle has-text-grey-light has-shadow is-4">Free membership gives you access to digital binder collection tools, user-only pricing features, and community access.</p>
              <b-menu>
                <b-menu-list label="Tools you Need for Success">
                  <b-menu-item icon="email-outline" label="Weekly Email Reports"></b-menu-item>
                  <b-menu-item icon="upload-multiple" label="Daily Price Updates"></b-menu-item>
                  <b-menu-item icon="card-multiple-outline" label="Multiple Collection Apps"></b-menu-item>
                  <b-menu-item icon="briefcase-arrow-left-right-outline" label="Public Tradelist"></b-menu-item>
                  <b-menu-item icon="forum" label="Community Updates"></b-menu-item>

                </b-menu-list>
              </b-menu>

            </div>
          </div>

        </div>
        <div class="column is-5">
          <UserSignUpForm classes="mt-5 mr-5 signup-hero-background"  />
        </div>
      </div>
      <section class="py-6 has-background-black">
        <div class="level">

          <div class="level-item has-text-centered">
            <h3 class="title is-3 mb-0 has-text-weight-normal has-text-white"><span class="has-text-weight-bold">EchoMTG</span> is Proudly Tracking Over <span class="has-text-success has-text-weight-bold">${{millions}} Million</span> in Player Inventory</h3>
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
