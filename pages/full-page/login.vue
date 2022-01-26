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
        <b-input name="email" type="email" v-model="email" required autofocus />
      </b-field>

      <b-field label="Password">
        <b-input type="password" name="password" v-model="password" required />
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
      email: null,
      password: null,
      remember: false
    }
  },
  head () {
    return {
      title: 'Login — Admin One Nuxt.js Premium'
    }
  },
  methods: {
    async submit () {
      this.isLoading = true
      let formData = new FormData();
      formData.append('email', this.email);
      formData.append('password', this.password);

      const rawResponse = await fetch('https://www.echomtg.com/api/user/auth/', {
        method: 'POST',
        body: formData
      });
      const content = await rawResponse.json();

      this.isLoading = false
      // user logged in successfully
      if(content.status == 'success'){
        setCookie('token', content.token)
        // set vookie to domain....
        this.$router.push('/')
      } else {
        alert('login failed')
      }

    }
  }
}
</script>
