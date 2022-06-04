<template>
  <div>{{ id }}</div>
</template>

<script>
  export default {
    async asyncData({ params }) {
      const id = params.id // When calling /abc the slug will be "abc"
      return { slug }
    }
  }
</script>

<style>

</style>