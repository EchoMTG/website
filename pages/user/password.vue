<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <div class="columns">
        <div class="column is-one-fifth"><user-sub-nav /></div>
        <div class="column">
          <tiles>
            <card-component  title="Change Password" icon="lock" class="tile is-child">
              <p>Enter your current password to update a new password</p>
              <hr />
              <b-field label="Current Password"
                >
                <b-input
                  icon="lock"
                  password-reveal
                  type="password"

                  v-model="current_password" />
              </b-field>

              <b-field
                label="New Password"
                icon="lock"
                :type="newPasswordType"
                message="Requires 1 number, 1 lowercase or uppercase. Must be 6 characters or more."
                >
                <b-input
                  icon="form-textbox-password"
                  password-reveal
                  type="password"

                  v-model="new_password" />
              </b-field>
              <hr />
              <b-button
                type="is-info"
                icon-left="content-save"
                label="Update Password"
                :disabled="!active"
                @click="updatePassword" />

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
  name: 'Password',
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
  data: () => {
    return {
      new_password: '',
      current_password: '',
      active: false
    }
  },
  head () {
    return {
      title: 'Update Password - Account — EchoMTG'
    }
  },
  watch: {
    new_password() {
      this.active = this.passwordCheck(this.new_password) ? true : false;

    }
  },
  methods: {
    async updatePassword() {
      alert('hello')
    },
    passwordCheck(password){
      return (/\d/.test(password) && /[a-zA-Z]/.test(password) && this.new_password.length >= 6) ? true : false
    }
  },
  computed: {
    titleStack () {
      return ['My Account', 'Password']
    },
    newPasswordType(){
      if(this.new_password == '') return ''
      return this.passwordCheck(this.new_password) ? 'is-success' : 'is-danger'
    },

    ...mapState(['user'])
  }
}
</script>
