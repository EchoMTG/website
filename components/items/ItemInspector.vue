<template>
    <div class="card itemInspectorCard">
        
        <div class="card-content">
            <div class="columns">
                <div class="column">
                    <img :src="item.image" alt="Placeholder image">
                </div>
                <div class="column">
                

                    <p class="title is-4">{{item.name}}</p>
                    <p class="subtitle is-6">{{item.tcg_mid}}</p>

                    <div class="content" v-html="this.$echomtg.replaceSymbols(item.card_text)" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ItemInspector',
    props: {
      item: {
          type: Object,
          default: function () {
              return { name: 'card name' }
          },
          required: true
      },
    }
    
}
</script>