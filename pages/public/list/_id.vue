<template>
  <div class="container m-6">
      <list-summary :list="list" />
      <deck-view  :list="list"/>
  </div>
</template>

<script>

import DeckView from '@/components/single/DeckView.vue'
import ListSummary from '@/components/single/ListSummary.vue'
const api_url = process.env.API_DOMAIN;
export default {
    async asyncData({ params, $http }) {
      const id = params.id
      // let token = this.$cookies.get('token');
      const url = `${api_url}lists/get/?list=${id}`;

      const { list } = await fetch(url).then(res => res.json());
      return { id, list }
    },
    components: { DeckView, ListSummary }
}
</script>

<style>

</style>
