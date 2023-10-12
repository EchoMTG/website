<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />
     <section v-if="this.ready != true" class="hero is-small is-info mb-5">
        <div class="hero-body">
            <h1 class="title is-size-4">
              <span v-if="this.scannerApp == true">Mobile Scanner</span>
              <span v-if="this.csvApp == true">CSV</span>
              Importer
              <b-button  icon-left="arrow-left" v-if="this.scannerApp == true || this.csvApp == true" @click="resetSelection" size="is-small" >
                Back to Import Selection
              </b-button>
            </h1>
            <p class="subtitle is-size-6">Upload a Custom CSV, Deckbox Export, Delver Lens, TCGplayer scanner app, or others Export File. After importing, you can change languages, conditions, and set a bulk acquired price. Do this before clicking start import.</p>
        </div>
    </section>
    <full-ad title="You Must be Logged in to Use the Import App"
      image="https://assets.echomtg.com/images/product/collection-app-2023.png"
    v-if="!authenticated"/>
    <span v-if="authenticated">

        <div class="columns">
          <div class="column has-text-centered" v-if="this.scannerApp == false && this.csvApp == false">
            <div class="container">
              <b-button type="is-primary" icon-left="cellphone-arrow-down" class="mb-3" @click="scannerApp = true" size="is-large">Import Mobile Scanner</b-button>
               <p>Scanner apps make inputting cards into your inventory a breeze by using your camera to read your cards. Some app support importing by copying an pasting an export.
                Two popular apps are <a href="https://play.google.com/store/apps/details?id=com.tcgplayer.tcgplayer&hl=en" target="_blank"> TCGplayer App Android</a>, <a href="https://itunes.apple.com/us/app/tcgplayer/id1247645833?mt=8" target="_blank"> TCGplayer App iOS</a>, and <a target="_blank" href="https://play.google.com/store/apps/details?id=delverslab.delverlens">Delver Lens Android</a>.</p>

              <hr />
              <b-button type="is-primary" class="mb-3" icon-left="table-arrow-down" @click="csvApp = true" size="is-large">Import CSV Export</b-button>
              <p>Import an exported CSV from other popular apps, or upload your own import CSV file.</p>
            </div>
          </div>

          <div class="column" v-if="this.scannerApp == true">
              Scanner app
          </div>
          <!-- CSV starter info area -->
          <div class="column" v-if="this.csvApp == true">
              <div class="uploader" v-if="this.ready != true">

                  <div class="mx-5">
                  <div class="message has-background-light has-text-black p-3">
                      <b-field class="file is-primary" :class="{'has-name': !!file}">
                          <b-upload type="is-success" v-model="file" class="file-label" accept=".csv" required validationMessage="Please select a file">
                              <span class="file-cta">
                                  <b-icon class="file-icon" icon="upload"></b-icon>
                                  <span class="file-label">Click to upload (Only .csv)</span>
                              </span>
                              <span class="file-name" v-if="file">
                                  {{ file.name }}
                              </span>
                          </b-upload>
                      </b-field>
                      <p class="m-2"><b-icon icon="alert" size="is-small" /> Note if your CSV row count is greater than your account threshold, you will only be able to import to your cap. Upgrade your account <a href="/plans/">here</a>.</p>
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
                              <h3>Supported Exports Out of the Box</h3>
                              <ul>
                                  <li>TCGplayer App CSV Export</li>
                                  <li>Delver Lens (pick EchoMTG CSV export)</li>
                                  <li>Deckbox.org CSV Export</li>
                                  <li>Custom CSV (<a href="https://assets.echomtg.com/examples/EchoMTG-Upload-Template.csv" target="_blank">download example</a>)</li>
                              </ul>
                              <h3>Working with Custom CSVs</h3>
                              <p>Common columns headers are card, card name, name, expansion, set, set code, tcgplayer_id, price acquired, bought price, date, date acquired, language, lang, condition</p>

                              </div>
                      </div>


                      <div class="column">
                          <div class="container content">
                              <h4>Required Columns</h4>
                              <ul>
                                  <li>Name (Card Name)</li>
                                  <li>Set Code (Three Letter Code)</li>
                                  <li style="list-style:none"><strong>or</strong></li>
                                  <li>TCGplayer ID (tcg player id)</li>
                                  <li style="list-style:none"><strong>or</strong></li>
                                  <li>Collector Number (Card Name)</li>
                                  <li>Set Code (Three Letter Code)</li>
                              </ul>
                              <h4>Optional Columns</h4>
                              <ul>
                                      <li>Foil - True (1) or False (0)</li>
                                  <li>Language </li>
                                  <li>Acquired Price (What you paid for the item)</li>
                                  <li>Quantity (Number to import) default to (1)</li>
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
                              <h3>Bulk Price</h3>
                              <p>Enter a bulk price and EchoMTG will divide the total cards to import by this price and use that for the default acquired price. If a card has a custom acquired price, the custom price will be used.</p>

                              <h3>Handling Errors</h3>
                              <p>The importer will put your list into two sets, ready to import and errors. A summary will explain how many are in each category.</p>
                              <p>Cards that are errors can be fixed by searching for their </p>
                              <p>Note EchoMTG uses the TCGplayer naming convention for cards. That means the name and set code needs to match what it is listed on TCGplayer as in order for EchoMTG to find a match.</p>

                          </div>
                      </div>
                  </div>

                  </div>
              </div>
              <article class="message " v-if="this.ready == true">
                  <div class="message-header has-background-info">
                      <h2 class="is-size-5 has-text-white has-text-weight-semibold">
                        Import Summary:
                        {{cards.length}} Items Correctly Matched <em class="has-text-dark">- Click the Green Start Import Button</em>


                      </h2>

                      <p class="pull-right">
                          <button class="import is-dark is-outlined button has-icons-left" @click="cancelRestart()" aria-label="cancel import">


                              <b-icon icon="step-backward" size="is-small" />

                              <span>Start Over</span>
                          </button>
                          <b-button icon-left="upload" class="has-background-success has-text-white" variant="contained" @click="startImport()" aria-label="start import" >
                            Start Importing Matched Cards
                          </b-button>
                      </p>
                  </div>
                  <nav  class="message-body has-background-info level is-mobile" >
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
                                  <p class="title">{{totalQueued}} <small class="is-size-4">({{totalCardsWithQTY}} QTY)</small></p>
                              </div>
                          </div>
                          <div class="level-item has-text-centered">
                              <div>
                                  <p class="heading">Need to Be Fixed</p>
                                  <p class="title">{{totalNeedsFixing}} <small class="is-size-4">({{totalErrorCardsWithQTY}} QTY)</small></p>
                              </div>
                          </div>
                          <div class="level-item has-text-centered">
                              <div>
                                  <p class="heading">Minutes to Import</p>
                                  <p class="title">{{estimatedTime}}</p>
                              </div>
                          </div>

                      </nav>
              </article>
          </div>
          <!-- CSV starter info area -->
        </div>

        <!-- Start good cards -->
        <div v-if="cards.length > 0">

            <div class="cardsToInput table-container">
                <table class="table is-striped is-fullwidth">
                    <thead >
                        <tr style="border: none;">
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
    </span>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import ItemInspectorWrapper from '~/components/items/ItemInspectorWrapper.vue'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue'
import ImportItemRow from '~/components/import/ImportItemRow.vue'
import FullAd from '~/components/cta/FullAd.vue'

export default {
  name: 'Import',
  components: {
    EchoBreadCrumbs,
    ItemInspectorWrapper,
    ImportItemRow,
    FullAd
  },
  data () {
    return {
      title: 'Import Card via CSV, XLS, or TCGplayer Scanner App',
      scannerApp: false,
      csvApp: false,
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
      },
      async file(){
        await this.sendToCloudFunction()
      }
  },
  methods: {
    resetSelection() {
      this.scannerApp = false;
      this.csvApp = false;
    },
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
          title: `Magic the Gathering App Importer`,
          meta: [
            { hid: 'og:image', property: 'og:image', content: `https://assets.echomtg.com/images/echomtg-og-default.png` },
            {
              hid: 'description',
              name: 'description',
              content:  `Upload a Custom CSV, Deckbox Export, Delver Lens, TCGplayer scanner app, or others Export File. After importing, you can change languages, conditions, and set a bulk acquired price. Do this before clicking start import.`
            }
          ]
      }
    }
}
</script>
