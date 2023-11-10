<template>
  <b-tooltip position="is-bottom" :multilined="true" label="Clicking links to various merchants on this site and making a purchase can result in this site earning a commission. Affiliate programs include, but are not limited to, the eBay Partner Network, TCGplayer.com, CardKingdom.com.">
    <strong class="has-text-grey mr-1"><b-icon size="is-small" icon="help-circle-outline"  />{{text}}</strong>
  </b-tooltip>
</template>
<script>
export default {
  name: 'AffiliateOverlayDisclaimer',
  props: {
    text: {
      type: String,
      default: 'affiliate link disclaimer'
    }
  }

}
</script>
