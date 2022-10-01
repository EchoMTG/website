<template>
    <div :class="cardClass">
        <img v-if="!showFull" class="popoverImage" :src="item.image" alt="Placeholder image" />
        <div v-if="showFull">
            <div class="columns">
                <div class="column is-one-third">
                    <img class="popoverImage" :src="item.image" alt="Placeholder image" />
                </div>
                <div class="column is-two-thirds ">
                    <div class="mr-3 ml-2">
                        <p class="subtitle is-size-5 mt-3 mb-0">
                            {{item.name}}
                        </p>
                        <p class="subtitle is-size-6 mb-1">{{item.types}}</p>

                        <div class="content is-small" v-html="this.$echomtg.replaceSymbols(item.card_text)" />

                        <div class="columns" v-if="this.$echomtg.isLoggedIn()">
                          <div class="column">
                            <h2 class="subtitle is-size-5">Inventory</h2>
                             <b-button type="is-dark is-small" icon-left="plus" @click="inventoryQuickAdd(item.emid)">
                              Add Regular
                            </b-button>
                           <b-button type="is-warning is-small" icon-left="plus" @click="inventoryQuickAdd(item.emid,1)">
                              Add Foil
                            </b-button>
                          </div>

                        </div>

                    </div>
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
    },
    methods: {
      inventoryQuickAdd: function(emid,foil=0) {
          this.$echomtg.inventoryQuickAdd(emid, foil)
      },
    }

}
</script>
