<template>
    <div>
      
      <div class="content has-text-centered mt-5">
        <h1> <b-icon icon="file-question-outline" custom-size="default" class="mr-3" />404 Page Not Found</h1>
        <p>The page for url {{url}} does not exist. Could you be looking for one of these pages?</p>

      </div>
      <div class="container">
        <div class="columns is-multiline">
        <template v-for="variation in variations">

            <div class="column is-one-fifth is-relative inspectorVariations" :key="variation.id" >

            <a :href="variation.card_url">

                <b-image
                style="border-radius:10px; width: 100%"
                lazy
                placeholder="https://assets.echomtg.com/magic/cards/magic-card-back.jpg"
                :src="variation?.image ? variation.image : ''"
                width="320"
                :alt="`${variation.name} ${variation.set}`" />

                <p class="is-size-7 has-text-centered">{{variation.set}}</p>
            </a>
    
            </div>
        </template>
        </div>
    </div>
      
    </div>
  </template>
  
  <script>
  export default {
    name: 'Item404',
    props: {
      icon: {
        type: String,
        default: 'power-plug'
      },
      title: {
        type: String,
        default: 'Error'
      },
      url: {
        type: String,
        default: ''
      }
    },
    data: () => {
        return {
            variations: []
        }
    },
    mounted(){
        this.searchVariations()
    },
    methods: {
        async searchVariations(){
            let urlsplit = this.url.split('/');
            if(urlsplit[3]){
                let search = urlsplit[3].replace(/-/g,' ');
                this.variations = [...await this.fetchVariations(search)]
                if(this.variations.length == 0){
                  
                    var splitString = search.match(/(.*?\s){3}/g);
                    this.variations = [...await this.fetchVariations(splitString[0])]
                }
                if(this.variations.length == 0){
                  
                    splitString = search.match(/(.*?\s){2}/g);
                    this.variations = [...await this.fetchVariations(splitString[0])]
                }
                if(this.variations.length == 0){
                  
                  splitString = search.match(/(.*?\s){1}/g);
                  this.variations = [...await this.fetchVariations(splitString[0])]
                }
                if(this.variations.length == 0){
                  
                  splitString = search.match(/(.*?\s){4}/g);
                  this.variations = [...await this.fetchVariations(splitString[0])]
                }
            }
        },
        async fetchVariations(search){
            const res = await this.$echomtg.getVariations(search)
            return res.data?.variations ? res.data.variations : [];
        },
    }
  }
  </script>
  