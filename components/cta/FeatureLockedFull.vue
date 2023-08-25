<template>
  <div v-if="authenticated && user.planObject.access_level < levelRequired" class="content has-text-centered pt-6">

		<h1 class="title is-size-2">{{title}}</h1>
		<p>
			You are on the <strong><em>{{user?.plan ? user.plan : ''}}</em></strong> plan. To this access this feature please upgrade to <strong><em>{{planNeeded}}</em></strong> or higher.
		</p>
    <b-button icon-left="arrow-up-bold-hexagon-outline" size="is-large" type="is-danger" @click="gotoplans">
      Upgrade Now
    </b-button>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    levelRequired: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      default: 'Feature Locked'
    }
  },
  methods: {
    gotoplans() {
      this.$router.push('/plans/')
    }
  },
  computed: {
    planNeeded() {
      switch(this.levelRequired){
        case 1:
          return 'uncommon'
        case 2:
          return 'rare'
        case 3:
          return 'mythic'
        case 4:
          return 'pro'
      }
      return 'common'
    },
    ...mapState([
      'user',
      'authenticated'
    ])

  },
}
</script>
