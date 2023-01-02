<template>
  <b-field>
    <b-datepicker
        ref="datepicker"
        expanded
        size="is-small"
        @input="update"
        :value="new Date(Date.parse(date))"
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
    value = new Date(Date.parse(value))
    const yyyy = value.getFullYear();
    let mm = value.getMonth() + 1; // Months start at 0!
    let dd = value.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    this.$echomtg.earningChangeSoldDate(this.earnings_id,yyyy + '-' + mm + '-' + dd )
    if(this.callback){
      this.callback()
    }
  }
 }
}
</script>


