<template>
  <div>
    <h4 v-if="authenticated" class="title is-size-6 mt-5"><span v-if="title">{{title}}</span><span v-else>Write a Comment</span></h4>
    <article class="media">

      <figure class="media-left">
        <p class="image is-64x64">
          <img :src="user.avatar">
        </p>
      </figure>
      <div class="media-content">
        <div class="field">
          <p class="control">
            <b-input type="textarea"  placeholder="Add a comment..." v-model="comment" />
          </p>
        </div>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <b-button :disabled="disabled" @click="writeComment" type="is-info">Submit</b-button>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              Markdown formatting. No profanity, harrasing, or off topic comments.
            </div>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>

<script>
import { mapState } from 'vuex'


export default {
  name: 'WriteComment',
  props: ['callback','resource_id','resource','thread_parent_id','title'],
  data: () => {
    return {
      toggleWrite: false,
      disabled: true,
      comment: '',
    }
  },
  watch: {
    comment(){
      if(this.comment != ''){
        this.disabled = false
      } else {
        this.disabled = true
      }
    }
  },
  methods: {
    async writeComment(){
      this.disabled = true
      let thread_parent_id = this.thread_parent_id ? this.thread_parent_id : false;
      const res = await this.$echomtg.createComment(
        this.comment,
        this.resource_id,
        this.resource,
        thread_parent_id,
        window.location.href.split('#')[0]
      );
      this.$buefy.toast.open({
        message: res.message,
        type: res.status == 'success' ? 'is-success' :'is-danger'
      })
      if(res.status == 'success' && this.callback){
        this.callback();
      }
      this.comment = ''
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
