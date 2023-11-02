<template>
  <card-component title="Private Information" icon="account-lock">
    <form @submit.prevent="submit">


      <b-field horizontal label="First Name" message="First name">
        <b-input v-model="first_name" name="first_name" required />
      </b-field>
      <b-field horizontal label="Last Name" message="Last name">
        <b-input v-model="last_name" name="last_name" required />
      </b-field>
      <b-field horizontal label="E-mail" message="Required. Your e-mail">
        <b-input v-model="email" name="email" type="email" required />
      </b-field>
      <hr>
      <b-field horizontal>
        <div class="control">
          <button
            type="submit"
            class="button is-primary"
            :class="{ 'is-loading': isLoading }"
            :disabled="!dirty"
          >
            Save Private Profile
          </button>
        </div>
      </b-field>
    </form>
  </card-component>
</template>

<script>
import { mapState } from 'vuex'
import CardComponent from '@/components/CardComponent'

export default {
  name: 'ProfileUpdateForm',
  components: {
    CardComponent
  },
  data () {
    return {
      isFileUploaded: false,
      isLoading: false,
      emailStatus: false,
      first_name: null,
      last_name: null,
      email: null

    }
  },
  computed: {
    ...mapState(['user']),
    dirty(){
       if(this.first_name != this.user.first_name){
        return true
      }
      if(this.last_name != this.user.last_name){
        return true
      }
      if(this.email != this.user.email && this.emailStatus == true){
        return true
      }
      return false
    }
  },
  mounted () {

    this.first_name = this.user.first_name;
    this.last_name = this.user.last_name;
    this.email = this.user.email;
  },

  watch: {
    user() {
      this.first_name = this.user.first_name;
      this.last_name = this.user.last_name;
      this.email = this.user.email;
    },
     async email(){
      await this.checkEmail()
    }
  },
  methods: {
    validateEmail(email){
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    },
     async checkEmail(){
      if(!this.validateEmail(this.email)){
        this.emailStatus = false;
        return;
      }
      const res = await this.$echomtg.getReq(`user/unique_check/?value=${this.email}&type=email`)
       this.$buefy.toast.open({
            message: `${res.message}`,
            type: res.status == 'success' ?  'is-success' : 'is-danger'
        })
      this.emailStatus = res.status == 'success' ?  true : false;
    },
    async submit () {
      this.isLoading = true
      let payload = {}
      if(this.first_name != this.user.first_name){
        payload.first_name = this.first_name
      }
      if(this.last_name != this.user.last_name){
        payload.last_name = this.last_name
      }
      if(this.email != this.user.email && this.emailStatus == true){
        payload.email = this.email
      }

      const res = await this.$echomtg.updateUser(payload)
      this.$buefy.snackbar.open({
        message: res.message
      })
      let userdata = await this.$echomtg.getUserMeta();
      this.$store.commit('user', userdata.user)
      this.isLoading = false

    }
  }
}
</script>
