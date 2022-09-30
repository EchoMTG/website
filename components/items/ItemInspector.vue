<template>
    <div :class="cardClass">
        <header class="card-header" v-if="showFull">
            <p class="card-header-title">
            {{item.name}}
            </p>
        </header>
        <img v-if="!showFull" :src="item.image" alt="Placeholder image">
        <div class="ml-2 mr-2" v-if="showFull">
            <div class="columns">
                <div class="column is-one-third">
                    <img :src="item.image" alt="Placeholder image">
                </div>
                <div class="column is-two-thirds">
                

                    <p class="title is-5">{{item.types}}</p>
                    <p class="subtitle is-6">{{item.tcg_mid}}</p>

                    <div class="content is-small" v-html="this.$echomtg.replaceSymbols(item.card_text)" />
                </div>
            </div>
        </div>

        <footer class="card-footer" v-if="showFull">
            <a v-if="hasRegular" :href="item.purchase_link" class="card-footer-item">Buy Regular ${{item.tcg_mid}}</a>
            <a v-if="hasFoil" :href="item.purchase_link" class="card-footer-item">Buy Foil ${{item.foil_price}}</a>
            
            <a :href="item.echo_url" class="card-footer-item">Open Card Page</a>
        </footer>
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
      showFull: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
        console.log('popup',this.item)
    },
    computed: {
        hasFoil() {
            return this.item.foil_price == null ? false : true;
        },
        hasRegular() {
            return this.item.tcg_mid == null ? false : true;
        },
        cardClass() {
            let full = this.showFull ? 'full' : '';
            return `card itemInspectorCard ${full}`;
        }
    }
    
}
</script>