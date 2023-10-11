<template>
  <footer v-show="!authenticated" class="footer has-background-black mt-6 py-3">
    <div class="container-fluid">
      <div class="level">
        <div class="level-left">
          <div class="level-item has-text-grey is-size-7">
            <p>EchoMTG &copy;{{ year }}, ThoughtBomb Studios, LLC.&nbsp;<echo-link class="has-text-grey-light is-underlined" url="/legal/privacy-policy/">Privacy Policy</echo-link>&nbsp;and&nbsp;<echo-link class="has-text-grey-light  is-underlined"  url="/legal/terms-and-conditions/">Terms and Conditions</echo-link>. Magic: the Gathering™ references are property of Wizards of the Coast. Lorcana references are property of Disney.</p>
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
import EchoLink from './EchoLink.vue'

export default {
  components: { EchoLink },
  name: 'FooterBar',
  computed: {
    year () {
      return dayjs().year()
    },
    ...mapState(['isFooterBarVisible','authenticated'])
  }
}
</script>
