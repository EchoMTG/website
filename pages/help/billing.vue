<template>
  <div>
    <nuxt keep-alive />
    <section class="hero is-small is-info">
      <div class="hero-body">
          <div class="container">
              <h1 class="title is-size-4">
                Billing Questions
              </h1>
              <h3 class="subtitle">
                  Common questions and information for subscription billing on EchoMTG
              </h3>
          </div>
      </div>
    </section>
    <echo-bread-crumbs :data="crumbs" class="mb-5" />
    <div class="container">
      <div class="columns">
        <div class="column is-one-fifth">
          <help-sub-nav />
        </div>
        <div class="column is-four-fifths">
            <h1 class="title">Billing Questions</h1>

            <div class="columns">
              <div class="column">
                <h2 class="title mb-1 is-size-5">When do I get billed</h2>
                <p>Billing starts at the end of a trial period, then monthly on the same day from there out. For annual billing, your card will be charged annual from the say you subscribed. A history of your billed invoices can be seen when you login and navigate to your <nuxt-link  to="/user/billing/">billing area</nuxt-link>.</p>
                <hr/>
                <h2 class="title mb-1 is-size-5">Prorating and Switching Plans</h2>
                <p>If you switch plans, say from rare to mythic, the cost of rare will be applied to mythic. In a case where rare is $3/m, your first month onf mythic will be prorated to $4/m. Your account is switch from your <nuxt-link  to="/user/billing/">billing area</nuxt-link>.</p>
                <hr/>
                <h2 class="title mb-1 is-size-5">Billing Issues</h2>
                <p>If you idenify a mistake in billing, please email <a href='ma&#105;&#108;to&#58;bil%6Cin%67&#64;ec&#104;&#111;mt%67&#46;co%6D'>billing&#64;&#101;c&#104;omtg&#46;com</a> with your email, account name, and any details related to the billing issue so we can help you.</p>
                <hr/>
                <h2 class="title mb-1 is-size-5">Cancelling</h2>
                <p>You may cancel at anytime by downgrading your account plan to "common". Change plans from your  <nuxt-link  to="/user/billing/">billing area</nuxt-link>. What was paid to date will not be refunded. Your data is retained, so if you choose to re-subscribe you will regain all your data.</p>
                <hr/>
                <h2 class="title mb-1 is-size-5">Storing Data and Payment Processor</h2>
                <p>EchoMTG uses stripe.com as a Payment processor. We do not store any senstive data, but obfuscated hash references used to process payments through stripe.</p>

              </div>
              <div class="column">

                <h2 class="title mb-1 is-size-5">&nbsp;</h2>

                <nuxt-link  class=" button is-info" to="/user/billing/"><b-icon icon="credit-card" class="mr-2" size="is-small" />  Manage Account Billing</nuxt-link>
                <hr/>
                <h2 class="title mb-1 is-size-5">Contacts</h2>
                <h3><strong>Iona</strong></h3>
                    <p>Billing &amp; Account Questions<br/><a href='m&#97;i&#108;t&#111;&#58;&#37;69on&#37;61&#64;e&#99;h%6Fmt&#103;&#46;%63om'>&#105;o&#110;a&#64;ech&#111;mtg&#46;com</a></p>

              </div>
            </div>


        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import FullAd from '~/components/cta/FullAd.vue'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue'
import HelpSubNav from '~/components/help/HelpSubNav.vue'
import helpMenu from '@/components/navigation/help'

export default {
  name: 'Faqs',
  components: {
    EchoBreadCrumbs,
    FullAd,
    HelpSubNav
  },
  data () {
    return {
      helpNavPosition: 4
    }
  },
  computed: {
    crumbs() {
      return [
        {
          label: 'Help',
          url: '/help/',
          icon: 'help-circle-outline'

        },
        {
          label: this.helpNav[this.helpNavPosition].label,
          url: this.helpNav[this.helpNavPosition].to,
          icon: this.helpNav[this.helpNavPosition].icon

        }
      ]

    },
    ...mapState([
      'user',
      'authenticated'
    ]),
    helpNav() {
      return helpMenu();
    }

  },
  head () {
    return {
        title: this.helpNav[this.helpNavPosition].label,
        description: this.helpNav[this.helpNavPosition].description
    }
  }
}
</script>
