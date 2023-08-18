<template>
  <b-field>
    <b-datepicker
        ref="datepicker"
        expanded
        size="is-small"
        @input="update"
        :value="new Date(Date.parse(date))"
        style="max-width: 74px;"
        placeholder="Select a date">
    </b-datepicker>
    <b-button
        @click="$refs.datepicker.toggle()"
        icon-left="calendar-today"
        size="is-small"
        type="is-light"
         />
  </b-field>
</template>
<script>

export default {
 name: 'DateAcquiredInput',
 props: {
  callback: {
    type: Function
  },
  inventory_id: {
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

    this.$echomtg.inventoryUpdate(this.inventory_id,{
      acquired_date: yyyy + '-' + mm + '-' + dd
    });
    this.$buefy.snackbar.open({
      message: `Date Acquired updated to: ` + yyyy + '-' + mm + '-' + dd,
      queue: false
    })
    if(this.callback){
      this.callback()
    }
  }
 }
}
</script>


