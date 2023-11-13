<template>
  <div class="commentThread">
    <write-comment class="mb-3" v-if="authenticated" :commentseed="commentseed" :resource_id="resource_id" :resource="resource" :title="`Comment on ${for_what}`" :callback="fetchComments" />
    <h4 v-if="comments.length > 0" class="title is-size-5"><span v-if="comments.length > 1">{{comments.length}}</span> Comments for {{for_what}}</h4>
    <template v-for="comment in commentsOrderedByVotes">
      <comment :comment="comment" :resource="resource" :key="comment.id" :callback="fetchComments" />
    </template>


  </div>
</template>

<script>
import { mapState } from 'vuex'
import Comment from './Comment.vue'
import WriteComment from './WriteComment.vue'

export default {
  components: { Comment, WriteComment },
  data: () => {
    return {
      comments: []
    }
  },
  computed: {
    ...mapState([
      'authenticated',
      'user'
    ]),
    commentsOrderedByVotes(){
      return this.comments.sort((a,b) =>  b.votes - a.votes )
    }
  },
  props: ['resource_id','resource','for_what','commentseed'],
  async mounted(){
    await this.fetchComments()
    if(window.location.hash.includes('comment')){
      document.getElementById(window.location.hash.substring(1)).scrollIntoView();
    }
  },
  methods: {
    async fetchComments(){
      const res = await this.$echomtg.getComments(this.resource_id, this.resource)
      this.comments = res.data;
      this.meta = res.meta;
    }
  }
}
</script>
