<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <div class="columns">
        <div class="column is-one-fifth"><user-sub-nav /></div>
        <div class="column">
          <tiles>
            <card-component title="Stream Settings" icon="twitch" class="tile is-child">
              Streamer Settings
            </card-component>

            <card-component title="Streamer Q&amp;A" icon="help-circle" class="tile is-child">
              <div class="content">
                <h6>How Does this Work?</h6>
                <p>To thank streamer for using Echomtg, we automatically append your referral codes (tcgplayer, ebay, card kingdom) to buy links.
                  So when you send a user to Echo, and they buy, you get the credit.</p>
                <h6>Do I need an affliate link?</h6>
                <p>Echo is programmed to update to your referral links if you send a user to a list, deck, or article you create.</p>
                <p>If you are linking to a page in Echo that is not your content, then you need to append a referral code to get credit.</p>
                <h6>How do I append a referral code?</h6>
                <p>Update any link to EchoMTG and add <code>?streamer=CODE</code>, paste that into your video descriptions or anywhere on the internet.</p>
              </div>
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
      title: 'Stream Settings - Account — EchoMTG'
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
