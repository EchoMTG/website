<template>
<div>
  <section class="hero is-medium mb-5 is-relative" style="overflow: hidden">
    <div class="hero-body is-relative" style="z-index: 1">
      <div class="columns profile-backdrop">
        <div class="column">
          <div class="level">
            <div class="level-left">
              <div class="level-item is-hero-avatar-item" >
                <nuxt-link to="/user/profile/" class="image" style="max-width:200px; ">
                  <img alt="User Avatar" style="box-shadow: 0px 0px 4px rgba(0,0,0,.3); border-radius: 10px;" :src="getAvatar">
                </nuxt-link>
              </div>
              <div class="level-item is-hero-content-item">
                <div>
                  <h1 class="title is-spaced mb-2 is-size-5-touch is-capitalized">
                    {{username}}'s Profile
                  </h1>
                  <h3 class="subtitle mt-1 is-size-6 has-text-grey-light	mb-5">
                    Last seen {{profile?.user?.last_seen || ''}}. Joined {{profile.user.user_for}} ago.
                  </h3>
                  <div class="is-flex">
                    <div class="box badges py-2 mr-3">
                      <p class="has-text-centered">
                        <small class="has-text-grey">Member Since</small>
                        <br/><strong class="is-size-4">{{profile.user?.user_since.split(" ")[1]}}</strong>

                      </p>
                    </div>
                    <div class="box badges py-2 mr-3">
                      <p class="has-text-centered">
                        <small class="has-text-grey">Deck Lists</small>
                        <br/><strong class="is-size-4">{{profile.lists.length}}</strong>
                      </p>
                    </div>
                    <div class="box badges py-2 mr-3">
                      <p class="has-text-centered">
                        <small class="has-text-grey">Articles</small>
                        <br/><strong class="is-size-4">{{profile.articles.length}}</strong>
                      </p>
                    </div>
                    <div class="box badges py-2 mr-3">
                      <p class="has-text-centered">
                        <small class="has-text-grey">Trades</small>
                        <br/><nuxt-link to="trades/"><strong class="is-size-4">{{profile.trades}}</strong></nuxt-link>
                      </p>
                    </div>
                    <div> </div>
                  </div>
                </div>

              </div>
            </div>
          </div>


        </div>
        <div class="column">
          <h3 class="is-capitalized title">About {{username}}</h3>
          <div v-html="profile.user.about"></div>
        </div>
      </div>
    </div>
    <div class="bg-image" :style="`background-image: url('https://assets.echomtg.com/magic/cards/cropped/${profile.user.profile_background}.hq.jpg')`"></div>
  </section>

  <div class="container">
    <div class="columns">
      <div class="column">
        <h2 class="title is-size-5 is-capitalized">{{username}}'s Lists and Decks</h2>
        <b-table :data="profile.lists" paginated pagination-size="is-small" :per-page="10">
          <b-table-column v-slot="props" label="Deck/List Name" field="name">
            {{props.row.name}}
          </b-table-column>
        </b-table>
      </div>
      <div class="column">
        <h2 class="title is-size-5 is-capitalized">{{username}}'s Articles</h2>
        <b-table :data="profile.articles" paginated pagination-size="is-small" :per-page="10">
          <b-table-column v-slot="props" label="Article Name" field="title">
            <echo-link :url="props.row.url">{{props.row.title}}</echo-link>

          </b-table-column>
        </b-table>
      </div>
    </div>
    <!-- <div class="columns">
      <div class="column">
      <h3 class="is-capitalized title">About {{username}}</h3>
      <div v-html="profile.user.about"></div>
      </div>
      <div class="column">
        <h3 class="is-capitalized title">{{username}}'s Badges</h3>

      </div>
    </div> -->
  </div>
</div>
</template>

<style scoped>

.bg-image {
  /* The image used */
  background-image: url("https://assets.echomtg.com/magic/cards/cropped/104522.hq.jpg");

  /* Add the blur effect */
  filter: blur(7px);
  -webkit-filter: blur(7px);

  /* Full height */
  height: 110%;
  position: absolute;
  z-index: 0;
  top: -5%;
  bottom: -5%;
  left: -5%;
  right: -5%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
   background-attachment: fixed;
}
.badges{
  background: rgba(0,0,0,.5);
}

.profile-backdrop{
  background: rgba(0,0,0,.4);
  border-radius: 20px;
  padding: 20px;
  }
  .hero *{
    color: white;
    text-shadow: 0px 0px 0px black;

  }
</style>

<script>
import EchoLink from '@/components/EchoLink'
export default {
  name: 'UserProfile',
  components: {
    EchoLink
  },
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

  },
  computed: {
    getAvatar() {
      if (this.profile?.user?.avatar) {
        return this.profile.user.avatar
      }
      return `https://assets.echomtg.com/interface/echomtg-default-avatar.jpg`
    }
  },
  head () {
    return {
        title: `${this.profile.user.username}'s EchoMTG Profile`,
        meta: [
          { hid: 'og:image', property: 'og:image', content: this.profile?.user?.avatar || '' },
          {
            hid: 'description',
            name: 'description',
            content:  `${this.profile?.user?.about.substring(0,100)}...`
          },
          {
            hid:'',
          }
        ],
        link: [
          {
            rel: 'canonical',
            href: 'https://www.echomtg.com' + this.$route.path
          }
        ]

    }
  }
}
</script>
