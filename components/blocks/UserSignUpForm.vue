<template>
    <section class="has-background-black p-5 mr-6 create-account-box">
        <h3 class="is-size-4 has-text-white has-text-weight-bold">Create an Account</h3>
        <b-field>
          <div class="control">
              <label class="label has-text-grey">User handle</label>
            <b-input placeholder="User handle (custom validation for only lowercase)"
              type="text"
              required
               icon="account"
              validation-message="Only lowercase is allowed"
              pattern="[a-z]*">
            </b-input>
            </div>
        </b-field>

        <b-field>
           <div class="control has-icons-left">
              <label class="label has-text-grey">Email Address</label>
              <b-input placeholder="Email" icon="email-outline" type="email"></b-input>
            </div>

        </b-field>



        <b-field>
          <div class="control">
              <label class="label has-text-grey">Password</label>

            <b-input type="password"
                placeholder="Password"
                icon="form-textbox-password"
                password-reveal>
            </b-input>
            <p class="help has-text-grey-lighter">Must contain one letter, one number, and be at least 6 characters.</p>
            </div>
        </b-field>
        <b-field>
            <div class="control">
            <button class="button is-primary">Create Account</button>
        </div>
        </b-field>
    </section>
</template>
<style scoped>
.create-account-box {
  border-radius: 5px;
  box-shadow: 0px 0px 10px black;
  border: 1px #333 solid;
}
</style>
<script>
import { mapState } from 'vuex'

export default {
  name: 'AsideMenu',
  components: { },
  props: {
  }
}
</script>
