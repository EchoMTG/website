<template>
  <div class="card has-background-white">
    <header class="card-header has-background-grey">
      <p class="card-header-title has-text-white">
        <b-icon icon="credit-card" class="mr-3" /> {{title}}
      </p>
    </header>

      <div class="card-content">
        <div class="columns">
          <div class="column is-9">
            <b-field
              label="Card Number"
              :message="errorMessage !== '' && errorMessage.includes('number') ? this.errorMessage : ''"
              :type="errorMessage !== '' && errorMessage.includes('number') ? 'is-danger' : ''"
              >
              <b-input
                v-model="card_number"
                maxlength="19"
                />
            </b-field>
            <div class="columns">
              <div class="column is-4">
                <b-field
                  label="Expiration Month"
                   :message="errorMessage !== '' && errorMessage.includes('month') ? this.errorMessage : ''"
              :type="errorMessage !== '' && errorMessage.includes('month') ? 'is-danger' : ''"
                  >
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
                <b-field
                  label="Expiration Year"
                  :message="errorMessage !== '' && errorMessage.includes('year') ? this.errorMessage : ''"
                  :type="errorMessage !== '' && errorMessage.includes('year') ? 'is-danger' : ''"
                  >
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
                <b-field
                  label="CVC Code"
                  :message="errorMessage !== '' && errorMessage.includes('code') ? this.errorMessage : ''"
                  :type="errorMessage !== '' && errorMessage.includes('code') ? 'is-danger' : ''"
                  >
                  <b-input maxlength="4" minlength="3" v-model="card_cvc"  />
                </b-field>
              </div>
            </div>
          </div>
          <div class="column is-3">
            <b-image style="width:100%" lazy src="https://assets.echomtg.com/interface/visa-mastercard-discover-amex.png" responsive />
            <div class="message is-success has-text-centered py-2">
              <b-icon icon="security" class="has-text-success" size="is-large" /><br>
              Secure
            </div>
          </div>
        </div>


        <div class="content">
          <p>Billing information securely stored in
            the <a href="https://en.wikipedia.org/wiki/Payment_Card_Industry_Data_Security_Standard" target="_blan">PCI Compliant</a> system <a target="_blank" href="https://www.stripe.com">Stripe</a>.
            </p>
        </div>
      </div>
      <footer class="card-footer">
        <a @click="addCard()" class="card-footer-item has-background-success has-text-white">

          <span>{{buttonText}}</span>
          <i class="mdi mdi-check ml-3 has-text-weight-bold" />
        </a>
        <a @click="cancelCallback()" class="card-footer-item has-background-white has-text-gray">Cancel</a>

      </footer>
    <b-loading :is-full-page="true" v-model="isLoading"></b-loading>
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
    title: {
      type: String,
      default: 'Add a Credit Card'
    },
    buttonText: {
      type: String,
      default: 'Add Card'
    }
  },
  data () {
    return {
      card_number: '',
      card_cvc: '',
      card_exp_month: "01",
      card_exp_year: (new Date().getYear() + 1900),
      isLoading: false,
      errorMessage: ''
    }
  },
  watch: {
    card_number() {
      if(this.card_number.length < 19){
        this.card_number = this.card_number.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ')
      }
      this.errorMessage = ''
    },
    card_exp_year() {
      this.errorMessage = ''
    },
    card_exp_month() {
      this.errorMessage = ''
    },
    card_cvc() {
      this.errorMessage = ''
    }
  },
  methods: {
    async addCard(){
      this.isLoading = true;
      const res = await this.$echomtg.addUserCreditCard(
        this.card_number,
        this.card_exp_month,
        this.card_exp_year,
        this.card_cvc,
        this.plan
      );
      if(res.status != 'error'){
        this.$buefy.snackbar.open({
            message: res.message,
            type: `is-${res.status}`,
            position: 'is-top',
        })
        this.successCallback();
      } else {
        this.$buefy.snackbar.open({
          message: res.message,
          type: `is-danger`,
          position: 'is-top',
        })
        this.errorMessage = res.message;
      }
      this.isLoading = false;


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
