<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <div class="columns">
        <div class="column is-one-fifth"><user-sub-nav /></div>
        <div class="column">
          <tiles>
            <card-component title="Plan" icon="script-text" class="tile is-child">
              View Plan
            </card-component>
            <card-component title="Credit Cards" icon="credit-card" class="tile is-child">
              Credit Cards
            </card-component>
          </tiles>
          <card-component title="Invoicing" icon="receipt-text-check" class="tile is-child">
              Show Invoices
            </card-component>
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
  computed: {
    titleStack () {
      return ['My Account', 'Billing']
    },
    ...mapState(['user'])
  }
}
</script>
