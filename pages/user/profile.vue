<template>
  <div>
    <title-bar :title-stack="titleStack" />

    <section class="section is-main-section">
      <div class="columns">
      <div class="column is-one-fifth"><user-sub-nav /></div>
      <div class="column">
        <tiles>

            <card-component title="Public Profile" icon="account" class="tile is-child">
               <hr>
               <div class="is-flex is-align-items-center">
                  <user-avatar class="has-max-width is-aligned-center" />
                  <b-field horizontal class="is-flex-grow-2" label="Avatar">
                    <avatar-file-picker :callback="$fetch" />
                  </b-field>

                </div>

              <hr>
              <b-field label="Username" message="Must be unique, no special characters">
                <b-input :value="user.username" v-model="username" type="text" />
              </b-field>
              <hr>
              <b-field label="About" message="Markdown ok https://www.markdownguide.org/basic-syntax/">
                <b-input :value="user.about" v-model="about" type="textarea" />
              </b-field>
            </card-component>

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
    AvatarFilePicker
  },
  async fetch() {

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
      username: ''
    }
  },
  computed: {
    titleStack () {
      return ['My Account', 'Profile']
    },
    ...mapState(['user'])
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
