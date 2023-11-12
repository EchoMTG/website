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
          <div class="columns px-4">
            <div class="column">
              <div class="content pb-4">
                <p>Your <strong>{{user.plan}}</strong> EchoMTG plan limit has been hit, upgrade your subscription to continue.</p>
                <p>Since we do not sell your data or run ads website developement, infrastructure, and maintenance is purely supported by user subs.</p>
                <p>Thank you for consideration!<br/>Teeg and Iona</p>
              </div>


            </div>
            <div class="column">
              <p class="mb-4">Access more storage and specalized apps.</p>
              <b-button icon-left="arrow-up-bold-box-outline" type="is-success" @click="gotoplans" size="is-large">
                Upgrade Plan
              </b-button>


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
        methods: {
          gotoplans(){
            this.$store.commit('upgradeModalShow',false);
            this.$router.push('/plans/');

          }
        },
        data() {
            return {
                isComponentModalActive: false
            }
        }
    }
</script>
