<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <div class="columns">
        <div class="column is-one-fifth"><user-sub-nav /></div>
        <div class="column">
          <tiles>
            <card-component title="Clear Inventory" icon="vacuum" class="tile is-child">
              <div class="content">
                <p>Clear your inventory and collection history records. Use this if you are looing to restart an import or your account collection. There is no option to delete lists, decks, or earnings, they must be done manually. To delete your whole account, look at delete account options.</p>
                <p>Type your username ({{user.username}}) to proceed</p>
                <b-field label="Type your username to clear">
                <b-input v-model="username" type="text" />
                </b-field>
                <div class="message py-5 is-rounded" v-if="username == user.username">
                  <div class="columns is-vcentered" >
                    <div class="column is-2">
                      <b-image responsive rounded src="https://assets.echomtg.com/interface/gaddock-teeg.jpg" />
                    </div>
                    <div class="column is-10">
                     <p>Clicking <strong>"Clear Inventory"</strong> will reset your invetory data forever. &mdash; Teeg</p>
                    </div>
                  </div>
                </div>
                <b-button @click="clearInventory()" icon-left="vacuum" v-if="username == user.username" size="is-large" type="is-warning is-fullwidth">Clear Inventory</b-button>
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
  name: 'Clear',
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
      title: 'Clear Inventory - Account — EchoMTG'
    }
  },
  data() {
    return {
      username: ''
    }
  },
  methods: {
    async clearInventory(){
      this.$echomtg.clearUserInventory();
    }
  },
  computed: {
    titleStack () {
      return [`My Account`, 'Clear Inventory']
    },
    ...mapState(['user'])
  }
}
</script>
