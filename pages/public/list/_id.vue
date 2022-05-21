<template>
  <div>{{id}}</div>
</template>

<script>
export default {
    async asyncData({ params }) {
      const id = params.id
      return { id }
    },

}
</script>

<style>

</style>