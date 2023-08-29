<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />
    <section class="hero is-small has-background-black is-hidden-mobile pl-4 pt-4 pr-4 pb-0">
      <div class="columns">
        <div class="column  is-two-thirds">
          <h1 class="title has-text-white">
              CSV Import
          </h1>
          <h3 class="subtitle has-text-light">

          </h3>
        </div>

      </div>
    </section>
    <!-- info area -->
    <div class="columns">
			<div class="column">
				<div class="layout">
          <div class="uploader" v-if="this.ready != true">
              <h1 class="title is-size-4">EchoMTG CSV Importer</h1>
              <p>Upload a CSV, XLS, or TCGplayer scanner app Export File</p>
              <hr />

              <div class="message has-background-grey-dark padded">
                  <strong>Upload Here:</strong> <input style="width: 300px" type="file" @change="readFile($event)" id="upload-file">
                  <p style="margin-top: 10px;"><span class="fa fa-warning"></span> Note if your CSV row count is greater than your account threshold, you will only be able to import to your cap. Upgrade your account <a href="/plans/">here</a>.</p>
              </div>
              <div class="errorBox" v-if="this.parsingErrors.length > 0">
                  <h2>Errors were detected with your CSV File</h2>
                  <ol>
                      <li v-for="(error, index) in parsingErrors" :key="index">
                          {{error}}
                      </li>
                  </ol>

              </div>
              <div class="columns">
                  <div class="column">
                      <div class="container content">
                          <h3>Supported Exports</h3>
                          <ul>
                              <li>TCGplayer App CSV Export</li>
                              <li>Delver Lens (pick EchoMTG CSV export)</li>
                              <li>Deckbox.org CSV Export</li>
                              <li>Custom CSV (<a href="https://assets.echomtg.com/examples/EchoMTG-Upload-Template.csv" target="_blank">download example</a>)</li>
                          </ul>
                          <h3>Realtime Editing</h3>
                          <p>After uploading your CSV, you have the ability to change languages, conditions,  and set a bulk acquired price. Do this before clicking start import.</p>
                          <p>Bulk Price: Enter a bulk price and EchoMTG will divide the total cards to import by this price and use that for the default acquired price. If a card has a custom acquired price, the custom price will be used.</p>
                          <h3>Old Importer</h3>
                          <p>If you relied on the old importer, you may still access it here: <a href="/inventory/import-old/">old importer</a>.</p>
                      </div>
                  </div>


                  <div class="column">
                      <div class="container content">
                          <h3>Working with Custom CSVs</h3>
                          <p>Common columns headers are card, card name, name, expansion, set, set code, price acquired, bought price, date, date acquired, language, lang, condition</p>
                          <h4>Required Columns</h4>
                          <ul>
                              <li>Name (Card Name)</li>
                              <li>Set Code (Three Letter Code)</li>
                              <li>Foil - True (1) or False (0)</li>
                          </ul>
                          <h4>Optional Columns</h4>
                          <ul>
                              <li>Language </li>
                              <li>Acquired Price (What you paid for the item)</li>
                              <li>Quantity (Number to import)</li>
                              <li>Acquired Date (When did you acquire?)</li>
                              <li>Condition (Visit <a href="/api/" target="_blank">API docs</a> for options)</li>
                          </ul>

                      </div>
                  </div>
                  <div class="column">
                      <div class="container content">
                          <h3>Default Values</h3>
                          <ul>
                              <li><strong>Language:</strong> EN (english)</li>
                              <li><strong>Acquired Price:</strong> TCG MID (USD)</li>
                              <li><strong>Acquired Date:</strong> Today</li>
                              <li><strong>Condition:</strong> NM (Near Mint)</li>
                              <li><strong>Foil:</strong> False (Normal)</li>
                              <li><strong>Quantity:</strong> 1</li>
                          </ul>
                          <h3>Handling Errors</h3>
                          <p>The importer will put your list into two sets, ready to import and errors. A summary will explain how many are in each category.</p>
                          <p>Cards that are errors can be fixed by searching for their </p>
                          <p>Note EchoMTG uses the TCGplayer naming convention for cards. That means the name and set code needs to match what it is listed on TCGplayer as in order for EchoMTG to find a match.</p>

                      </div>
                  </div>
              </div>


          </div>
          <article class="message" v-if="this.ready == true">
              <div class="message-header has-background-dark">
                  <h2 class="is-size-5 has-text-white has-text-weight-semibold">Import Summary</h2>

                  <p class="pull-right">
                      <button class="import is-dark button has-icons-left" @click="cancelRestart()" aria-label="cancel import">
                          <span class="icon">
                              <i class="fa fa-step-backward"></i>
                          </span>
                          <span>Start Over</span>
                      </button>
                      <button class="import is-success button has-icons-left" @click="startImport()" aria-label="start import">
                          <span class="icon">
                              <i class="fa fa-arrow-up"></i>
                          </span>
                          <span>Start Importing Matched Cards</span>
                      </button>
                  </p>
              </div>
              <div class="message-body">
                  <nav  class="level importPanel is-mobile" >
                      <div class="level-item has-text-centered">
                          <div>
                              <p class="heading">Optional Bulk Value</p>
                              <p class="title"><input class="input is-small" type="text" v-model="bulkValue" placeholder="50.80" /></p>
                          </div>
                      </div>
                      <div class="level-item has-text-centered">
                          <div>
                              <p class="heading">Avg. Acquired Value</p>
                              <p class="title">{{bulkAVGValue}}</p>
                          </div>
                      </div>
                      <div class="level-item has-text-centered">
                          <div>
                              <p class="heading">Ready to Import</p>
                              <p class="title">{{totalQueued}} <small class="has-text-grey-light is-size-4">({{totalCardsWithQTY}} QTY)</small></p>
                          </div>
                      </div>
                      <div class="level-item has-text-centered">
                          <div>
                              <p class="heading">Need to Be Fixed</p>
                              <p class="title">{{totalNeedsFixing}} <small class="has-text-grey-light is-size-4">({{totalErrorCardsWithQTY}} QTY)</small></p>
                          </div>
                      </div>
                      <div class="level-item has-text-centered">
                          <div>
                              <p class="heading">Minutes to Import</p>
                              <p class="title">{{estimatedTime}}</p>
                          </div>
                      </div>

                  </nav>
              </div>
          </article>
        </div>
      </div>
    </div>
    <!-- end info area -->
    <!-- Start good cards -->
    <div v-if="cards.length > 0">
        <h2 class="title is-size-3">{{cards.length}} Items Correctly Matched <em class="has-text-grey-dark">- Click the Green Start Import Button</em></h2>
        <div class="cardsToInput table-container">
            <table class="table is-striped">
                <thead >
                    <tr class="has-background-black" style="border: none;">
<!--                                    <th style="border: none;">EchoID</th>-->
                        <th style="border: none;"><abbr title="Quantity">QTY</abbr></th>
                        <th style="border: none;">Name</th>
                        <th style="border: none;">Expansion</th>
                        <th style="border: none;"><abbr title="Set Code">Code</abbr></th>
                        <th style="border: none;"><abbr title="Language">Lang</abbr></th>
                        <th style="border: none;">Foil</th>
                        <th style="border: none;"><abbr title="Condition">Cond.</abbr></th>
                        <th style="border: none;"><abbr title="Acquired Price">Acq. Price</abbr></th>
                        <th style="border: none;"><abbr title="Acquired Date">Acq. Date</abbr></th>
                        <th style="border: none;"></th>
                    </tr>
                </thead>
                <tbody>
                    <import-item-row
                      v-for="(card, index) in cards"
                      :key="`importCard${index}`"
                      :listtype="`card`"
                      :ckey="index"
                      :card="card"
                    ></import-item-row>
                </tbody>
            </table>

        </div>
    </div>
    <!-- start errors -->
    <div v-if="errorCards.length > 0">
        <br>
        <h2 class="title is-size-3">{{errorCards.length}} Items Failed to Match <em class="has-text-grey-dark"> - Fix or Remove</em></h2>
        <div class="cardsThatFailedToLoad">
            <table class="table is-striped">
                <thead>
                    <tr class="has-background-black" style="border: none;">
                        <th style="border: none;"><abbr title="Quantity">QTY</abbr></th>
                        <th style="border: none;">Name</th>
                        <th colspan="2" style="border: none;">Expansion / Set Code</th>

                        <th style="border: none;"><abbr title="Language">Lang</abbr></th>
                        <th style="border: none;">Foil</th>
                        <th style="border: none;"><abbr title="Condition">Cond.</abbr></th>
                        <th style="border: none;"><abbr title="Acquired Price">Acq. Price</abbr></th>
                        <th style="border: none;"><abbr title="Acquired Date">Acq. Date</abbr></th>
                        <th style="border: none;"></th>
                    </tr>
                </thead>
                <tbody>
            <import-item-row
                    v-for="(card, index) in errorCards"
                    :card="card"
                    :listtype="`error`"
                    :key="`errorCard${index}`"
                    :ckey="index"
                    ></import-item-row>
                </tbody>

            </table>

        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import ItemInspectorWrapper from '~/components/items/ItemInspectorWrapper.vue'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue'
import ImportItemRow from '~/components/import/ImportItemRow.vue'
export default {
  name: 'Import',
  components: {
    EchoBreadCrumbs,
    ItemInspectorWrapper,
    ImportItemRow
  },
  data () {
    return {
      title: 'Import Card via CSV, XLS, or TCGplayer Scanner App',
      fileBody: '',
      bulkValue: 0,
      bulkAVGValue: 0,
      file: null,
      cards: [],
      errorCards: [],
      parsingErrors: [],
      ready: false,
      totals: {
          imported: 0,
          queued: 0,
          needFixing: 0
      },
      masterLookup: {}
    }
  },
  async created(){
    this.getMasterLookup()
  },
  watch: {
      errorCards: function() {
          this.errorCards.forEach((card,index) => {
              let setupper = card.set_code.toUpperCase()
              if(undefined !== this.masterLookup[setupper]){
                  if(undefined !== this.masterLookup[setupper][card.name.toLowerCase()]){

                      card.extra_details.echo_id = this.masterLookup[setupper][card.name.toLowerCase()]
                      this.cards.push(card)
                      this.$delete(this.errorCards, index)
                  }
              } else {
                this.$buefy.toast.open({
                  message: "No Match for "+card.name+ " in "+card.expansion,
                  type: 'is-warning'
                })
              }
          })
      },
      bulkValue: function() {
          this.bulkAVGValue = this.avgAcquiredValue
      }
  },
  methods: {
    cancelRestart: function() {

      this.cards = []
      this.errorCards = []
      this.parsingErrors = []
      this.bulkAVGValue = 0
      this.bulkValue = 0
      this.ready = false

    },
    readFile: async function(event) {
        const input = event.target
        this.file = input.files[0]
        await this.sendToCloudFunction()
        // let $this = this
        // if ('files' in input && input.files.length > 0) {
        //     this.readFileContent(input.files[0]).then(content => {
        //
        //         $this.fileBody = content
        //         $this.sendToCloudFunction()
        //     }).catch(error => console.log(error))
        // }
    },
    readFileContent:  function (file) {
        this.ready = false
        const reader = new FileReader()
        return new Promise((resolve, reject) => {
            reader.onload = event => resolve(event.target.result)
            reader.onerror = error => reject(error)
            reader.readAsText(file)
        })
    },
    async startImport() {

        this.$buefy.toast.open({
            message: 'Import Starting',
            type: 'is-success'
          })

        let startLength = this.cards.length - 1

        // start from the top and remove down
        for (let i = startLength; i >= 0; i--) {
            var item = this.cards[i]

            let results = await this.importCard(item);
            if(results.status == 'success'){
                this.$delete(this.cards, i);
            } else {
                this.errorCards.push(item)
                this.$delete(this.cards, i);
            }
        }

    },
    async importCard(card) {

        // acquired price, if it has it on head, else, take the bulk value
        let acprice = card.acquire_price.replace('$','')
        if(!Number.isNaN(Number.parseFloat(acprice))) {
          card.acquired_price = acprice
        } else if(this.bulkValue > 0){
          card.acquired_price = this.bulkAVGValue
        }

        const json = await this.$echomtg.inventoryAdd(card.extra_details.echo_id, card)

        this.$buefy.toast.open({
          message: json.message,
          type: 'is-success'
        })

        return json;

    },
    async getMasterLookup() {

      let endpoint = 'https://api.echomtg.com/api/data/lookup/';

      const res =await fetch(endpoint)
      const json = await res.json();
      this.masterLookup = json;

    },
    async sendToCloudFunction(){

        this.$buefy.toast.open({
          message: `Uploading CSV File`,
          type: 'is-success'
        })
        let endpoint = 'https://us-central1-echo-csv.cloudfunctions.net/echo-csv/upload';
        var formData  = new FormData();
        formData.append('csvFile', this.file);

        const res = await fetch(endpoint, {
            method: 'POST',
            body: formData

        });
        const json = await res.json();

        this.cards = []
        this.errorCards = []
        this.parsingErrors = []
        this.cards = json.cards
        this.errorCards = json.errors
        this.parsingErrors = json.parsingErrors
        this.ready = true


    }
  },
  computed: {
    totalQueued: function () {
        return this.cards.length
    },
    totalRead: function() {
        return this.errorCards.length + this.cards.length
    },
    totalCardsWithQTY: function() {
        let total = 0
        this.cards.forEach(card => {
            total += parseInt(card.quantity)
        })
        return total
    },
    totalErrorCardsWithQTY: function() {
        let total = 0
        this.errorCards.forEach(card => {
            total += parseInt(card.quantity)
        })
        return total
    },
    totalReadWithQTY: function() {

        return this.totalErrorCardsWithQTY + this.totalCardsWithQTY
    },
    totalNeedsFixing: function () {
        return this.errorCards.length
    },
    estimatedTime: function() {
        // 120 for 2 a second
        return this.cards.length > 0 ? (this.cards.length / 120).toFixed(2) : 0.00;
    },
    avgAcquiredValue: function(){
        if (this.bulkValue == 0) return 'Market';
        let avg = (this.bulkValue / this.totalReadWithQTY).toFixed(2);
        if(avg < .01) avg = .01
        return avg
    },
    crumbs() {
      return [
        {
          label: 'Apps',
          url: '/apps/',
          icon: ''
        },
        {
          label: 'Import',
          url: '/apps/import/',
          icon: 'table-arrow-down'
        }
      ]
    },
    ...mapState([
      'sets',
      'user',
      'authenticated'
    ])
  },
  head () {
      return {
          title: `Earnings: Track items sold or traded`,
          meta: [
            { hid: 'og:image', property: 'og:image', content: `https://assets.echomtg.com/images/echomtg-og-default.png` },
            {
              hid: 'description',
              name: 'description',
              content:  `Track items sold or traded`
            }
          ]
      }
    }
}
</script>
