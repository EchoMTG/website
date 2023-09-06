<template>
  <div>
    <section class="hero is-black mb-5">
      <div class="hero-body">
          <div class="container">
              <h1 class="title">
                  EchoMTG Community Chat
              </h1>
              <h3 class="subtitle">
                  Magic: the Gathering API for EchoMTG Collection Tools
              </h3>
          </div>
      </div>
    </section>
    <div class="container ">
        <div class="columns">
          <div class="column is-one-fifth">
            <about-sub-nav />
          </div>
          <div class="column content is-two-fifths">
            <p>EchoMTG hosts a chat room of awesome magic addicts that follow the  meta and finance market. Join by following this link: <a href="https://discord.gg/g9g7kAH">EchoMTG Discord Chat</a>.</p>
            <a class="button is-link is-medium" target="_blank" href="https://discord.gg/f6VFybb">
                  <b-icon icon="discord" size="is-small" class="mr-1"/> Join EchoMTG Discord Server
              </a>
            <h1 class="title is-5">Rules/Code of Conduct for Chat Room</h1>
            <div class="box is-dark">
            <ul class="">
                <li>No offensive language around race/sex/religion, period. That includes jokes, inside jokes, or posting memes.</li>
                <li>No posting nudity or provocative content.</li>
                <li>No threats.</li>
            </ul>
            </div>
            <p>We are a magic: the gathering forum, we have a diversity races, creeds, and political views, but none of that matters here, keep the dicussion around the game or be banned.</p>
            <hr>
            <p>If you violate the code of conduct you will receive a verbal warning from an admin. Each user is entitled to two verbal warnings. Any violation of the rules after the 2nd warning will results in permanentl ban from the chatroom.</p>

              <hr>

          </div>
          <div class="column is-two-fifths">
              <iframe src="https://discordapp.com/widget?id=377518692210180121&theme=dark" width="100%" height="500" allowtransparency="true" frameborder="0"></iframe>
          </div>
        </div>
    </div>

  </div>
</template>

<script>
import AboutSubNav from '~/components/about/AboutSubNav.vue'

export default {
  name: 'discord',
  components: {
    AboutSubNav
  },
  data () {
    return {

      search: ''
    }
  },
  asyncData({req}) {
    //console.log('async from index',req)
  },
  methods: {
    getSubDocID(name) {
      return name.toLowerCase().replace(/(\s|'|:|\(|\))/gi,'-').replace('--','-').replace(/-$/,'')
    },
    highlight(event){
      console.log(event)
      // this.value.select()

    },
    getEndpointClass(i){
      let bg = (i % 2 == 0) ? 'has-background-light' : '';
      return `pb-6 pt-4 ${bg}`;
    }
  },
  head () {
      return {
          title: `Magic:the Gathering Discord`,
          meta: [
            { hid: 'og:image', property: 'og:image', content: `https://assets.echomtg.com/images/echomtg-og-default.png?1` },
            {
              hid: 'description',
              name: 'description',
              content:  `EchoMTG hosts a chat room of awesome magic addicts that follow the  meta and finance market.`
            }
          ]

      }
    }
}
</script>
