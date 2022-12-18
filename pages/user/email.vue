<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <div class="columns">
        <div class="column is-one-fifth"><user-sub-nav /></div>
        <div class="column">
          <tiles>
              <card-component title="Email Preferences" icon="email" class="tile is-child">
                <div class="content">
                  <p>Manage your email preferences.</p>
                </div>
                <nav class="level is-mobile">
                  <div class="level-left">
                    <div class="level-item ">
                      <div>
                        <p class="heading">Inventory Reports</p>
                        <b-field class="mt-3">
                            <b-switch
                              v-model="reports">
                              {{ offOn(reports) }}
                            </b-switch>
                        </b-field>
                      </div>
                    </div>
                    <div class="level-item ml-5">
                      <div>
                        <p class="heading">Watchlist and Trending Reports</p>
                        <b-field class="mt-3">
                            <b-switch
                              v-model="watchlist">
                              {{offOn(watchlist)}}
                            </b-switch>
                        </b-field>
                      </div>
                    </div>
                    <div class="level-item ml-5">
                      <div>
                        <p class="heading">General Emails</p>
                        <b-field class="mt-3">
                            <b-switch
                              v-model="general">
                              {{offOn(general)}}
                            </b-switch>
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
                        <b-field class="mt-3">
                            <b-switch
                              v-model="features">
                              {{ offOn(features) }}
                            </b-switch>
                        </b-field>
                      </div>
                    </div>
                    <div class="level-item ml-5">
                      <div>
                        <p class="heading">Blog Updates</p>
                        <b-field class="mt-3">
                            <b-switch
                              v-model="blog">
                              {{ offOn(blog) }}
                            </b-switch>
                        </b-field>
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
          watchlist: true,
          general: true,
          blog: true,
          reports: true,
          features: true,
          subscriptions: {},
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
  async asyncData({ redirect, $echomtg }) {
    const data = await $echomtg.getUserSubscriptions();
    const subscriptions = data?.data ? data.data : false;
    console.log(subscriptions)
    // return it
    if (subscriptions) {
      return {
        subscriptions
      }
    } else {
      redirect('/')
    }
  },
  mounted() {
    this.watchlist = this.trueFalse(this.subscriptions.watchlist_notifications)
    this.general = this.trueFalse(this.subscriptions.general_emails)
    this.blog = this.trueFalse(this.subscriptions.blog_update)
    this.features = this.trueFalse(this.subscriptions.feature_updates)
    this.reports = this.trueFalse(this.subscriptions.weekly_update)
  },
  head () {
    return {
      title: 'Email Preferences - Account — EchoMTG'
    }
  },
  watch: {
    watchlist: function() {
      this.updateValue("watchlist", this.watchlist)
    },
    general: function() {
      this.updateValue("general", this.general)
    },
    blog: function() {
      this.updateValue("blog", this.blog)
    },
    features: function() {
      this.updateValue("features", this.features)
    },
    reports: function() {
      this.updateValue("reports", this.reports)
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
      body[name] = value ? "1" : "0";
      this.$echomtg.updateUserSubscriptions(body)
    }
  },
  computed: {
    titleStack () {
      return ['My Account', 'Email Preferences']
    },

    ...mapState(['user'])
  }
}
</script>
