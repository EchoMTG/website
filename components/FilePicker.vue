<template>
  <b-field class="file">
    <b-upload v-model="file" :accept="accept" @input="upload">
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
  name: 'FilePicker',
  props: {
    accept: {
      type: String,
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
      return !this.file ? 'Pick a file' : 'Pick another file'
    }
  },
  methods: {
    upload (file) {
      this.$emit('input', file)

    },
    progressEvent (progressEvent) {
      this.uploadPercent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      )
    }
  }
}
</script>
