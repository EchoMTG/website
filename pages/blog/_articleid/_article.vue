<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />

    <article class="blog-article" :style="`background-image: url(${article.image}); background-size: 100% auto; background-repeat: no-repeat`" itemscope="" itemtype="http://schema.org/BlogPosting">

      <div class="post post-body">

        <div class="background-field">
        <h1 class="header" itemprop="name headline">
          {{article.title}}
        </h1>
          <header class="article-header ">

            <hgroup class="hgroup">

              <div class="share-buttons">
                <!-- <a  class="share-button custom-popup-button large-share" href='https://twitter.com/intent/tweet?url=<?=$article->fullUrl()?>&text="<?=$article->title?>" by <?=$author->twitter?> on @echomtg'  target="_blank" rel="nofollow" data-related="echomtg"><span class="fa fa-twitter"></span> Share</a>
                <a class="share-button custom-popup-button facebook" href="https://www.facebook.com/sharer/sharer.php?u=<?=$article->fullUrl()?>"><span class="fa fa-facebook"></span></a> -->
                <social-buttons
                    :url="`https://www.echomtg.com${this.$nuxt.$route.path}`"
                    :title="article.title"
                    :twitter="author.twitter"
                    :hashtags="`${article.game},${article.category},echomtg`"
                  />
              </div>

              <h6>
                <a class="author-name" :href="author.url">{{author.username}}</a>
                <a target="_blank" class="twitter-handle" :href="`https://www.twitter.com/${author.twitter}`">{{author.twitter}}</a>

                |
                <span pubdate="" itemprop="datePublished" :datetime="article.date_created">
                  {{article.date_created}}
                </span>
              </h6>
            </hgroup>

          </header>
          <img width="100%" v-if="article.image" :src="article.image" :alt="article.title"  />
          <div class="article-body">

            <div itemprop="articleBody text" v-html="article.parsedContent"></div>

          </div>

          <footer class="article-footer">
              <social-buttons
                    :url="`https://www.echomtg.com${this.$nuxt.$route.path}`"
                    :title="article.title"
                    :twitter="author.twitter"
                    :hashtags="`${article.game},${article.category},echomtg`"
                  />
          </footer>
          <hr class="clear"/>

          <aside class="author" rel="author" itemprop="author" itemscope="" itemtype="http://www.schema.org/Person">
            <img :src="author.avatar"
            :alt="`${author.username} profile picture`" itemprop="image" />
            <div class="author-bio">

            <p>
              <strong>About the Author</strong><br>

              <span itemprop="description">{{author.about}}</span>
              <br/>
              &mdash;<span itemprop="name">{{author.username}}</span>
            </p>

          </div>
          </aside>

        </div>

      </div>

    </article>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue';

import ItemInspectorWrapper from '~/components/items/ItemInspectorWrapper.vue';
import SetTag from '~/components/magic/SetTag.vue'
import CardAd from '@/components/cta/CardAd.vue'
import SocialButtons from '@/components/cta/SocialButtons.vue'
import CreateAccountModal from '@/components/user/CreateAccountModal.vue'

export default {
  name: 'Article',
  components: {
    EchoBreadCrumbs,
    SetTag,
    ItemInspectorWrapper,
    CardAd,
    CreateAccountModal,
    SocialButtons
  },
  data () {
    return {
      article: {
        title: ''
      },
      author: null,
    }
  },
  async asyncData({ params, $echomtg, redirect}) {

    const articleid = params.articleid;
    let article = null
    let author = null

    // try to get the json
    try {

       const res = await $echomtg.getArticle(articleid);
      //  console.log(res)
       article = res.data.article
       author = res.data.author

    } catch(err){
      console.log(err, article)
    }

    // return it
    if (article) {
      return {
       article, author
      }
    } else {
      redirect('/blog/')
    }
  },
  methods: {

  },
  computed: {
    crumbs () {
      return [
         {
          label: 'Blog',
          url: '/blog/',
          icon: ''

        },
        {
          label: this.article.title,
          url: this.$nuxt.$route.path,
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
        title: `${this.article.title}`,
        link: [
          {
            rel: 'canonical',
            href: 'https://www.echomtg.com' + this.$route.path
          }
        ],
        meta: [
          { hid: 'og:image', property: 'og:image', content: this.article.image },
          { hid: 'conanical', property: 'og:image', content: this.article.image },
          {
            hid: 'description',
            name: 'description',
            content:  ``
          }
        ]
    }
  }

}
</script>
