<template>
  <div>
    <title-bar :title-stack="titleStack" />

    <section class="section is-main-section">
      <div class="columns">
      <div class="column is-one-fifth"><user-sub-nav /></div>
      <div class="column">
        <tiles>
            <card-component title="Settings" icon="cogs" class="tile is-child">
                <div class="content">
                  <p>Manage your email preferences.</p>
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

                  </div>
                </nav>
                <nav class="level is-mobile">

                  <div class="level-left">
                    <div class="level-item">
                      <div>
                        <p class="heading">Feature Updates</p>

                      </div>
                    </div>
                    <div class="level-item ml-5">
                      <div>
                        <p class="heading">Blog Updates</p>

                      </div>
                    </div>
                  </div>
                </nav>
                <hr />
                <div class="content">
                  <h3>Weekly Email Schedule</h3>
                  <ul>
                    <li><strong>Sunday:</strong> Inventory Report</li>
                    <li><strong>Tuesday:</strong> Watchlist Report</li>
                    <li><strong>Thursday:</strong> Trending Report</li>
                  </ul>
                </div>
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
        currency_code: 'USD',
        default_sort: 'i.id',
        image_pref: "0",
        setting_report_threshhold: null,
        show_real_name: "0",
        use_market: null
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
    // return it
    if (user) {
      return {
        user, dark_mode , use_market, setting_report_threshhold
      }
    } else {
      redirect('/')
    }
  },
  head () {
    return {
      title: 'Settings - My Account — EchoMTG'
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
    ...mapState(['user'])
  }
}
</script>
