<template>
  <div class="commentThread">
    <h4 class="title is-size-5"><span v-if="comments.length > 1">{{comments.length}}</span> Comments for {{for_what}}</h4>
    <template v-for="comment in commentsOrderedByVotes">
      <comment :comment="comment" :key="comment.id" />
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Comment from './Comment.vue'

export default {
  components: { Comment },
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
  props: ['resource_id','resource','for_what'],
  mounted(){
    this.fetchComments()
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
