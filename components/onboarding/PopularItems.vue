<template>

  <div class="columns message is-info ml-3">
    <div class="column is-half content pl-3">
      <h3>Do you own these Popular Items?</h3>

    </div>
    <div class="column is-half">

    </div>
  </div>
</template>
<script>
export default{
  name: 'PopularItems',
  data: ()=> {
    return {
      popularItems: []
    }
  },
  methods: {
    goto(url) {
      this.$router.push({ path: url });
    }
  },
  async fetch(){
    this.popularItems = await this.$echomtg.getPopularItems()
  }
}
</script>

