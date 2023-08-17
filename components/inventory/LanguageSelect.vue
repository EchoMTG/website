<template>
  <b-select size="is-small" :class="classes" :value="current_language" @input="updateLanguage" class="is-pulled-right is-hidden-touch">
    <option value="EN">EN</option>
    <option value="ES">ES</option>
    <option value="JP">JP</option><option value="DE">DE</option><option value="RU">RU</option><option value="IT">IT</option><option value="CT">CT</option><option value="CS">CS</option><option value="KP">KP</option><option value="FR">FR</option><option value="PT">PT</option>
  </b-select>
</template>

<script>

export default {
  name: 'LanguageSelect',
  props: {
    callback: {
      type: Function
    },
    inventory_id: {
      type: Number,
      required: true
    },
    current_language: {
      type: String
    },
    classes: {
      type: String,
      default: ''
    }
  },
  methods: {

    async updateLanguage(val) {

      await this.$echomtg.inventoryUpdate(this.inventory_id,{
        lang: val
      })
      this.$buefy.snackbar.open({
        message: `Condition Update to: ${val}`,
        queue: false
      })

      if(this.callback){
        this.callback()
      }
    }
  }
}
</script>
