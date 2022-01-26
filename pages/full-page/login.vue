<template>
  <card-component
    title="Login"
    icon="lock"
    :has-card-header-background="true"
    :has-button-slot="true"
  >
    <router-link slot="button" to="/" class="button is-small">
      Dashboard
    </router-link>

    <form method="POST" @submit.prevent="submit">
      <b-field label="E-mail Address">
        <b-input name="email" type="email" required autofocus />
      </b-field>

      <b-field label="Password">
        <b-input type="password" name="password" required />
      </b-field>

      <b-field>
        <b-checkbox type="is-black" class="is-thin">
          Remember me
        </b-checkbox>
      </b-field>

      <hr>

      <b-field grouped>
        <div class="control">
          <button
            type="submit"
            class="button is-black"
            :class="{ 'is-loading': isLoading }"
          >
            Login
          </button>
        </div>
        <div class="control">
          <router-link
            to="/full-page/password-recovery"
            class="button is-outlined is-black"
          >
            Forgot Password?
          </router-link>
        </div>
      </b-field>
    </form>
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent'

export default {
  name: 'Login',
  components: { CardComponent },
  data () {
    return {
      isLoading: false,
      form: {
        email: null,
        password: null,
        remember: false
      }
    }
  },
  head () {
    return {
      title: 'Login — Admin One Nuxt.js Premium'
    }
  },
  methods: {
    submit () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        this.$router.push('/')
      }, 750)
    }
  }
}
</script>
