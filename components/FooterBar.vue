<template>
  <footer v-show="!authenticated" class="footer has-background-black">
    <div class="container-fluid">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            &copy; {{ year }}, EchoMTG, ThoughtBomb Studios, LLC.&nbsp;<nuxt-link class="has-text-grey" to="/legal/privacy-policy/">Privacy Policy</nuxt-link>&nbsp;and&nbsp;<nuxt-link class="has-text-grey"  to="/legal/terms-and-conditions/">Terms and Conditions</nuxt-link>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <div class="logo">
              <a title="EchoMTG Homepage Dashboard" href="https://www.echomtg.com">
                <NuxtImg alt="EchoMTG logo" width="100" height="27"  src="https://assets.echomtg.com/interface/echomtg-logo-white-24.svg" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import dayjs from 'dayjs'
import { mapState } from 'vuex'

export default {
  name: 'FooterBar',
  computed: {
    year () {
      return dayjs().year()
    },
    ...mapState(['isFooterBarVisible','authenticated'])
  }
}
</script>
