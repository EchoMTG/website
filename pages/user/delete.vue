<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <div class="columns">
        <div class="column is-one-fifth"><user-sub-nav /></div>
        <div class="column">
          <tiles>
            <card-component title="Delete Account" icon="delete" class="tile is-child">
              <div class="content">
                <b-message type="is-danger" v-if="user.plan !== 'common'">
                  <strong>To Delete your account, first <nuxt-link class="has-text-info" to="/plans/">change your plan to "common"</nuxt-link> to stop billing. Then come back here to delete.</strong>
                </b-message>
                <div v-if="user.plan == 'common'">
                  <p>Delete your account forever. All your user data, collection, and history on Echo. This can't be undone.</p>
                  <p>Type your username ({{user.username}}) to proceed</p>
                  <b-field label="Type your username to delete">
                  <b-input v-model="username" type="text" />
                  </b-field>
                  <div class="message py-5 is-rounded" v-if="username == user.username">
                    <div class="columns is-vcentered" >
                      <div class="column is-2">
                        <b-image responsive rounded src="https://assets.echomtg.com/interface/gaddock-teeg.jpg" />
                      </div>
                      <div class="column is-10">
                      <p>Clicking <strong>"Delete Account"</strong> will purge your account and data forever.</p><p>Thank you for trying Echo! &mdash; Teeg</p>
                      </div>
                    </div>
                  </div>
                  <b-button @click="deleteAccount()" icon-left="delete" v-if="username == user.username" size="is-large" type="is-danger is-fullwidth">Delete Account</b-button>
                </div>
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
  name: 'Delete',
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
  data () {
    return {
      username: ''
    }
  },
  head () {
    return {
      title: 'Delete - Account — EchoMTG'
    }
  },
  methods: {
    async deleteAccount(){
      let res
      try {
        res = await this.$echomtg.deleteUser();
      } catch (err){
        console.log(err)
      }
      await this.$echomtg.logout();
         // destroy the cookie
      this.$cookies.remove('token', {
        path: '/',
        domain: '.echomtg.com'
      })
      // empty the store
      this.$store.replaceState({});
      this.$store.commit('authenticated',false)
      this.$router.push({path: '/'});


    }
  },
  computed: {
    titleStack () {
      return ['My Account', 'Delete Account']
    },
    ...mapState(['user'])
  }
}
</script>
