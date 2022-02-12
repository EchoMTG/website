<template>
    <section class="has-background-black is-rounded p-5 mr-6">
        <h3 class="is-size-4 has-text-info has-text-weight-bold">Make an Account</h3>
        <b-field>
          <div class="control">
              <label class="label has-text-grey-lighter">User handle</label>
            <b-input placeholder="User handle (custom validation for only lowercase)"
              type="text"
              required
              validation-message="Only lowercase is allowed"
              pattern="[a-z]*">
            </b-input>
            </div>
        </b-field>

        <b-field>
           <div class="control">
              <label class="label has-text-grey-lighter">Email Address</label>
              <b-input placeholder="Email" type="email"></b-input>
            </div>

        </b-field>



        <b-field>
          <div class="control">
              <label class="label has-text-grey-lighter">Password</label>

            <b-input type="password"
                placeholder="Password reveal input"
                password-reveal>
            </b-input>
            <p class="help has-text-grey-lighter">Must contain one letter, one number, and be at least 6 characters.</p>
            </div>
        </b-field>
    </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AsideMenu',
  components: { },
  props: {
  }
}
</script>
