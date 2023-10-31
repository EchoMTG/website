<template>
  <div>
    Custom user Profile

    <h1>{{username}}</h1>
    <p v-html="profile.user.about"></p>
    {{profile?.message}}
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
