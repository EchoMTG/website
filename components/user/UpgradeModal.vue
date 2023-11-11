<template>
    <b-modal
        v-model="isComponentModalActive"
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-label="Upgrade Account Modal"
        close-button-aria-label="Close"
        custom-class="is-clipped"
        scroll="clip"

        :on-cancel="() => this.$store.commit('upgradeModalShow',false)"
        aria-modal>
        <div class="card">
          <div class="card-header">
            <p class="card-header-title is-size-5">
              <b-icon icon="alert" type="is-warning" class="mr-3" /> Account Limit Hit: {{user.planObject.card_cap}}
            </p>

          </div>
          <div class="columns">
            <div class="column">


            </div>
            <div class="column">
              Upgrade now, plans start at X
            </div>
          </div>
        </div>
    </b-modal>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
      name: 'UpgradeModal',
        components: {
        },
        props: {
          label: {
            type: String,
            default: 'You are at Capcity, Upgrade to Continue'
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
            'upgradeModalShow',
            'user'
          ])
        },
        watch: {
          upgradeModalShow() {

            this.isComponentModalActive = this.upgradeModalShow
          }
        },
        data() {
            return {
                isComponentModalActive: false
            }
        }
    }
</script>
