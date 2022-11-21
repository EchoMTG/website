<template>
  <card-component title="Edit Profile" icon="account-circle">
    <form @submit.prevent="submit">
      <b-field horizontal label="Avatar">
        <file-picker />
      </b-field>
      <hr>
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
import FilePicker from '@/components/FilePicker'
import CardComponent from '@/components/CardComponent'

export default {
  name: 'ProfileUpdateForm',
  components: {
    CardComponent,
    FilePicker
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
      let body = {
        first_name: this.form.first_name
      }
      const res = await fetch(this.$config.API_DOMAIN + 'user/update/', {
        headers: {

        },
        body: JSON.stringify(body)

      })
      const data = await res.data();

      setTimeout(() => {
        this.isLoading = false
        this.$store.commit('user', this.form)
        this.$buefy.snackbar.open({
          message: 'Updated',
          queue: false
        })
      }, 500)
    }
  }
}
</script>
