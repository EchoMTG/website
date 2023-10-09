<template>
   <b-taglist :class="classes" attached>
      <b-tag type="is-dark" class="mb-0">
        <a class="has-text-white" :href="url ? url.replace('https://www.echomtg.com','') : ''">
          <i class="is-hidden-desktop" :class="getSetIcon(code)"></i>
          <i style="margin-top:-11px; margin-right: 2px" class="is-hidden-touch" :class="getSetIcon(code)"></i>
          <span class="ellipsis mt-1 is-hidden-touch" style="max-width: 85px; display: inline-block">{{name}}</span>
        </a>
      </b-tag>
      <b-tag class="mb-0"><i style="margin-top:-3px" :class="getSetIcon('mtg')"></i></b-tag>
  </b-taglist>
</template>

<script>
    export default {
      name: 'SetTag',
      props:{
        url: {
          type: String
        },
        code: {
          type: String
        },
        name: {
          type: String
        },
        classes: {
          type: String,
          default: ''
        }
      },
      methods: {
        setExpansion(set){

          if(set?.set_code){
            this.set_code = set.set_code
          } else {
            this.set_code = ''
          }
        },
        getSetIcon(set_code){
          return this.$echomtg.setIconClass(set_code)
        },
      }
    }
</script>
