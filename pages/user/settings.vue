<template>
  <div>
    <title-bar :title-stack="titleStack" />

    <section class="section is-main-section">
      <div class="columns">
      <div class="column is-one-fifth"><user-sub-nav /></div>
      <div class="column">
        <tiles>
            <card-component title="User Settings" icon="cogs" class="tile is-child">
                <div class="content">
                  <p>Interface Personalization</p>
                </div>
                <nav class="level is-mobile">
                  <div class="level-left">
                    <div class="level-item ">
                      <div>
                        <p class="heading">Dark Mode</p>
                        <b-field class="mt-4">
                            <b-switch
                              v-model="dark_mode"
                              true-value="1"
                              false-value="0"
                              @input="toggleDarkMode"
                              >
                              {{offOn(dark_mode)}}
                            </b-switch>
                        </b-field>
                      </div>
                    </div>
                    <div class="level-item ml-5">
                      <div>
                        <p class="heading">Default Inventory Sort</p>
                        <b-field >
                           <b-select @input="update('default_sort')" v-model="default_sort" placeholder="Select a default Sort Option">
                              <option
                                  v-for="option in sortOptions"
                                  :value="option.value"
                                  :key="option.name">
                                  {{ option.name }}
                              </option>
                          </b-select>
                        </b-field>
                      </div>
                    </div>


                  </div>
                </nav>
                <div class="content">
                  <p>Reporting Options</p>
                </div>
                <nav class="level is-mobile">
                  <div class="level-left">
                    <div class="level-item">
                      <div>
                        <p class="heading">Market Pricing</p>
                        <b-field class="mt-4">
                            <b-switch
                              v-model="use_market"
                              true-value="1"
                              false-value="0"
                              @input="update('use_market')"
                              >
                              {{offOn(use_market)}}
                            </b-switch>
                        </b-field>
                      </div>
                    </div>
                    <div class="level-item ml-5">
                      <div>
                        <p class="heading">Report Threshhold</p>
                        <b-field >
                            <b-input
                              type="number"
                              min="0"
                              v-model="setting_report_threshhold"
                              @input="update('setting_report_threshhold')"
                              />
                        </b-field>
                      </div>
                    </div>
                    <div class="level-item ml-5">
                      <div>
                        <p class="heading">Currency Preference</p>
                        <b-field >
                           <b-select @input="update('currency_code')" v-model="currency_code" placeholder="Select a default Sort Option">
                              <option
                                  v-for="option in currencyOptions"
                                  :value="option.value"
                                  :key="option.name">

                                  {{ option.currency_code }} {{ option.name }}
                              </option>
                          </b-select>
                        </b-field>
                      </div>
                    </div>
                  </div>
                </nav>
                 <div class="content">
                  <p>Phone Contact - For Watchlist SMS Alerts</p>
                </div>
                <nav class="level is-mobile">
                  <div class="level-left">
                    <div class="level-item ">
                      <div>
                        <p class="heading">Phone Number</p>
                        <b-field message="Format: 123-456-7890">
                            <b-input
                              type="tel"
                              v-model="phone"

                              @input="update('phone')"
                              />
                        </b-field>
                      </div>
                    </div>
                  </div>
                   <div class="level-item ml-5" v-if="user.verify != null">
                      <div>
                        <p class="heading">Verify Phone Number</p>
                        <b-field v-if="user.verify.verified == '0'">
                           <b-input  v-model="verifyCode" placeholder="Enter 4 digit verify code" />
                           <b-button @click="verify">Verify</b-button>
                        </b-field>
                        <b-message v-if="user.verify.verified == '1'" type="is-success">{{user.phone}} is Verified</b-message>
                      </div>
                    </div>
                </nav>
              </card-component>
          </tiles>
      </div>
    </div>

      <!-- <password-update-form /> -->
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
  name: 'Settings',
    data() {
      return {
        dark_mode: 1,
        currency_code: null,
        default_sort: null,
        timer: null,
        image_pref: "0",
        phone: null,
        setting_report_threshhold: null,
        show_real_name: "0",
        use_market: null,
        sortOptions: [
          {
            name: 'Latest Entry',
            value: 'i.id'
          },
          {
            name: 'Price',
            value: 'p.tcg_mid'
          },
          {
            name: 'Item Name',
            value: 'c.card_name'
          },
          {
            name: 'Personal Gain',
            value: 'personal_gain'
          },
          {
            name: '7-Day Change',
            value: 'p.change'
          },
          {
            name: 'Expansion Name',
            value: 'c.expansion'
          }
        ]
      }
  },
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
  async fetch() {

    const userdata = await this.$echomtg.getUserMeta();

    // redirect out if bad request
    if(userdata.status == 'error'){
      this.$router.push('/')
    }

    this.$store.commit('user', userdata.user);
    this.dark_mode = userdata.user.dark_mode;
    this.use_market = userdata.user.use_market;
    this.setting_report_threshhold = userdata.user.setting_report_threshhold;
    this.default_sort = userdata.user.default_sort;
    this.currency_code = userdata.user.currency_code;
    this.phone = userdata.user.phone;


  },
  head () {
    return {
      title: 'Settings - Account — EchoMTG'
    }
  },
  methods: {
    async toggleDarkMode() {

      this.updateValue('dark_mode',this.dark_mode);
    },
    async update(key){
      console.log(key, this[key])
      await this.updateValue(key, this[key]);

    },
    trueFalse: function (subscriptionValue) {
      return subscriptionValue == "1" ? true : false;
    },
    offOn: function (subscriptionValue) {
      return parseInt(subscriptionValue) == 1 ? "On" : "Off";
    },
    async updateValue(name, value){
       if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
      }
      this.timer = setTimeout(async () => {
        let body = {};
        body[name] = value;

        // need to update user in store
        const res = await this.$echomtg.updateUser(body);

        this.$buefy.toast.open({
            message: `${res.message}: ${name} updated to ${value} `,
            type: 'is-info'
          })

        // update user
        await this.$fetch();
      },2000);

    }
  },
  computed: {
    titleStack () {
      return ['My Account', 'Settings']
    },
    currencyOptions() {
      return [{'value': 'USD', 'name':'USD - U.S. Dollars', 'symbol':'$','symbol_html':'$'},
					{'value': 'GBP', 'name':'GBP - British Pounds', 'symbol':'£','symbol_html':'&pound;'},
					{'value': 'EUR', 'name':'EUR - Euros', 'symbol':'€','symbol_html':'&euro;'},
					{'value': 'AUD', 'name':'AUD - Australian Dollars', 'symbol':'$','symbol_html':'$'},
					{'value': 'BRL', 'name':'BRL - Brazilian Real', 'symbol':'R$','symbol_html':'R$'},
					{'value': 'CAD', 'name':'CAD - Canadian Dollars', 'symbol':'$','symbol_html':'$'},
					{'value': 'CZK', 'name':'CZK - Czech koruny', 'symbol':'Kč','symbol_html':''},
					{'value': 'DKK', 'name':'DKK - Danish Kroner', 'symbol':'kr','symbol_html':'kr'},
					{'value': 'HKD', 'name':'HKD - Hong Kong Dollars', 'symbol':'$','symbol_html':'$'},
					{'value': 'HUF', 'name':'HUF - Hungarian Forints', 'symbol':'Ft','symbol_html':'Ft'},
					{'value': 'ILS', 'name':'ILS - Israeli Shekels', 'symbol':'₪','symbol_html':'&#8362;'},
					{'value': 'JPY', 'name':'JPY - Japanese Yen', 'symbol':'¥','symbol_html':'&#165;'},
					{'value': 'MYR', 'name':'MYR - Malaysian Ringgits', 'symbol':'RM','symbol_html':'RM'},
					{'value': 'MXN', 'name':'MXN - Mexican Pesos', 'symbol':'$','symbol_html':'$'},
					{'value': 'NZD', 'name':'NZD - New Zealand Dollars', 'symbol':'$','symbol_html':'$'},
					{'value': 'NOK', 'name':'NOK - Norwegian Kroner', 'symbol':'kr','symbol_html':'kr'},
					{'value': 'PHP', 'name':'PHP - Philippine Pesos', 'symbol':'Php','symbol_html':'Php'},
					{'value': 'PLN', 'name':'PLN - Polish zloty', 'symbol':'zł','symbol_html':''},
					{'value': 'SGD', 'name':'SGD - Singapore Dollars', 'symbol':'$','symbol_html':'$'},
					{'value': 'SEK', 'name':'SEK - Swedish Kronor', 'symbol':'kr','symbol_html':'kr'},
					{'value': 'CHF', 'name':'CHF - Swiss Francs', 'symbol':'CHF','symbol_html':'CHF'},
					{'value': 'TWD', 'name':'TWD - Taiwan New Dollars', 'symbol':'$','symbol_html':'$'},
					{'value': 'THB', 'name':'THB - Thai Baht', 'symbol':'฿','symbol_html':' &#3647;'},
					{'value': 'TRY', 'name':'TRY - Turkish Liras', 'symbol':'TL','symbol_html':' &#3647;'},
      ]
    },
    ...mapState(['user'])
  }
}
</script>
