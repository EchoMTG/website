<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <div class="columns">
        <div class="column is-one-fifth"><user-sub-nav /></div>
        <div class="column">
          <tiles>
            <card-component title="Plan" icon="twitch" class="tile is-child">
              Streamer Settings
            </card-component>
            
          </tiles>
         
        </div>
      </div>
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
  name: 'Streamer',
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
      title: 'Stream Settings - My Account — EchoMTG'
    }
  },
  computed: {
    titleStack () {
      return ['My Account', 'Streamer Settings']
    },
    ...mapState(['user'])
  }
}
</script>
