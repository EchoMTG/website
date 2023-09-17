<template>

  <div class="columns message is-info ml-3">
    <div class="column is-half content pl-3">
      <h3>Getting Started on Echo</h3>
			<p>Echo tracks your <nuxt-link to="/apps/inventory/">card collections</nuxt-link> and sends weekly financial reports.
      </p>
      <p>You can also build <nuxt-link to="/apps/lists/">lists</nuxt-link>, setup <nuxt-link to="/apps/trades/">trades</nuxt-link>, and create <nuxt-link to="/apps/watchlist/">watchlists</nuxt-link>.</p>


    </div>
    <div class="column is-half">
      <p class="mb-2"> <b-icon  size="is-small" icon="lightning-bolt" /><strong>Collection Tool Jump Links</strong></p>

      <b-button size="is-small" outlined @click="goto('/apps/inventory/')" icon-left="share"> My Inventory</b-button>
      <b-button size="is-small" outlined @click="goto('/apps/import/')" icon-left="share"> Import Tool</b-button>
      <b-button size="is-small" outlined @click="goto('/apps/watchlist/')" icon-left="share"> Watchlist</b-button>
      <b-button size="is-small" outlined @click="goto('/help/training-videos/')" icon-left="youtube"> How-to Videos</b-button>
      <br/><br/>
      <p  class="mb-2"> <b-icon size="is-small" icon="lightning-bolt" /> <strong>Card Market Jump Links</strong></p>

      <b-button size="is-small" outlined @click="goto('/mtg/sets/')" icon-left="share"> All MTG Sets</b-button>
      <b-button size="is-small" outlined @click="goto('/mtg/type/')" icon-left="share"> Explore Types</b-button>
      <b-button size="is-small" outlined @click="goto('/mtg/sets/woe/wilds-of-eldraine/')" icon-left="share"> Set View</b-button>
      <b-button size="is-small" outlined @click="goto('/mtg/items/polluted-delta/94321/')" icon-left="share"> Single Card</b-button>
    </div>
  </div>
</template>
<script>
export default{
  name: 'GettingStarted',
  methods: {
    goto(url) {
      this.$router.push({ path: url });
    }
  }
}
</script>

