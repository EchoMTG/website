<template>
  <div class="card has-background-white">
    <header class="card-header has-background-grey">
      <p class="card-header-title has-text-white">
        <b-icon icon="credit-card" class="mr-3" /> Add a Credit Card
      </p>
    </header>
    <div class="card-content">
      <div class="columns">
        <div class="column is-8">
          <div class="content">
            <p>Billing information is not stored in EchoMTG.
              The <a href="https://en.wikipedia.org/wiki/Payment_Card_Industry_Data_Security_Standard" target="_blan">PCI Compliant</a> system <a target="_blank" href="https://www.stripe.com">Stripe</a>
                handles transactions and storage. EchoMTG references your info in Stripe with safe hashes.
              </p>
          </div>
        </div>
        <div class="column is-4">
          <b-image style="width:100%" lazy src="https://assets.echomtg.com/interface/visa-mastercard-discover-amex.png" rounded responsive />
        </div>
      </div>

      <b-field label="Card Number">
        <b-input v-model="card_number" name="card_number" />
      </b-field>
      <div class="columns">
        <div class="column is-4">
          <b-field label="Expiration Month">
            <b-select v-model="card_exp_month" placeholder="Select a default Sort Option">
                  <option
                      v-for="option in generateMonths"
                      :value="option.numeric"
                      :key="option.numeric">
                      {{ option.name }} ({{ option.numeric }})
                  </option>
              </b-select>

          </b-field>
        </div>
        <div class="column is-4">
          <b-field label="Expiration Year">
            <b-select v-model="card_exp_year" placeholder="Select a default Sort Option">
                  <option
                      v-for="option in generateYears"
                      :value="option"
                      :key="option">
                      {{ option }}
                  </option>
              </b-select>
          </b-field>
        </div>
        <div class="column is-4">
          <b-field label="CVC Code">
            <b-input maxlength="4" minlength="3" v-model="card_cvc"  />
          </b-field>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <a @click="cancelCallback()" class="card-footer-item has-background-white has-text-gray">Cancel</a>
      <a @click="addCard()" class="card-footer-item has-background-success has-text-white">Add Card</a>

    </footer>
</div>
</template>

<script>
export default {
  props: {
    plan: {
      type: String,
      default: ''
    },
    successCallback: {
        type: Function
    },
    cancelCallback: {
        type: Function
    },
  },
  data () {
    return {
      card_number: '',
      card_cvc: '',
      card_exp_month: "01",
      card_exp_year: 2022,
    }
  },
  methods: {
    async addCard(){

      const res = await this.$echomtg.addUserCreditCard(
        this.card_number,
        this.card_exp_month,
        this.card_exp_year,
        this.card_cvc,
        this.plan
      );
      this.$buefy.snackbar.open({
          message: res.message,
          type: `is-${res.status}`,
          position: 'is-top',
      })
      this.successCallback();
    },
  },
  computed: {
     generateYears() {
      let year = new Date().getFullYear();
      let totalYears = 15;
      let yearArray = [year]
      for(let i=1; i < totalYears; i++){
        yearArray.push(year+i);
      }
      return yearArray;
    },
    generateMonths(){
      let monthNames = [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
"JUL", "AUG", "SEPT", "OCT", "NOV", "DEC" ];
      let monthArray = []
      let strMonth = ''
      for(let i=1; i <= 12; i++){
        strMonth = i < 10 ? `0${i}` : `${i}`
        monthArray.push({
          name: monthNames[i-1],
          numeric: strMonth,
        });
      }
      return monthArray;
    },

  }
}
</script>
