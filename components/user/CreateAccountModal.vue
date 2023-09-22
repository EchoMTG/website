<template>
    <section>
        <b-button
            :icon-left="icon"
            :label="label"
            type="is-primary"
            class="is-fullwidth"
            :size="size"
            :class="`mythic-background ${classes}`"
            @click="isComponentModalActive = true" />

        <b-modal
            v-model="isComponentModalActive"

            trap-focus
            :destroy-on-hide="false"
            aria-role="dialog"
            aria-label="Create Account Modal"
            close-button-aria-label="Close"
            aria-modal>
            <user-sign-up-form classes="has-background-black max-width-500 has-text-left" :callback="callback" />
        </b-modal>
    </section>
</template>

<script>
    import UserSignUpForm from '@/components/user/UserSignUpForm.vue'

    export default {
        components: {
            UserSignUpForm
        },
         props: {
          label: {
            type: String,
            default: 'Start a Free Account'
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
        data() {
            return {
                isComponentModalActive: false
            }
        }
    }
</script>
