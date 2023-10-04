<template>
  <div class="card" style="border: none">

    <header :class="`card-header has-background-${type}`">
      <p class="card-header-title has-text-weight-light is-size-4 has-text-white">
        {{title}}
      </p>
      <button v-if="icon" :href="app_link" class="card-header-icon" aria-label="more options">
        <b-icon class="has-text-white" :icon="icon" size="is-large"  />
      </button>
    </header>
    <div v-if="image != ''" class="card-image">
      <figure class="image">
        <NuxtPicture
          :src="image"
          :alt="title"
          loading="lazy"
          width="300"
          height="200"
           />

      </figure>
    </div>
    <div class="card-content has-background-light has-text-black has-text-centered">
        <p>
          {{ description }}
        </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PromotionCardWidget',
  props: {
    icon: {
      type: String,
      default: 'plus'
    },
    title: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'info'
    },
    app_link: {
      type: String,
      default: '/apps/'
    },
    image: {
      type: String,
      default: ''
    },
  }
}
</script>
