<template>
  <div>
    <title-bar :title-stack="titleStack" />

    <section class="section is-main-section">
      <div class="columns">
        <div class="column is-one-fifth"><user-sub-nav /></div>
        <div v-if="customer == false" class="column">
          <div class="content">
            <h3>No Subscription Detected</h3>
            <p>The billing section is only activated for subscribed users.</p>
            <a class="button" href="/plans">Start your Subscription</a>
          </div>
        </div>
        <div v-if="customer !== false" class="column">
          <tiles>
            <!-- subscription-->
            <card-component title="Subscription Plan" icon="script-text" class="tile is-child">

                <div class="columns mx-0 mb-5">
                  <div class="column content m-0 p-0">
                    <p><strong>Plan:</strong> {{plan.name}} (<nuxt-link to="/plans">change</nuxt-link>)</p>
                  </div>
                  <div class="column content m-0 p-0">
                    <p><strong>Item Limit:</strong> {{plan.card_cap}}</p>
                  </div>
                  <div class="column content m-0 p-0">
                    <p><strong>List Limit:</strong> {{plan.list_cap}}</p>
                  </div>
                </div>
                <div class="columns mx-0  mb-5">
                  <div class="column content m-0 p-0">
                    <p>
                  <strong>Email Reports:</strong>
                    Inventory <span v-if="plan.id > 2">, Watchlist, and Trending</span>
                </p>
                  </div>
                </div>
                <hr />
                <div v-if="subscriptions.length > 0">
                  <div class="columns mx-0 mb-4">
                    <div class="column content m-0 p-0">
                      <p><strong>Balance:</strong> ${{getStripeAmount(customer.balance)}}</p>
                    </div>
                    <div class="column content m-0 p-0">
                      <p><strong>Started:</strong> {{getDateFromUnixTimestamp(subscriptions[0].start_date)}}</p>
                    </div>

                    <div class="column content m-0 p-0">
                      <strong>Status:</strong>
                      <b-tag v-if="!customer.delinquent" type="is-success">Paid</b-tag>
                      <b-tag v-if="customer.delinquent" type="is-danger">Delinquent</b-tag>
                    </div>
                  </div>

                  <div class="columns mx-0">
                    <div class="column content m-0 p-0">
                      <p><strong>Billed:</strong> Around the <strong>{{getBillingDayFromUnixTimestamp(subscriptions[0].billing_cycle_anchor)}}</strong> of each Month</p>
                    </div>
                  </div>
                  <hr/>
                </div>
                <a class="button m-0 " href="/plans">Change Subscription</a>





            </card-component>
            <!-- subscription-->

            <!-- credit cards-->
            <card-component title="Credit Cards" icon="credit-card" class="tile is-child">
              <div v-if="cards.length > 0">
                <b-table class="m-0 p-0 mb-4" v-if="cards.length > 0" :data="cards">
                  <b-table-column field="card.last4" label="Last 4"   v-slot="props">
                    <b-icon class="mr-4" icon="credit-card" />{{props.row.card.brand}} {{props.row.card.last4}}
                    <span class="has-text-danger" v-if="isExpired(props.row.card.exp_year,props.row.card.exp_month)">Expired</span>
                     <b-tag v-if="customer.default_card == props.row.id"
                        type="is-info"
                      >Default</b-tag>
                      <b-button v-if="customer.default_card !== props.row.id" size="is-small" @click="setDefaultCard(props.row.id)">Make Default</b-button>

                  </b-table-column>
                  <b-table-column field="card.exp_year" label="Expiration"  width="40" v-slot="props">
                    {{props.row.card.exp_month}}/{{props.row.card.exp_year}}
                  </b-table-column>
                  <b-table-column  width="40" v-slot="props">
                    <b-button size="is-small" type="is-ghost" @click="deleteCard(props.row.id)" icon-right="delete"></b-button>
                  </b-table-column>
                </b-table>
              </div>
              <div class="content" v-else>
                <p>No credit cards on file.</p>
                <hr/>
              </div>

              <b-button @click="isCardModalActive = true">Add Card</b-button>
            </card-component>
          </tiles>

          <nuxt-link  to="/help/billing/" class="button is-fullwidth mb-5"> <b-icon icon="help-circle" class="mr-2" size="is-small" /> Billing questions? Click here.</nuxt-link>
          <!-- /credit cards-->

          <!-- Payment Table -->
          <card-component title="Payment History" icon="receipt-text-check" class="tile is-child">
              <b-table default-sort-direction="DESC" default-sort="created" v-if="cards.length > 0" :data="payments">
                <b-table-column field="statement_description" label="Description" sortable v-slot="props">
                  <span :title="props.row.id">{{props.row.statement_description}}</span>
                </b-table-column>
                <b-table-column field="created" numeric label="Payment Date" sortable v-slot="props">
                {{getDateFromUnixTimestamp(props.row.created)}}
                </b-table-column>
                <b-table-column field="amount" label="Amount" sortable  v-slot="props">
                  ${{getStripeAmount(props.row.amount)}}
                  <span class="has-text-danger" v-if="props.row.outcome.reason">{{props.row.outcome.reason}}</span>
                  <span class="has-text-success" v-if="!props.row.outcome.reason">{{props.row.outcome.seller_message}}</span>
                </b-table-column>
                <b-table-column field="card.id" label="Card"  v-slot="props">
                  {{props.row.card.brand}} {{props.row.card.last4}} {{props.row.card.exp_month}}/{{props.row.card.exp_year}}
                </b-table-column>
                <b-table-column field="row.id" label="Transaction ID"  v-slot="props">
                {{props.row.id}}
                </b-table-column>
              </b-table>
            </card-component>
            <!-- / Payment Table -->
        </div>
      </div>
      <b-modal v-model="isCardModalActive" :width="640" scroll="keep">
          <AddCreditCardForm :successCallback="() => refreshData()" :cancelCallback="() => deactivateModal()"/>
      </b-modal>
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
import AddCreditCardForm from '@/components/billing/AddCreditCardForm'
import Tiles from '@/components/Tiles'
import UserAvatar from '@/components/UserAvatar'
export default {
  name: 'Billing',
  components: {
    UserAvatar,
    Tiles,
    PasswordUpdateForm,
    ProfileUpdateForm,
    HeroBar,
    TitleBar,
    CardComponent,
    UserSubNav,
    AddCreditCardForm
  },
  head () {
    return {
      title: 'Billing - Account — EchoMTG'
    }
  },
  data() {
    return {
      plan: {},
      cards: [],
      payments: [],
      subscriptions: [],
      customer: {},
      isCardModalActive: false
    }
  },
  async asyncData({ redirect, $echomtg }) {
    const data = await $echomtg.getUserMeta();
    const user = data?.user ? data.user : false;
    const plan = user.planObject;
    let payments = await $echomtg.getUserPaymentHistory();
    payments = payments?.payments ? payments.payments : false;
    let subscriptions = await $echomtg.getUserBillingSubscriptions();
    subscriptions = subscriptions?.subscriptions ? subscriptions.subscriptions : false;
    let customer = await $echomtg.getUserBillingCustomer();
    customer = customer?.customer ? customer.customer : false;

    let cards = await $echomtg.getUserCreditCard();
    cards = cards?.cards ? cards.cards : false;


    // return it
    if (user) {
      return {
        plan, cards, payments, subscriptions, customer
      }
    } else {
      redirect('/')
    }
  },
  methods: {
    isExpired(cardyear, cardmonth){
      const d = new Date();
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      if(cardyear < year){
        return true
      }
      if(cardmonth < month && year == cardyear){
        return true
      }
      return false;
    },
    deactivateModal() {
      this.isCardModalActive = false;
    },
    getStripeAmount(amount){
      if(amount == 0) return 0;
      return amount / 100;
    },
    async setDefaultCard(card_id){
      const res = await this.$echomtg.updateUserBillingDefaultCard(card_id);
      this.$buefy.snackbar.open({
          message: res.message,
          type: `is-${res.status}`,
          position: 'is-top',
      })

      await this.refreshData();
    },
    async deleteCard(card_id){
      const res = await this.$echomtg.deleteUserCreditCard(card_id);
      this.$buefy.snackbar.open({
          message: res.message,
          type: `is-${res.status}`,
          position: 'is-top',
      })
      await this.refreshData();
    },
    async refreshData(){
      this.isCardModalActive=false;
      const payments = await this.$echomtg.getUserPaymentHistory();
      this.payments = payments.payments;
      const customer = await this.$echomtg.getUserBillingCustomer();
      this.customer = customer.customer;
      let cards = await this.$echomtg.getUserCreditCard();
      this.cards = cards.cards;
    },
    getDateFromUnixTimestamp(unix_timestamp){
      return new Date(unix_timestamp * 1000).toLocaleDateString("en-US");
    },
    getBillingDayFromUnixTimestamp(unix_timestamp){
      return new Date(unix_timestamp * 1000).getDate();
    }
  },
  computed: {
    titleStack () {
      return ['My Account', 'Billing']
    },
    paymentsColumns () {
      return [
        {
          field: 'amount',
          label: 'Amount',
          // width: '40',
          // numeric: true
        },
        {
          field: 'calculated_statement_descriptor',
          label: 'Description',
        },
        {
          field: 'billing_details.name',
          label: 'Billed to',
          // width: '40',
          // numeric: true
        },
        {
          field: 'created',
          label: 'Date of Payment',
          // width: '40',
          // numeric: true
        }
      ]
    },
    ...mapState(['user'])
  }
}
</script>
