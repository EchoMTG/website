<template>
  <div class="has-text-centered">
    <user-avatar class="has-max-width is-aligned-center error-page-icon" />
    <div class="error-page-caption">
      <h1>{{ userName }}</h1>
    </div>
    <div class="error-page-action">
      <div v-if="!isPasswordInputActive" class="buttons is-centered">
        <button type="button" class="button is-black" @click="passwordActivate">
          Unlock
        </button>
      </div>
      <form v-else @submit.prevent="submit">
        <b-field position="is-centered">
          <b-input ref="input" v-model="form.password" type="password" />
          <div class="control">
            <button
              type="submit"
              class="button is-black"
              :class="{ 'is-loading': isLoading }"
              :disabled="!form.password"
            >
              <b-icon icon="lock-open" custom-size="default" />
            </button>
          </div>
        </b-field>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UserAvatar from '@/components/UserAvatar'

export default {
  name: 'LockScreen',
  components: { UserAvatar },
  data () {
    return {
      isPasswordInputActive: false,
      isLoading: false,
      form: {
        password: null
      }
    }
  },
  head () {
    return {
      title: 'Lock Screen — EchoMTG'
    }
  },
  computed: {
    ...mapState(['userName'])
  },
  methods: {
    passwordActivate () {
      this.isPasswordInputActive = true
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
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
