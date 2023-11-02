<template>
  <b-field class="file">
    <b-upload v-model="file" :accept="accept">
      <a class="button is-primary">
        <b-icon icon="upload" custom-size="default" />
        <span>{{ buttonLabel }}</span>
      </a>
    </b-upload>
    <span v-if="file" class="file-name">{{ file.name }}</span>
  </b-field>
</template>

<script>
export default {
  name: 'AvatarFilePicker',
  props: {
    accept: {
      type: String,
      default: 'image/png, image/jpeg'
    },
    callback: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      file: null,
      uploadPercent: 0
    }
  },
  computed: {
    buttonLabel () {
      return !this.file ? 'Upload from Computer' : 'Pick another file'
    }
  },
  watch: {
    async file(){
      try{
        let formData = new FormData();
        formData.append( 'file', this.file );

        const res = await fetch(this.$echomtg.getAPIURL()+ `user/upload_avatar/`, {
            method: 'POST',
            headers: this.$echomtg.getUserHeadersNoJSON(),
            body: formData
        });
        const data = await res.json();
        this.$buefy.snackbar.open({
          message: data.message
        })
        if(this.callback){
          this.callback()
        }
      } catch(err){
        console.log(err)
      }
    }
  },
  methods: {
    progressEvent (progressEvent) {
      this.uploadPercent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      )
    }
  }
}
</script>
