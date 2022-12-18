<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <div class="columns">
        <div class="column is-one-fifth"><user-sub-nav /></div>
        <div class="column">
          <tiles>
            <card-component title="Subscription Plan" icon="script-text" class="tile is-child">
              <div class="content">
                <p><strong>Plan:</strong> {{plan.name}} (<nuxt-link to="/plans">change</nuxt-link>)</p>
                <p><strong>Max Items:</strong> {{plan.card_cap}}</p>
                <p><strong>Max Lists:</strong> {{plan.list_cap}}</p>
                <p>
                  <strong>Email Reports:</strong>
                    Inventory <span v-if="plan.id > 2">, Watchlist, and Trending</span>
                </p>
              </div>
            </card-component>
            <card-component title="Credit Cards" icon="credit-card" class="tile is-child">
              <b-table v-if="cards.length > 0" :data="cards">
                <b-table-column field="card.last4" label="Last 4"   v-slot="props">
                  <b-icon class="mr-4" icon="credit-card" />{{props.row.card.brand}} {{props.row.card.last4}}
                  <span class="has-text-danger" v-if="isExpired(props.row.card.exp_year,props.row.card.exp_month)">Expired</span>
                </b-table-column>
                <b-table-column field="card.exp_year" label="Expiration"  width="40" v-slot="props">
                  {{props.row.card.exp_month}}/{{props.row.card.exp_year}}
                </b-table-column>
                <b-table-column  width="40" v-slot="props">
                  <b-button size="is-small" type="is-ghost" @click="deleteCard(props.row.id)" icon-right="delete"></b-button>
                </b-table-column>
              </b-table>
              <b-button @click="isCardModalActive = true">Add Card</b-button>
            </card-component>
          </tiles>
          <div class="card">
            <div class="content p-3 has-text-centered">
              <b-icon icon="help-circle" class="is-pulled-left" /> For billing inquires, please email <a href="mailto:iona@echomtg.com">iona@echomtg.com</a>
            </div>
          </div>
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
                  ${{props.row.amount}}
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
            <div class="card has-background-white">
                <header class="card-header has-background-grey">
                  <p class="card-header-title has-text-white">
                    <b-icon icon="credit-card" class="mr-3" /> Add a Credit Card
                  </p>
                </header>
                <div class="card-content">
                  <div class="columns">
                    <div class="column is-8">
                      <div class="content">
                        <p>Billing information is not stored in EchoMTG.
                          The <a href="https://en.wikipedia.org/wiki/Payment_Card_Industry_Data_Security_Standard" target="_blan">PCI Compliant</a> system <a target="_blank" href="https://www.stripe.com">Stripe</a>
                           handles transactions and storage. EchoMTG references your info in Stripe with safe hashes.
                          </p>
                      </div>
                    </div>
                    <div class="column is-4">
                      <b-image style="width:100%" lazy src="https://assets.echomtg.com/interface/visa-mastercard-discover-amex.png" rounded responsive />
                    </div>
                  </div>

                  <b-field label="Card Number">
                    <b-input v-model="card_number" name="card_number" />
                  </b-field>
                  <div class="columns">
                    <div class="column is-4">
                      <b-field label="Expiration Month">
                        <b-select v-model="card_exp_month" placeholder="Select a default Sort Option">
                              <option
                                  v-for="option in generateMonths"
                                  :value="option.numeric"
                                  :key="option.numeric">
                                  {{ option.name }} ({{ option.numeric }})
                              </option>
                          </b-select>

                      </b-field>
                    </div>
                    <div class="column is-4">
                      <b-field label="Expiration Year">
                        <b-select v-model="card_exp_year" placeholder="Select a default Sort Option">
                              <option
                                  v-for="option in generateYears"
                                  :value="option"
                                  :key="option">
                                  {{ option }}
                              </option>
                          </b-select>
                      </b-field>
                    </div>
                    <div class="column is-4">
                      <b-field label="CVC Code">
                        <b-input maxlength="4" minlength="3" v-model="card_cvc"  />
                      </b-field>
                    </div>
                  </div>
                </div>
                <footer class="card-footer">
                  <a @click="isCardModalActive = false" class="card-footer-item has-background-white has-text-gray">Cancel</a>
                  <a @click="addCard()" class="card-footer-item has-background-success has-text-white">Add Card</a>

                </footer>
            </div>
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
    UserSubNav
  },
  head () {
    return {
      title: 'My Account Billing — EchoMTG'
    }
  },
  data() {
    return {
      user: {},
      plan: {},
      cards: [],
      payments: [],
      card_number: '',
      card_cvc: '',
      card_exp_month: "01",
      card_exp_year: 2022,
      isCardModalActive: false
    }
  },
  async asyncData({ redirect, $echomtg }) {
    const data = await $echomtg.getUserMeta();
    const user = data?.user ? data.user : false;
    let payments = await $echomtg.getUserPaymentHistory();
    payments = payments.payments;
    console.log(payments);
    let cards = await $echomtg.getUserCreditCard();
    cards = cards.cards;
    const plan = user.planObject;
    console.log(cards)

    // return it
    if (user) {
      return {
        user, plan, cards, payments
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
    async addCard(){
      this.isCardModalActive = false
      await this.$echomtg.addUserCreditCard(this.card_number,this.card_exp_month,this.card_exp_year,this.card_cvc);
      await this.refreshCards();
    },
    async deleteCard(card_id){
      await this.$echomtg.deleteUserCreditCard(card_id);
      await this.refreshCards();
    },
    async refreshCards(){
      let cards = await this.$echomtg.getUserCreditCard();
      this.cards = cards.cards;
    },
    getDateFromUnixTimestamp(unix_timestamp){
      return new Date(unix_timestamp * 1000).toLocaleDateString("en-US");
    }
  },
  computed: {
    titleStack () {
      return ['My Account', 'Billing']
    },
    generateYears() {
      let year = new Date().getFullYear();
      let totalYears = 15;
      let yearArray = [year]
      for(let i=1; i < totalYears; i++){
        yearArray.push(year+i);
      }
      return yearArray;
    },
    generateMonths(){
      let monthNames = [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
"JUL", "AUG", "SEPT", "OCT", "NOV", "DEC" ];
      let monthArray = []
      let strMonth = ''
      for(let i=1; i <= 12; i++){
        strMonth = i < 10 ? `0${i}` : `${i}`
        monthArray.push({
          name: monthNames[i-1],
          numeric: strMonth,
        });
      }
      return monthArray;
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
