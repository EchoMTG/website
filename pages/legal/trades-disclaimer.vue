<template>
  <div>
    <nuxt keep-alive />
    <section class="hero is-info">
      <div class="hero-body">
          <div class="container">
              <h1 class="title">
                Trades Disclaimer
              </h1>
              <h3 class="subtitle">
                  By using the Trade Functions of EchoMTG, you agree to assume all risks in any transactions and be responsible to report any transaction to your governing entity legal requirements.
              </h3>
          </div>
      </div>
    </section>

    <div class="container content mt-5">
      <p><strong>This Legal Disclaimer for ThoughtBomb Studios, LLC DBA EchoMTG (EchoMTG) is an extension of the user <nuxt-link to="../terms-and-conditions/">Terms and Conditions</nuxt-link></strong></p>
      <p>By utilizing the public trade functionality provided by EchoMTG, you acknowledge and agree to the following terms:</p>
      <ol>
        <li><p><strong>Assumption of Risk</strong>: You understand and acknowledge that trading cards with other users via EchoMTG's platform involves certain risks, including but not limited to the risk of loss, theft, mail fraud, mail loss, receipt of counterfeit or fake cards, and disputes arising from trades. You expressly assume all such risks.</p></li>
        <li><p><strong>No Liability</strong>: EchoMTG, its owners, affiliates, employees, agents, and licensors are not liable for any claims, damages, losses, costs, or expenses resulting from the use of the public trade functionality. This includes, but is not limited to, loss or theft of cards, receipt of counterfeit or fake cards, disputes arising from trades, and any issues related to mail fraud or mail loss.</p></li>
        <li><p><strong>No Responsibility for Trades</strong>: EchoMTG does not oversee, monitor, or otherwise involve itself in the specifics of individual trades. As such, EchoMTG is not responsible for the outcomes of trades, including the condition, authenticity, or delivery of cards traded via the platform.</p></li>
        <li><p><strong>User Responsibility</strong>: It is your responsibility to conduct due diligence before engaging in trades. This includes verifying the authenticity and condition of cards, as well as the trustworthiness of trading partners. EchoMTG does not provide any warranties or guarantees regarding the trades or trading partners.</p></li>
        <li><p><strong>Dispute Resolution</strong>: EchoMTG is not obligated to mediate or resolve disputes arising from trades conducted through its platform. Any disputes must be resolved independently by the trading parties.</p></li><li><p><strong>Agreement to Terms</strong>: By using the public trade functionality of EchoMTG, you agree to the terms outlined in this disclaimer. If you do not agree to these terms, you should not engage in trading activities via EchoMTG.</p></li>
        <li><p><strong>Transaction Fees</strong>: EchoMTG does not collect and will not collect any fee for a trade transaction. EchoMTG does not hold or distribute money for Trades. Your responsibility is to adhere to the operating laws of the country and/or state you reside in. EchoMTG is not responsible to report transactions; it is your responsiblity to report such information to your governing entities.</p></li>
        <li><p><strong>Modification of Terms</strong>: EchoMTG reserves the right to modify these terms at any time without prior notice. Continued use of the trading platform after such modifications constitutes acceptance of the new terms.</p></li></ol><p>This disclaimer is intended to provide a clear understanding of EchoMTG's role and limitations of liability in relation to the public trade functionality. Your use of this functionality signifies your acceptance of these terms.</p>
		</div>


  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TermsAndConditions',
  components: {
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState([
      'user',
      'authenticated'
    ]),

  },
  head () {
    return {
        title: "Terms and Conditions",
        description: ""
    }
  }
}
</script>
