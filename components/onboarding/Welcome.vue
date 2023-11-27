<template>
  <div style="height: 92vh" :class="`container py-4 ` + (isDarkModeActive == 1 ? `` :``)">
    <b-steps
      v-model="activeStep"
      :animated="true"
      :rounded="true"
      :has-navigation="true"
      icon-prev="arrow-left"
      icon-next="arrow-right"
      label-position="center"
      mobile-mode="minimalist">
      <b-step-item step="1" label="Welcome to EchoMTG">

          <div class="content is-block">
            <h1 v-if="$device.isDesktop" class="title has-text-centered">Welcome {{user.username}}!</h1>
            <p>Welcome to <strong>Echo</strong>, a community of collectors and players revolving around a collection app built by an <strong>avid collector like you.</strong></p><p><strong>Echo focuses on:</strong></p>
            <ul>
              <li>Financial based collection tracking</li>
              <li>Community growth and feedback</li>
              <li>Tools for deck building and sharing</li>
              <li>Trade curation and browsing</li>
              <li>Weekly and/or daily price alerts</li>
              <li>Expansion/set collection measurement</li>
            </ul>
          </div>
          <div class="aboutecho is-block mt-auto">

            <b-image
              alt="Track set collections"
              src="https://assets.echomtg.com/interface/onboarding/percentage-completed-inventory.jpg"
              />
          </div>

      </b-step-item>

      <b-step-item step="2" label="Collection Management">

        <div class="content is-block">
          <h1 v-if="$device.isDesktop" class="title has-text-centered">Managing your Collection</h1>
          <p>Track your Collection by clicking
            <b-tag type="is-white" class="has-background-white">

              <b-icon type="is-dark" icon="book-open-page-variant-outline" size="is-small" />
              <b-icon type="is-dark" icon="plus" size="is-small" />
            </b-tag>
            buttons you'll find on set, deck, card pages, and search boxes. Try it on these cards:
          </p>
        </div>
        <div :class="(isDarkModeActive == 1 ? 'has-background-black' : '') + ` is-flex is-flex-direction-column`">
            <div>
              <quick-add-button
                  :callback="updateQuickStats"
                  :foil="0"
                  :emid="104141" />
              <quick-add-button
                  :callback="updateQuickStats"
                  :foil="1"
                  :emid="104141" />
            </div>
            <div>
              <img width="120" style="border-radius: 10px" src="https://assets.echomtg.com/magic/cards/original/104141.jpg" />
            </div>

        </div>
        <div class="aboutecho mt-auto">
          <b-image src="https://assets.echomtg.com/interface/onboarding/deck-building-collection-matching.jpg" />
        </div>
      </b-step-item>
      <b-step-item step="3" label="Weekly Reports &amp; Subs">

            <div class="content">
              <h1 v-if="$device.isDesktop" class="title has-text-centered">Weekly Reports &amp; Plans</h1>
              <p>Each Sunday <strong>echo</strong> sends an email report with <strong>your collection value</strong> and <strong>which of your cards</strong> are trending up or down in the secondary market <b-icon type="is-success" icon="trending-up" size="is-small" /></p>

              <p><strong>Your info isn't sold, we don't use ads.</strong> <strong class="has-text-success">Echo is 100% supported by the community.</strong> Subbed members gain additional storage, automated reports, specialized apps, data insights, and more..</p>
              <p><b-icon type="is-warning" icon="chart-areaspline" size="is-small" /> <strong>Reports are based upon your collection tracked on Echo.</strong> Free Accounts start with 360 collection storage, 25 Decks, and 100 trade slots.</p>
            </div>
            <b-image src="https://assets.echomtg.com/interface/onboarding/weekly-email-reports.jpg" />
      </b-step-item>

      <b-step-item step="4" label="Social and Profile">

          <div class="content">
            <h1 v-if="$device.isDesktop" class="title has-text-centered">Public Profile</h1>
            <p><strong>As an echo community user</strong> you gain a public profile to share decks, trades, articles and alters, and to recieve comments. <strong>Upload your avatar and personalize your page</strong> when editing your profile</p>
            <p>To join an active Discord channel, <a target="_blank" href="https://discord.gg/f6VFybb"><b-icon size="is-small" icon="comment-multiple" /> click here.</a></p>
          </div>
          <div class="aboutecho mt-auto">
            <b-image alt="About EchoMTG Collection Tracking" src="https://assets.echomtg.com/interface/onboarding/public-profiles.jpg" />
          </div>
      </b-step-item>

      <b-step-item step="5" label="Get Started" disabled>
      <div class="content">
        <h1  v-if="$device.isDesktop" class="title has-text-centered">Getting Started</h1>
        <p>Add or import 5 cards to turn off this welcome walkthrough and gain access to <strong>your user dashboard</strong> and <strong>edit your profile</strong>.</p>
        <p><strong>Quick Start Links</strong></p>
        <b-button size="is-small" outlined @click="goto('/apps/import/')" icon-left="download-box-outline"> Import a Collection</b-button>
        <b-button size="is-small" outlined @click="goto('/mtg/sets/')" icon-left="share">Browse MTG Sets</b-button>

        <br/><br/>

        <b-button size="is-small" outlined @click="goto('/help/training-videos/')" icon-left="youtube"> How-to Videos</b-button>

        <b-button size="is-small" outlined @click="goto('/mtg/types/')" icon-left="share"> Explore Types</b-button>
         <br/><br/>
         <b-button size="is-small" outlined @click="goto('/apps/inventory/')" icon-left="book-open-page-variant-outline"> Open Collection/Inventory</b-button>

      </div>
        <div class="aboutecho mt-auto">
          <b-image alt="Additional features, storage, and app for subscribers" src="https://assets.echomtg.com/interface/onboarding/premium-ad.jpg" />
        </div>
      </b-step-item>

      <template
          #navigation="{previous, next}">
          <div class="is-flex mb-5 ">
            <b-button

                type="is-dark"
                class="is-fullwidth mr-2 ml-5"
                :icon-left="$device.isDesktop ? `arrow-left-bold` : `gesture-swipe-left`"
                :disabled="previous.disabled"
                @click.prevent="previous.action">
                 <span v-if="$device.isDesktop">
                  Arrow Left
                </span>
                <span v-else>
                  Swipe Left
                </span>
            </b-button>
            <b-button

                type="is-primary"
                class="is-fullwidth ml-2 mr-5"
                :icon-right="$device.isDesktop ? `arrow-right-bold` : `gesture-swipe-right`"
                :disabled="next.disabled"
                @click.prevent="next.action">
                <span v-if="$device.isDesktop">
                  Arrow Right
                </span>
                <span v-else>
                  Swipe Right
                </span>

            </b-button>
          </div>
      </template>
    </b-steps>
  </div>
</template>
<style scoped>
.b-steps{
  display: flex;
  height: 100%;
  flex-direction: column;
}

.b-steps .step-content > div{
  height: 100% !important;
}
.step-item{
  height: 100% !important;
  display: flex;
  flex-direction: column;
}
</style>

<script>
import { mapState } from 'vuex';
import QuickAddButton from '@/components/inventory/QuickAddButton.vue'


export default {
  name: 'Welcome',
  components: {
    QuickAddButton
  },
  computed: {
    ...mapState(['user','isDarkModeActive','quickstats'])
  },
  mounted(){
    document.addEventListener("keydown", this.keybinds);
    document.addEventListener('touchstart', this.handleTouchStart, false);
    document.addEventListener('touchmove', this.handleTouchMove, false);
  },
  destroyed(){
    document.removeEventListener("keydown", this.keybinds)
    document.removeEventListener('touchstart', this.handleTouchStart);
    document.removeEventListener('touchmove', this.handleTouchMove);
  },
  methods: {
    goto(url) {
      this.$router.push({ path: url });
    },
    updateQuickStats() {

    },
    nextItem(){
      if(this.activeStep < this.totalSteps){
        this.activeStep = this.activeStep + 1;
      }
    },
    previousItem(){
       if(this.activeStep > 0){
        this.activeStep = this.activeStep - 1;
      }

    },
    keybinds(event){
      // left
      if (event.isComposing || event.keyCode === 37) {
          this.previousItem();
          return true;
      }
      // right
      if (event.isComposing || event.keyCode === 39) {
          this.nextItem();
          return true;
      }
      // up
      if (event.isComposing || event.keyCode === 40) {
          this.variationPrevious();
          return true;
      }
      // down
      if (event.isComposing || event.keyCode === 38) {
          this.variationNext();
          return true;
      }
    },
    handleTouchMove(evt) {
      if ( ! this.xDown || ! this.yDown ) {
          return;
      }

      const swipeLength = 4;

      var xUp = evt.touches[0].clientX;
      var yUp = evt.touches[0].clientY;

      var xDiff = this.xDown - xUp;
      var yDiff = this.yDown - yUp;

      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
          if ( xDiff > swipeLength ) {
              this.nextItem(); // left
          } else if (xDiff < (swipeLength * -1) ) {
             this.previousItem(); // right
          }
      } else {
          if ( yDiff > swipeLength ) {
             // this.nextItem(); // up
          } else if (yDiff < (swipeLength * -1) ) {
              //this.previousItem(); // down
          }
      }
      /* reset values */
      this.xDown = null;
      this.yDown = null;
    },
    getTouches(evt) {
      return evt.touches ||             // browser API
            evt.originalEvent.touches; // jQuery
    },
    handleTouchStart(evt) {
        const firstTouch = this.getTouches(evt)[0];
        this.xDown = firstTouch.clientX;
        this.yDown = firstTouch.clientY;
    }
  },
  data: () => {
    return {
      xDown: null,
      yDown: null,
      activeStep: 0,
      totalSteps: 5
    }
  }
}
</script>
