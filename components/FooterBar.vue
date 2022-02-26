<template>
  <footer v-show="isFooterBarVisible" class="footer has-background-black">
    <div class="container-fluid">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            &copy; {{ year }}, JustBoil.me
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <div class="logo">
              <a href="https://www.echomtg.com">
                <img src="https://assets.echomtg.com/interface/echomtg-logo-white-24.svg">
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
    ...mapState(['isFooterBarVisible'])
  }
}
</script>
