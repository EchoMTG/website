<template>
  <section class="hero is-hero-bar is-main-hero">
    <div class="hero-body">
      <div class="level">
        <div class="level-left">
          <div class="level-item is-hero-avatar-item">
            <div class="image is-user-avatar">
              <img :src="user.avatar">
            </div>
          </div>
          <div class="level-item is-hero-content-item">
            <div>
              <h1 class="title is-spaced">
                Howdy, <b>{{ user.username }}</b>
              </h1>
              <h3 class="subtitle">
                Last login: <b>{{ user.last_login }}</b>
              </h3>
              <!-- <p>You have <b>6 tasks</b> due today and <b>84 inquiries</b></p> -->
            </div>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <nuxt-link to="/profile" class="button is-light" title="Profile">
              <b-icon icon="account" custom-size="default" />
              <span>Manage profile</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HeroBarMain',
  created(){
    console.log(this.user)
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>
