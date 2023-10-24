<template>
  <div class="container m-6">
      <list-summary :list="list">
        <div class="is-pulled-right">
          <div class="columns">
              <div class="column">
                 <div class="share-buttons">
                 <social-buttons
                    :url="`https://www.echomtg.com${this.$nuxt.$route.path}`"
                    :title="list.name"
                    :twitter="`echomtg`"
                    :hashtags="`magic the gathering`"
                  />
              </div>
                 </div>
              <div class="column pr-5">

                <b-select placeholder="Download Options" size="is-small" icon="download" type="is-dark" @change="openExport">

                  <option v-for="(link, index) in exportOptions" :value="link.url" :key="`option-item-${index}`">{{link.label}}</option>
                </b-select>

              </div>
          </div>
        </div>
      </list-summary>
      <visual-deck-mode  :list="list"/>
  </div>
</template>

<script>
import SocialButtons from '@/components/cta/SocialButtons.vue'
import VisualDeckMode from '@/components/decks/VisualDeckMode.vue'
import ListSummary from '@/components/single/ListSummary.vue'
const api_url = process.env.API_DOMAIN;
export default {
  data: () => {
    return {
       exportOptions: [
                {'label':'Magic Online (modo)','url':'/api/lists/modo_deck/list='},
                {'label':'Command Seperated (csv)','url':'/api/lists/csv_deck/list='},
                {'label':'Decklist (dek)','url':'/api/lists/dek_deck/list='},
                {'label':'Plain Text (txt)','url':'/api/lists/text_deck/list='},
                {'label':'Plain Text with Prices','url':'/api/lists/text/show_prices=true&list='},
                {'label':'Cockatrice (cok)','url':'/api/lists/cock_deck/list='},
                {'label':'XMage (dck)','url':'/api/lists/xmage_deck/list='},
            ]
    }
  },
    async asyncData({ params, $http }) {
      const id = params.id
      // let token = this.$cookies.get('token');
      const url = `${api_url}lists/get/?list=${id}`;

      const { list } = await fetch(url).then(res => res.json());
      return { id, list }
    },
    components: { VisualDeckMode, ListSummary,SocialButtons }
}
</script>

<style>

</style>
