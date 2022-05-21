<template>
  <div class="columns">
    <div class="column">
      <div class="container">
        <h1 class="title">{{ list.name }}</h1>
        <div class="content">{{ list.description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['list'],
}
</script>

<style>
</style>