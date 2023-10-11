<template>
   <div class="card ">
    <div class="card-header has-background-black has-text-white p-0">
        <p class="card-header-title p-2 pl-4 has-text-white">Get 100+ Bonus Storage by Sharing EchoMTG with a Friend</p>
    </div>
    <div class="card-content pt-3 px-3">
      <div class="level">
          <b-input icon="email" type="text" class="level-item mr-2"	v-model="email" placeholder="yourfriends@email.com"  />

          <b-button icon-right="arrow-right-bold" @click="send" label="Share Now" class="level-item" type="is-info" />
      </div>
      <fieldset>
        <div class="mb-2 has-text-weight-bold">Or, share or post your custom link for an additional 100 inventory storage bonus.</div>
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
