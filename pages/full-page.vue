<template>
  <section class="section hero is-fullheight is-error-section">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-two-fifths">
            <nuxt-child />
          </div>
        </div>
      </div>
    </div>
    <div class="hero-foot has-text-centered">
      <div class="logo" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'FullPage',
  mounted () {
    this.$store.commit('fullPage', true)
    this.$store.commit('asideRightToggle', false)
  },
  beforeDestroy () {
    this.$store.commit('fullPage', false)
  }
}
</script>
