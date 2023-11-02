<template>
  <card-component title="Private Profile" icon="account-circle">
    <form @submit.prevent="submit">


      <b-field horizontal label="First Name" message="First name">
        <b-input v-model="form.first_name" name="first_name" required />
      </b-field>
      <b-field horizontal label="Last Name" message="Last name">
        <b-input v-model="form.last_name" name="last_name" required />
      </b-field>
      <b-field horizontal label="E-mail" message="Required. Your e-mail">
        <b-input v-model="form.email" name="email" type="email" required />
      </b-field>
      <hr>
      <b-field horizontal>
        <div class="control">
          <button
            type="submit"
            class="button is-primary"
            :class="{ 'is-loading': isLoading }"
          >
            Submit
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
      form: {
        first_name: null,
        last_name: null,
        email: null
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted () {

    this.form.first_name = this.user.first_name;
    this.form.last_name = this.user.last_name;
    this.form.email = this.user.email;
  },
  watch: {
    user() {
      this.form.first_name = this.user.first_name;
      this.form.last_name = this.user.last_name;
      this.form.email = this.user.email;
    }
  },
  methods: {
    async submit () {
      this.isLoading = true
      let payload = {
        first_name: this.form.first_name,
        last_name: this.form.last_name,

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
