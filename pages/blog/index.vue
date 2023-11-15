<template>
  <div>
    <nuxt keep-alive />
    <echo-bread-crumbs :data="crumbs" />

    <div class="content m-5 mb-0">
      <h1>Trading Card and Magic: the Gathering Blog </h1>
      <p>Trading card news, opinions, and annoucements. </p>

    </div>

    <div class="columns is-multiline m-3">
      <div class="column is-one-quarter" v-for="(article,index) in articles" :key="`${article.id}${index}`">
        <div class="card">
           <div class="card-image">
            <nuxt-link :to="article.url">
              <figure class="image">
                <img :src="article.image && article.image != '' ? article.image : `https://assets.echomtg.com/images/echo-mtg-pile-cards.jpg`" class="is-fullwidth" :alt="article.title" />
              </figure>
            </nuxt-link>
           </div>
          <div class="card-content">

            <p class="title is-4">
              <echo-link :url="article.url">{{article.title}}</echo-link>
            </p>

            <div class="content">
              {{article.short || article.content.replace( /(<([^>]+)>)/ig, '').substring(0,120)}}
            </div>
          </div>
          <footer class="card-footer">
            <a :href="article.url" class="card-footer-item">Open Article</a>
          </footer>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import EchoLink from '~/components/EchoLink.vue'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue'
export default {
  name: 'Blog',
  components: {
    EchoBreadCrumbs,
    EchoLink
  },
  data () {
    return {
      articles: [],
      meta: {}
    }
  },
  async fetch(){
    const data = await this.$echomtg.getArticles();
    this.articles = data.data
    this.meta = data.meta
  },
  computed: {
    crumbs() {
      return [
        {
          label: 'Blog',
          url: '/blog/',
          icon: ''

        }
      ]
    },
    ...mapState([
      'user',
      'authenticated'
    ])
  },
  head () {
      return {
          title: `Trading Card and Magic the Gathering Blog`,
          description: `Articles about Trading Card Game, Magic the Gathering, Flesh and Blood.`
      }
    }
}
</script>
