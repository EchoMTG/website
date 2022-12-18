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
                           <b-select v-model="default_sort" placeholder="Select a default Sort Option">
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
                              />
                        </b-field>
                      </div>
                    </div>
                    <div class="level-item ml-5">
                      <div>
                        <p class="heading">Current Preference</p>
                        <b-field >
                           <b-select v-model="currency_code" placeholder="Select a default Sort Option">
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
        user: {},
        dark_mode: null,
        currency_code: null,
        default_sort: null,
        image_pref: "0",
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
  watch: {
    dark_mode: function (){
      this.updateValue('dark_mode',this.dark_mode);
    },
    use_market: function (){
      this.updateValue('use_market',this.use_market);
    },
    setting_report_threshhold: function() {
      this.updateValue('setting_report_threshhold',this.setting_report_threshhold);
    },
    default_sort: function() {
      this.updateValue('default_sort',this.default_sort);
    },
    currency_code: function() {
      this.updateValue('currency_code',this.currency_code);
    }
  },
  async asyncData({ redirect, $echomtg }) {
    const data = await $echomtg.getUserMeta();
    console.log(data);
    const user = data?.user ? data.user : false;
    console.log(user)
    const dark_mode = user.dark_mode;
    const use_market = user.use_market;
    const setting_report_threshhold = user.setting_report_threshhold;
    const default_sort = user.default_sort;
    const currency_code = user.currency_code;
    // return it
    if (user) {
      return {
        user, dark_mode , use_market, setting_report_threshhold , default_sort, currency_code
      }
    } else {
      redirect('/')
    }
  },
  head () {
    return {
      title: 'Settings - Account — EchoMTG'
    }
  },
  methods: {
    trueFalse: function (subscriptionValue) {
      return subscriptionValue == "1" ? true : false;
    },
    offOn: function (subscriptionValue) {
      return subscriptionValue == "1" ? "On" : "Off";
    },
    updateValue: function (name, value){
      let body = {};
      body[name] = value;
      this.$echomtg.updateUser(body)
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
