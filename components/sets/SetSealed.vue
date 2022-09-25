<template>
    <div class="container padded">
        <h1 class="title is-4">Sealed products prices from {{set.name}}</h1>
        <div class="columns is-multiline">
        
              
            <div v-for="sealed in sealedItems"  :key="sealed.emid" class="column is-one-quarter-desktop is-one-thirds-tablet is-two-quarters-mobile">
              <div class="card">
                <div class="card-header has-background-black">
                  <p class="card-header-title title is-size-5 has-text-centered">
                    {{sealed.name}}
                  </p>
                </div>
                <footer class="card-footer has-background-black">
                  <a
                    rel="nofollow"
                    :href="sealed.purchase_link"
                    class="card-footer-item"
                    >Market</a
                  >
                  <a
                    rel="nofollow"
                    :href="sealed.purchase_link"
                    class="card-footer-item"
                    >Lowest</a
                  >
                  <a
                    rel="nofollow"
                    :href="sealed.purchase_link"
                    class="card-footer-item"
                    >Average</a
                  >
                </footer>
                <footer class="card-footer">
                  <a
                    rel="nofollow"
                    :href="sealed.purchase_link"
                    class="card-footer-item"
                    >${{sealed.tcg_low}}</a
                  >
                  <a
                    rel="nofollow"
                    :href="sealed.purchase_link"
                    class="card-footer-item"
                    >${{sealed.tcg_market}}</a
                  >
                  <a
                    rel="nofollow"
                    :href="sealed.purchase_link"
                    class="card-footer-item"
                    >${{sealed.tcg_mid}}</a
                  >
                </footer>
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img
                      :src="sealed.image"
                      :alt="set.name"
                    />
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img
                          :src="sealed.image"
                          :alt="set.name"
                        />
                      </figure>
                    </div>
                    <div class="media-content">
                      <h2 class="title is-4">
                        {{set.name}} - {{sealed.name}}
                      </h2>
                      <p class="subtitle is-6">${{sealed.tcg_market}}</p>
                    </div>
                  </div>
                  <div class="content">
                    {{sealed.description}}
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SetSealed',
    props: {
        set: {
            type: Object,
            default: () => {}
        }
    },
    data: function data() {

        return {
            sealedItems: [],
        };

    },
    async fetch() {
        this.sealedItems = await this.$echomtg.getSealed(this.set.set_code);
    },
    
    mounted() {
        //this.getSealedData(this.set.set_code)
    },
    methods: {
        getSealedData: async (set_code) => {
            this.$echomtg.log('getting set sealed')
            
            this.$echomtg.log("sealed items", this.sealedItems)

        }
    }
}

</script>