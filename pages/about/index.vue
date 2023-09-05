<template>

  <div>
    <section class="hero is-black mb-4">
      <div class="hero-body">
          <div class="container">
              <h1 class="title">
                  About EchoMTG
              </h1>
              <p class="subtitle">
                  Software built and maintained by devoted Magic players.
              </p>
          </div>
      </div>
    </section>
    <div class="container">
        <div class="columns">
          <div class="column is-one-fifth">
            <about-sub-nav />
          </div>
          <div class="column content is-two-fifths">
     
              <p>EchoMTG is a cloud software for collectors, players, and traders of the Magic: the Gathering world. The software is packed with tools manage your collection online, build decks, and track prices.</p>
              <p>Never miss out an important spike or dip of any card in your collection.</p>

              <h4>Our Story</h4>
              <p>EchoMTG was developed as a pet project by Gaddock Teeg (who has a day job) to handle his obsession with trading standard cards into a legacy deck. The goal was to build a software to watch price spikes of standard cards and to "trade them up" when they were at their highest value. So it started with a watchlist, then an inventory tracker, followed by a list manager. EchoMTG (previously Echo Mage) was opened up to a few beta users in Sept 2014. By July 2015 there were 1500 users and it was very exciting! We are about to break the 20,000 users (August 2018) and are still growing daily. EchoMTG is still a pet project; the software get improvements all the time.</p>
              <p>The team running EchoMTG is Teeg of North America (developer), Iona of North America (operations), and our outstanding community (support) who help answer questions, fill out the database, and spark ideas. Find the team on the discord channel.</p>
              <p></p>

              <h6>Have fun ;)</h6><h4>&mdash; <em>Teeg and Iona</em></h4>
              <div class="columns">
                  <div class="column image ">
                      <img class="is-rounded" alt="Teeg" src="https://assets.echomtg.com/magic/cards/cropped/30986.hq.jpg">
                  </div>
                  <div class="column  image ">
                      <img class="is-rounded" alt="Iona" src="https://assets.echomtg.com/magic/cards/cropped/61397.hq.jpg">
                  </div>

              </div>


              <hr>
              <h4>Join Our Community</h4>
              <p>We have an active Discord channel where people discuss cards, deck, magic events, and software ideas. You can join by clicking the button below.</p>
              <a class="button is-link is-small" target="_blank" href="https://discord.gg/f6VFybb">
                  <span class="fa fa-comments"></span>&nbsp; Join EchoMTG Chat
              </a>
          </div>
          <div class="column content is-two-fifths">
              <br><br><br>
              <h4>User Testimonials</h4>
              <blockquote class="is-size-7">
                  <p><em>"Thank you for the help.  I have been pleased with echomtg and the ease of use; it's been a great resource.  As far as future use, I am actually in the market to sell my 15-20 year old collection and wanted to find a resource for cataloging my collection and finding an estimated value.  Echomtg has been the best that I have found.  Thank you again for your help."</em></p>
                  <h5>&mdash;  Craig</h5>
              </blockquote>
              <blockquote class="is-size-7">
                  <p><em>"I started using EchoMTG with the hope of extrapolating the TCGPlayer data into actionable buy/sell ebay data. With the API I was able to make back my first year of subscription in the first week of utilizing it. As they say in the auction world: 'A+++++++ would buy again!'."</em></p>

                  <h5>&mdash; Tokugero</h5>
              </blockquote>
              <blockquote class="is-size-7">
                  <p><em>"EchoMTG is very clean, easy on the eyes, and provides some really great numbers on your collection. It's simpler to use than any other similar product out there."</em></p>

                  <h5>&mdash; Phil Allen</h5>
              </blockquote>
              <blockquote class="is-size-7">
                  <p><em>"I like EchoMTG, because of how well they track the price of your cards. Even when you cannot check the website, you can receive emails telling you about the price changes and what is dropping or gaining value greatly."</em></p>

                  <h5>&mdash; Tiggy</h5>
              </blockquote>
              <div class="clear floatfix"></div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import AboutSubNav from '~/components/about/AboutSubNav.vue'

export default {
  name: 'About',
  components: {
    AboutSubNav
  },
  data () {
    return {
      test: null
    }
  },
  asyncData({req}) {
    //console.log('async from index',req)
  },
  computed: {

  },
  head () {
      return {
          title: `About EchoMTG, a third party collection tool for Magic:the Gathering`,
          meta: [
            { hid: 'og:image', property: 'og:image', content: `https://assets.echomtg.com/images/echomtg-og-default.png?1` },
            {
              hid: 'description',
              name: 'description',
              content:  `EchoMTG is an SaaS application developed by a Magic:the Gathering player to manage his card collection.`
            }
          ]

      }
    }
}
</script>
