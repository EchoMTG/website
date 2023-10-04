<template>
    <b-modal
        v-model="isComponentModalActive"
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-label="Create Account Modal"
        close-button-aria-label="Close"
        custom-class="is-clipped"
        scroll="clip"
        :on-cancel="() => this.$store.commit('loginSignupModalShow',false)"
        aria-modal>
        <div class="columns">
          <div class="column">
            <user-sign-up-form classes="has-background-black max-width-500 has-text-left" :callback="callback" />
          </div>
          <div class="column">
            <user-login-card classes="m-0" />
          </div>
        </div>
    </b-modal>
</template>

<script>
    import { mapState } from 'vuex'
    import UserSignUpForm from '@/components/user/UserSignUpForm.vue'
    import UserLoginCard  from '@/components/user/UserLoginCard.vue'

    export default {
      name: 'LoginSignupModal',
        components: {
          UserSignUpForm,
          UserLoginCard
        },
        props: {
          label: {
            type: String,
            default: 'Start with a Free Account'
          },
          classes: {
            type: String,
            default: ''
          },
          size: {
            type: String,
            default: 'is-medium'
          },
          icon: {
            type: String,
            default: 'account-plus'
          },
          callback: {
            type: Function
          }
        },
        computed: {
          ...mapState([
            'loginSignupModalShow'
          ])
        },
        mounted() {
          console.log('you are mounted',this.loginSignupModalShow)

        },
        watch: {
          loginSignupModalShow() {
            console.log('you are here')
            this.isComponentModalActive = this.loginSignupModalShow
          }
        },
        data() {
            return {
                isComponentModalActive: false
            }
        }
    }
</script>
