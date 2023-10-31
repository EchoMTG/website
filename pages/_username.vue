<template>
  <div>

    <h1 class="title">{{username}}</h1>
    <div v-html="profile.user.about"></div>

  </div>
</template>
<script>
export default {
  name: 'UserProfile',
  data() {
    return {
      username : null,
      profile: {},
    }
  },
  async fetch(){

    if(this.$route.params.username){
      this.username = this.$route.params.username;
    }
    this.profile = await this.$echomtg.getPublicUserProfile(this.username);
    if(this.profile.status == 'error'){
      this.$nuxt.context.error({
        statusCode: 404,
        message: 'User Not Found'
      })
    }

  }
}
</script>
