<template>
   <div class="card ">
    <div class="card-header ">
        <p class="card-header-title">Gain Bonus Storage by Sharing EchoMTG with a Friend</p>
    </div>
    <div class="card-content pt-1 px-3">
      <div class="level">
          <b-input icon="email" type="text" class="level-item mr-2"	v-model="email" placeholder="friends@email.com"  />

          <b-button icon-right="arrow-right-bold" @click="send" label="Share Now" class="level-item" type="is-info" />
      </div>


      <fieldset>
        <label>Or, post your custom share link for an additional 100 inventory storage bonus.</label>
        <b-input type="text" readonly @focus="$event.target.select()" :value="`https://www.echomtg.com/r/${user.referrer_code}/`" />
      </fieldset>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'InviteFriend',
  data: () => {
    return {
      email: ''
    }

  },
  computed: {
    ...mapState([
      'user',
      'authenticated'
    ])
  },
  methods: {
    async send() {
      try {
        const res = await this.$echomtg.userInviteFriend(this.email);
        this.$buefy.toast.open({
          message: res.message,
          type: 'is-info',
          queue: false
        })
        this.email = ''
      } catch (err){
        console.log(err)
      }
    }
  }
}
</script>



userInviteFriend
