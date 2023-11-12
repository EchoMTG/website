<template>
  <b-steps
    v-model="activeStep"
    :animated="true"
    :rounded="true"
    :has-navigation="true"
    icon-prev="arrow-left"
    icon-next="arrow-right"
    label-position="center"
    mobile-mode="minimalist">
    <b-step-item step="1" label="Welcome" :clickable="isStepsClickable">
        <div class="content">
          <h1 class="title has-text-centered">Welcome {{user.username}}!</h1>
          <p>EchoMTG is a trading card collection app specialized in magic the gathering</p>
          <ul>
            <li>Track your Collection</li>
            <li>Build and Share Decks</li>
            <li>Share trade list</li>
            <li>Get price alerts</li>
            <li>Monitor Expansion Collections</li>
          </ul>
          <p>EchoMTG has Lorcana and plans to add Flesh and Blood and other games.</p>
        </div>
    </b-step-item>

    <b-step-item step="2" label="Profile" :clickable="isStepsClickable" :type="{'is-success': isProfileSuccess}">
        <div class="content">
          <h1 class="title has-text-centered">Managing your Collection</h1>
          <p>Look for Inventory Add Buttons on set, deck, and card pages and search boxes. They like this:</p>
          <div :class="(isDarkModeActive == 1 ? 'has-background-black' : '') + ` box p-2 is-flex`">
            <img width="120" style="border-radius: 10px" src="https://assets.echomtg.com/magic/cards/original/104141.jpg" />
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

          </div>
          <p>Try adding one of these cards to your collection. and add a collasal dreadmore to your collection!</p>
          <p>Once cards are added, you'll get reports and can track collection progress on decks and set lists</p>



        </div>
    </b-step-item>
    <b-step-item step="3" label="Weekly Reports" :clickable="isStepsClickable">

          <div class="content">
          <h1 class="title has-text-centered">Weekly Reports &amp; Plans</h1>
          <p>Every Sunday you will get a collection report telling you how much your collection is worth, and what cards are gaining and losing value.</p>
          <p>Free Accounts start with 360 collection slots, 25 Decks, and 100 trades. Premium accounts get access to additional storage, automated reports, earning apps, collection insights, and more</p>
          <p>We dont sell your information or use display ads, development is 100% supported by subscription members. Please consider a sub if you enjoy the website.</p>
          </div>
    </b-step-item>

    <b-step-item step="4" label="Social and Profile" :clickable="isStepsClickable">

        <div class="content">
          <h1 class="title has-text-centered">Public Profile</h1>
          <p>Every EchoMTG user has a public profile where decks, trades, articles, and alters can be shared. You can upload your avatar and change your backgroud image under edit profile</p>
          <p>We have a discord channel too <a target="_blank" href="https://discord.gg/f6VFybb">Click to Join</a></p>
        </div>
    </b-step-item>

    <b-step-item step="5" label="Get Started" :clickable="isStepsClickable" disabled>
    <div class="content">
      <h1 class="title has-text-centered">Getting Started</h1>

      <b-button size="is-small" outlined @click="goto('/apps/inventory/')" icon-left="share"> View Mu Collection</b-button>
      <b-button size="is-small" outlined @click="goto('/apps/import/')" icon-left="share"> Import Collection from Another Site</b-button>
      <b-button size="is-small" outlined @click="goto('/apps/watchlist/')" icon-left="share"> Watchlist</b-button>
      <b-button size="is-small" outlined @click="goto('/help/training-videos/')" icon-left="youtube"> How-to Videos</b-button>
      <br/><br/>
      <p  class="mb-2"> <b-icon size="is-small" icon="lightning-bolt" /> <strong>Card Market Jump Links</strong></p>

      <b-button size="is-small" outlined @click="goto('/mtg/sets/')" icon-left="share"> All MTG Sets</b-button>
      <b-button size="is-small" outlined @click="goto('/mtg/type/')" icon-left="share"> Explore Types</b-button>
      <b-button size="is-small" outlined @click="goto('/mtg/sets/woe/wilds-of-eldraine/')" icon-left="share"> Set View</b-button>
      <b-button size="is-small" outlined @click="goto('/mtg/items/polluted-delta/94321/')" icon-left="share"> Single Card</b-button>
                 </div>
    </b-step-item>

    <template
        v-if="customNavigation"
        #navigation="{previous, next}">
        <b-button
            outlined
            type="is-danger"
            icon-pack="fas"
            icon-left="backward"
            :disabled="previous.disabled"
            @click.prevent="previous.action">
            Previous
        </b-button>
        <b-button
            outlined
            type="is-success"
            icon-pack="fas"
            icon-right="forward"
            :disabled="next.disabled"
            @click.prevent="next.action">
            Next
        </b-button>
    </template>
  </b-steps>
</template>


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
      alert('yay')
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

      const swipeLength = 12;

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
      totalSteps: 5,
      isStepsClickable: true
    }
  }
}
</script>
