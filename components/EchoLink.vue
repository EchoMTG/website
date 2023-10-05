<template>
  <component
      :is="componentIs"
      :to="itemTo"
      :href="itemHref"
      :title="title"
      :class="classes"
    >
     <slot></slot>
  </component>

</template>
<script>
import { mapState } from 'vuex'

export default{
  name: 'EchoLink',
  props: {
    url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    classes: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState(['authenticated']),
    componentIs () {
      return this.authenticated ? 'nuxt-link' : 'a'
    },
    itemTo () {
      return this.authenticated ? this.url : null
    },
    itemHref () {
       return this.authenticated ? null : this.url
    },
  }

}
</script>
