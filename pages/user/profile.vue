<template>
  <div>
    <title-bar :title-stack="titleStack" />

    <section class="section is-main-section">
      <div class="columns">
      <div class="column is-one-fifth"><user-sub-nav /></div>
      <div class="column">
        <tiles>

            <div class="card tile is-child">

              <div class="card-header">
                 <div class="card-header-title is-flex">
                  <b-icon icon="card-account-details-outline" custom-size="default" />

                  <span>Public Profile</span>

                  <nuxt-link
                      :to="`/${user.username.toLowerCase()}/`"
                      class="ml-auto button is-small is-outlined is-dark"

                    >
                      <b-icon icon="open-in-new" custom-size="default" />
                      <span>Open Profile</span>
                    </nuxt-link>
                </div>
              </div>
               <hr>
               <div class="is-flex is-align-items-center px-5">

                  <b-field class="is-flex-grow-2" label="Avatar">
                    <avatar-file-picker :callback="$fetch" />
                  </b-field>
                  <user-avatar class="has-max-width is-aligned-center" />
                </div>

              <hr>
              <div class="px-5">
               <b-field class="is-flex-grow-2 mb-3" label="Profile Background Image">
                <global-search  :hidesetcode="true" :hideadvanced="true" :showprice="false" :showimage="true" callbackname="Select Profile Background Image" :callback="setAvatar" ></global-search>

               </b-field>
              </div>
              <div style="overflow: hidden">
                <div class="bg-image" :style="` background-image: url('https://assets.echomtg.com/magic/cards/cropped/${this.user.profile_background}.hq.jpg');`" ></div>
              </div>

              <hr>

                <b-field label="Username" class="px-5" message="Must be unique, no special characters">
                  <div class="is-flex">
                    <b-input class="mr-2" :value="user.username" v-model="username" @input="checkUserName" type="text" />
                    <b-button type="is-success" :disabled="!usernameStatus"  @click="update('username')">change</b-button>
                  </div>
                </b-field>


              <hr>
              <b-field  class="px-5" label="About" message="Markdown ok https://www.markdownguide.org/basic-syntax/">
                <b-input :value="user.about" v-model="about" type="textarea" @input="update('about')" />

              </b-field>
              <b-button class="mx-5 mb-5" type="is-success" @click="update('about')">Update About</b-button>


            </div>

            <profile-update-form class="tile is-child" />
          </tiles>
      </div>
    </div>

      <!-- <password-update-form /> -->
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import UserSubNav from '@/components/user/UserSubNav'
import ProfileUpdateForm from '@/components/ProfileUpdateForm'
import PasswordUpdateForm from '@/components/PasswordUpdateForm'
import Tiles from '@/components/Tiles'
import UserAvatar from '@/components/UserAvatar'
import AvatarFilePicker from '@/components/user/AvatarFilePicker'
import GlobalSearch from '@/components/GlobalSearch'

export default {
  name: 'Profile',
  components: {
    UserAvatar,
    Tiles,
    PasswordUpdateForm,
    ProfileUpdateForm,
    HeroBar,
    TitleBar,
    CardComponent,
    UserSubNav,
    AvatarFilePicker,
    GlobalSearch
  },
  async fetch() {

    // redirect out if bad request
    if(!this.authenticated){
      this.$router.push('/')
    }

    const userdata = await this.$echomtg.getUserMeta();

    // redirect out if bad request
    if(userdata.status == 'error'){
      this.$router.push('/')
    }

    this.$store.commit('user', userdata.user);
    this.about = userdata.user.about;
    this.username = userdata.user.username;

  },
  data: () => {
    return {
      about: '',
      username: '',
      timer: null,
      usernameStatus: false
    }
  },
  computed: {
    titleStack () {
      return ['My Account', 'Profile']
    },
    ...mapState(['user','authenticated']),

  },
  methods: {
    async setAvatar(emid){
      await this.updateValue('profile_background',emid)
    },
    async checkUserName(){
      const res = await this.$echomtg.getReq(`user/unique_check/?value=${this.username}&type=username`)
       this.$buefy.toast.open({
            message: `${res.message}`,
        })
      this.usernameStatus = res.status == 'success' ?  true : false;
    },
    async update(key){
      if(key == 'username'){
        this.usernameStatus = false
      }
      await this.updateValue(key, this[key]);

    },
    async updateValue(name, value){
       if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
      }
      this.timer = setTimeout(async () => {
        let body = {};
        body[name] = value;

        // need to update user in store
        const res = await this.$echomtg.updateUser(body);

        this.$buefy.toast.open({
            message: `${res.message}`,
            type: 'is-info'
        })

        // update user
        await this.$fetch();
      },1000);

    }
  },
  head () {
    return {
        title: `Edit EchoMTG Profile`,
        meta: [

          {
            hid: 'description',
            name: 'description',
            content:  `Edit your public and private profile.`
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
<style scoped>

.bg-image {
  /* The image used */
  background-image: url("https://assets.echomtg.com/magic/cards/cropped/104522.hq.jpg");

  /* Center and scale the image nicely */
  background-position: 20%;
  background-repeat: no-repeat;
  background-size: cover;
  /* Add the blur effect */
  filter: blur(7px);
  -webkit-filter: blur(7px);

   width: 100%;
   height: 150px;
}
</style>
