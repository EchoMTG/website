<template>
  <div :class="classes">
    <ShareNetwork
        network="twitter"
        :url="url"
        :title="title"
        :twitter-user="twitter.replace('@','')"
        :hashtags="`${hashtags},echomtg`"
      >
        <b-button type="is-info" icon-left="twitter" size="is-small">Twitter (x)</b-button>
    </ShareNetwork>
    <ShareNetwork
        network="facebook"
        :url="url"
        :title="title"
        :hashtags="`${hashtags},echomtg`"
      >
      <b-button icon-left="facebook" size="is-small">Facebook</b-button>
    </ShareNetwork>
    <ShareNetwork
        network="reddit"
        :url="url"
        :title="title"
        :hashtags="`${hashtags},echomtg`"
      >
      <b-button type="is-dark" icon-left="reddit" size="is-small">Reddit</b-button>
    </ShareNetwork>
  </div>
</template>
<script>


export default {
  name: 'SocialButtons',
  props: {
    title:{
      type: String
    },
    url:{
      type: String
    },
    twitter:{
      type: String
    },
    hashtags:{
      type: String
    },
    classes:{
      type: String,
      default: ''
    },
  }
}
</script>
