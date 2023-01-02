<template>
  <b-field>
    <b-datepicker
        ref="datepicker"
        expanded
        size="is-small"
        @input="update"
        :value="date"
        placeholder="Select a date">
    </b-datepicker>
    <b-button
        @click="$refs.datepicker.toggle()"
        icon-left="calendar-today"
        size="is-small"
        type="is-primary" />
  </b-field>
</template>
<script>

export default {
 name: 'DateInput',
 props: {
  callback: {
    type: Function,
    required: true
  },
  earnings_id: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
 },
 methods: {
  update(value) {
    this.$echomtg.earningChangeSoldDate(this.earnings_id,value )
    if(this.callback){
      this.callback()
    }
  }
 }
}
</script>


