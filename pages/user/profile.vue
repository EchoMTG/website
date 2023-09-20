<template>
  <div>
    <title-bar :title-stack="titleStack" />

    <section class="section is-main-section">
      <div class="columns">
      <div class="column is-one-fifth"><user-sub-nav /></div>
      <div class="column">
        <tiles>

            <profile-update-form class="tile is-child" />
            <card-component title="Profile" icon="account" class="tile is-child">
              <user-avatar class="has-max-width is-aligned-center" />
              <hr>
              <b-field label="Name">
                <b-input :value="user.username" custom-class="is-static" readonly />
              </b-field>
              <hr>
              <b-field label="E-mail">
                <b-input :value="user.email" custom-class="is-static" readonly />
              </b-field>
            </card-component>
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
    UserSubNav
  },
  head () {
    return {
      title: 'Profile - Account — EchoMTG'
    }
  },
  computed: {
    titleStack () {
      return ['My Account', 'Profile']
    },
    ...mapState(['user'])
  }
}
</script>
