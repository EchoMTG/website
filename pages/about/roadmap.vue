<template>
  <div>
    <section class="hero is-black mb-5">
      <div class="hero-body">
          <div class="container">
              <h1 class="title">
                  EchoMTG Roadmap
              </h1>
              <h3 class="subtitle">
                Gain insight into what is being worked on EchoMTG
              </h3>
          </div>
      </div>
    </section>
    <div class="container">
        <div class="columns">
          <div class="column is-one-fifth ">
            <about-sub-nav  />
          </div>
          <div class="column content is-two-fifths">
            <p>The roadmap is determined by the @wiki-team and @teeg based on user feedback and market research.</p>
            <p>Gain insight into what is being worked on for both bugs and features at our Github boards <a target="_blank" href="https://github.com/orgs/EchoMTG/projects/4">Roadmap Board</a> and <a target="_blank" href="https://github.com/EchoMTG/website/discussions">Feature and Support Discussion Board</a></p>
            <p>If you are passionate about a feature. Post a <a target="_blank" href="https://github.com/EchoMTG/website/issues/new?assignees=&labels=&projects=&template=feature_request.md&title=">feature request</a> on the <a href="https://github.com/EchoMTG/website" target="_blank">EchoMTG Github Project</a>, and get some community member to upvote and comment on the issue.</p>             
          </div>
          <div class="column is-two-fifths">
                 </div>
        </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import AboutSubNav from '~/components/about/AboutSubNav.vue'

export default {
  name: 'roadmap',
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
          title: `EchoMTG Developer Roadmap`,
          meta: [
            { hid: 'og:image', property: 'og:image', content: `https://assets.echomtg.com/images/echomtg-og-default.png?1` },
            {
              hid: 'description',
              name: 'description',
              content:  `Gain insight into what is being worked on for both bugs and features on EchoMTG.`
            }
          ]

      }
    }
}
</script>
