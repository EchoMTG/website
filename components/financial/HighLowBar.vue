<template>
  <div class="is-flex">
    <div>{{low}}</div>
    <div>{{current}}</div>
    <div>{{high}}</div>
  </div>
</template>
<script setup>
  const props = defineProps(['prices'])

  function highestPrice(){
    return this.prices[this.type].filter(p => p > 0).reduce((prev,curr)=> { return Math.max(prev,curr) }).toLocaleString("en-US")
  }
  function lowestPrice(){
    return this.prices[this.type].filter(p => p > 0).reduce((prev,curr)=> { return Math.min(prev,curr) }).toLocaleString("en-US")
  }

</script>
