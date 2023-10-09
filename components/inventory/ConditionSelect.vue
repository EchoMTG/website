<template>
    <b-select size="is-small" :value="current_condition" @input="updateCondition" :class="classes">
        <option value="NM">NM</option>
        <option value="LP">LP</option>
        <option value="MP">MP</option>
        <option value="HP">HP</option>
        <option value="D">D</option>
        <option value="ALT">ALT</option><option value="ART">ART</option><option value="PRE">PRE</option><option value="TS">TS</option><option value="SGN">SGN</option><option value="B10">B10</option><option value="B95">B95</option><option value="B9">B9</option><option value="B85">B85</option><option value="B8">B8</option><option value="B75">B75</option><option value="B7">B7</option><option value="P10">P10</option><option value="P95">P95</option><option value="P9">P9</option><option value="P85">P85</option><option value="P8">P8</option><option value="P75">P75</option><option value="P7">P7</option>
    </b-select>
</template>

<script>

export default {
  name: 'ConditionSelect',
  props: {
    callback: {
      type: Function
    },
    inventory_id: {
      type: Number,
      required: true
    },
    current_condition: {
      type: String
    },
    classes: {
      type: String,
      default: ''
    }
  },
  methods: {

    async updateCondition(val) {

      await this.$echomtg.inventoryUpdate(this.inventory_id,{
        condition: val
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
