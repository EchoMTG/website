<template>
  <div class="container m-6">
      <list-summary :list="list">

        <div class="is-pulled-right is-flex">
           <b-select v-model="deckdownload" class="ml-1 mr-2" placeholder="Download Options" size="is-small" icon="download" type="is-dark" @input="openExport">
            <option v-for="(link, index) in exportOptions" :value="link.url" :key="`option-item-${index}`">{{link.label}}</option>
          </b-select>
          <social-buttons
            :url="`https://www.echomtg.com${this.$nuxt.$route.path}`"
            :title="list.name"
            :twitter="`echomtg`"
            :hashtags="`magic the gathering`"
          />

        </div>
      </list-summary>
      <visual-deck-mode :callback="$fetch" :list="list"/>
  </div>
</template>

<script>
import SocialButtons from '@/components/cta/SocialButtons.vue'
import VisualDeckMode from '@/components/decks/VisualDeckMode.vue'
import ListSummary from '@/components/single/ListSummary.vue'

export default {
  data: () => {
    return {
        deckdownload: null,
        exportOptions: [
                {'label':'Magic Online (modo)','url':'lists/modo_deck/?list='},
                {'label':'Command Seperated (csv)','url':'lists/csv_deck/?list='},
                {'label':'Decklist (dek)','url':'lists/dek_deck/?list='},
                {'label':'Plain Text (txt)','url':'lists/text_deck/?list='},
                {'label':'Plain Text with Prices','url':'lists/text/?show_prices=true&list='},
                {'label':'Cockatrice (cok)','url':'lists/cock_deck/?list='},
                {'label':'XMage (dck)','url':'lists/xmage_deck/?list='},
            ],
        list: {}
    }
  },
  async fetch() {
    const id = this.$route.params['id']
    const url = `lists/get/?list=${id}`;

    this.list = (await this.$echomtg.getReq(url)).list;
    console.log(this.list);

  },
  methods: {
    openExport(){

      let url = this.$echomtg.getAPIURL() + this.deckdownload + this.list.id;
      window.location.href = url

    },
  },
  components: { VisualDeckMode, ListSummary,SocialButtons }
}
</script>
