<template>
  <div>
    <section class="hero is-black mb-5">
      <div class="hero-body">
          <div class="container">
              <h1 class="title">
                  <b-icon icon="reddit" size="is-large" /> Reddit MTG Price Bot (EchoBot)
              </h1>
              <h3 class="subtitle">
                  EchoMTG created a reddit bot (EchoBot) for the magic community. <strong>EchoBot</strong> listens to comments by users and will respond to a comment when summoned by a <strong>price call</strong>. EchoBot price calls are completed between 20 seconds and 2 minutes, longer times are due to Reddit API limiting. EchoBot is driven by our server processing pool and loads <a href="http://www.tcgplayer.com" rel="nofollow">TCGplayer</a> pricing that is stored daily in our database.
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
            <div class="content">

              <p><strong>How Price Calls Work</strong></p>

              <p>In your reddit comment, you summon the EchoBot like this: </p>

              <b-input type="textarea" rows="1" value="$(liliana of the veil)" />


              <p>If a card has multiple printings, and you know its set code or expansion, use a bar character | to separate the card name and the set code or expansion name</p>
              <p><em>Using 3-letter set abbreviation:</em></p>
              <b-input type="textarea" rows="1"  value="$(Liliana of the Veil|ISD)" />

              <p><em>or</em></p>
              <b-input type="textarea" rows="1" value="$(Liliana of the Veil | Innistrad)" />

              <p><em>or, name part of its expansion name</em></p>
              <b-input type="textarea" rows="1" value="$(Liliana of the Veil|player promo)" />
              <p><em>You can use it in a sentence like this</em></p>
              <b-input type="textarea" rows="2" value="Man that $(Liliana of the Veil|promo) reprint didn't really drop the price of regular lilly... #PrayforDamnation" />
              <p><em>Cards with multiple editions and promos. With the set field you can have part of the set, the full name, or the set code.</em></p>
              <b-input type="textarea" rows="2" value="$(terminate|FNM) $(terminate|player) $(terminate|FNM) $(terminate|planes) $(terminate|ARB)" />
              <h2>What doesn't work</h2>
              <hr/>
              <ul>
              <li><p><em><strong>Multiple calls in a single comment.</strong> Only one price call is available per comment.</em></p></li>
              <li><p><em><strong>$(sddgzsdfh)</strong> non recognizable cards return nothing.</em></p></li>
              <li><p><em><strong>$(Bob) $(FoW)</strong> nick names or common abbreviations return nothing</em></p></li>
              <li><p><em><strong>$(Melira)</strong> short names return nothing.</em></p></li>
              <li><p><em><strong>$(Vedalken Æthermage)</strong> Æ character not supported, use <strong>AE</strong>.</em></p></li>
              <li><p><em><strong>$(Dark confidant|MM2015)</strong> You have to spell the expansion name out: <strong>modern masters 2015</strong> or use the set short code <strong>MM2</strong>. Hybrids will not work.</em></p></li>
              <li><p><em><strong>$(Lotus Bloom|foil)</strong> foil price will auto post, you do not need to ask for it. Asking for it will make the bot not recognize what you are asking for.</em></p></li>
              <li><p><em><strong>$(Elspeth, Knight Errant | Duel Deck)</strong> missing the dash in name will fail</em></p></li>
              <li><p><em><strong>$(Snapcaster Mage | Innistred)</strong> Misspelling the set name will fail</em></p></li>

              </ul>

			        <hr/>

            <h2 class="title is-size-4">Where does the Magic EchoBot work?</h2>
            <p>Echo's Reddit bot works on these sub reddits:</p>
            <ul class="slats">
              <li><a rel="nofollow" target="_blank" href="http://www.reddit.com/r/magictcg/">/r/magictcg/</a></li>
              <li><a rel="nofollow" target="_blank" href="http://www.reddit.com/r/mtgcube/">/r/mtgcube/</a></li>
              <li><a rel="nofollow" target="_blank" href="http://www.reddit.com/r/mtglegacy/">/r/mtglegacy/</a></li>
              <li><a rel="nofollow" target="_blank" href="http://www.reddit.com/r/mtgfinance/">/r/mtgfinance/</a></li>
              <li><a rel="nofollow" target="_blank" href="http://www.reddit.com/r/ModernMagic/">/r/ModernMagic/</a></li>
            </ul>
            <br/>

            <p>Want EchoBot in your subreddit? <nuxt-link to="/about/discord/">Contact Us on Discord</nuxt-link></p>
            <p>Have suggestions to make <strong>EchoBot</strong> better? <nuxt-link to="/about/discord/">Contact Us on Discord</nuxt-link></p>

        </div>
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
          title: `Magic:the Gathering Reddit Bot (prices and oracle text)`,
          meta: [
            { hid: 'og:image', property: 'og:image', content: `https://assets.echomtg.com/images/echomtg-og-default.png?1` },
            {
              hid: 'description',
              name: 'description',
              content:  `Access magic the gathering card information and prices through Reddit when writing comments.`
            }
          ]

      }
    }
}
</script>
