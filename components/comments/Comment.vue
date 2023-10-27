<template>
  <div class="commentThread">

      <div :class="`box ` + (isDarkModeActive == 1 ? 'has-background-black has-text-white' : '')" :key="comment.hash">

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
              <div class="level-left">
                <b-button size="is-small" outlined type="is-dark" class="level-item" icon-left="arrow-up" />
                <b-button size="is-small" outlined type="is-dark" class="level-item" icon-left="arrow-down" />
                <b-button size="is-small" outlined type="is-dark" class="level-item" icon-left="reply" />

              </div>
              <div class="level-left">
                <b-button v-if="user.id == comment.author.id || user.user_level >= 2" size="is-small" outlined type="is-danger" class="level-item" icon-left="delete" />
              </div>
            </nav>

            <template v-if="comment.children.length > 0">
              <Comment v-for="subcomment in comment.children" :comment="subcomment" :key="subcomment.id" />
            </template>

          </div>

        </article>
      </div>


  </div>
</template>

<script>
import { mapState } from 'vuex'

import Comment from './Comment.vue'

export default {
  name: 'Comment',
  components: { Comment },
  props: ['comment'],
  data: () => {
    return {
      toggleWrite: false
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
