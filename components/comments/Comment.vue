<template>
    <div :class="`box ` + (isDarkModeActive == 1 ? 'has-background-black has-text-white' : '')" :id="`comment-${comment.hash}`">

      <article class="media">
        <figure class="media-left">
          <p class="image is-64x64">
            <img :alt="`${comment.author.username} avatar`" :src="comment.author?.avatar">
          </p>
        </figure>
        <div class="media-content">
          <div class="content">

              <strong>{{comment.author.username}}</strong> <small v-if="comment.author.twitter"><a rel="nofollow" :href="`https://www.twitter.com/${comment.author.twitter}`" target="_blank">{{comment.author.twitter}}</a></small> <small>on</small> <small>{{comment.date_formatted}}</small>
              <br>
              <div v-html="comment.comment" />
          </div>
          <nav class="level is-mobile">
            <div class="level-left" v-if="authenticated">
              <b-tag :type="isDarkModeActive == 1 ? 'is-dark' : ''">{{comment.votes}}</b-tag>
              <b-button size="is-small" @click="voteOnComment(1)" outlined type="is-dark" class="level-item" icon-left="arrow-up" />
              <b-button size="is-small" @click="voteOnComment(-1)" outlined type="is-dark" class="level-item" icon-left="arrow-down" />
              <b-button size="is-small" @click="toggleWrite=!toggleWrite" type="is-dark" class="level-item" icon-left="reply" />
            </div>
            <div class="level-left" v-else>
              <b-tag>{{comment.votes}}</b-tag>
              <nuxt-link to="/login/">Login to Vote and Comment</nuxt-link>
            </div>
            <div class="level-left">
              <b-button v-if="user.id == comment.author.id || user.user_level >= 2" size="is-small" @click="deleteComment" outlined type="is-danger" class="level-item" icon-left="delete" />
            </div>
          </nav>
          <template v-if="toggleWrite">
            <write-comment
              v-if="authenticated"
              :resource_id="comment.resource_id"
              :thread_parent_id="comment.id"
              :resource="resource"
              :title="`Reply to ${comment.author.username}`"
              :callback="extraCallback" />
              <nuxt-link v-else to="/login/">Login to Respond</nuxt-link>
          </template>

          <template v-if="comment.children.length > 0">
            <Comment v-for="subcomment in comment.children" :callback="callback" :comment="subcomment" :key="subcomment.id" />
          </template>

        </div>

      </article>
    </div>
</template>

<script>
import { mapState } from 'vuex'

import Comment from './Comment.vue'
import WriteComment from './WriteComment.vue'

export default {
  name: 'Comment',
  components: { Comment, WriteComment },
  props: ['comment','resource','callback'],
  data: () => {
    return {
      toggleWrite: false
    }
  },
  methods: {
    extraCallback(){
      this.toggleWrite = false;
      if(this.callback){
        this.callback();
      }
    },
    async deleteComment(){
      const res = await this.$echomtg.deleteComment(this.comment.id);
      this.$buefy.toast.open({
        message: res.message,
        type: 'is-danger'
      })
      if(this.callback){
        this.callback();
      }
    },
    async voteOnComment(vote){
      const res = await this.$echomtg.voteOnComment(this.comment.id,vote);
      this.$buefy.toast.open({
        message: res.message,
        type: res.status == 'success' ? 'is-success' :'is-danger'
      })
      if(res.status == 'success' && this.callback){
        this.callback();
      }
    }


  },
  computed: {
    ...mapState([
      'authenticated',
      'user',
      'isDarkModeActive'
    ])
  },
}
</script>
