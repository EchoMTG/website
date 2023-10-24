<template>
<div class="is-relative">
    <b-loading v-model="loading" :is-full-page="false" />
    <h2 class="title is-size-5">Start a New Deck/List </h2>
        <div :class="`box ` + (isDarkModeActive == 1 ? 'has-background-black' : '')">
            <div class="field">
              <label class="label is-small">
                <b-icon icon="text-short" size="is-small" /> List/Deck Name
              </label>
              <div class="control">
                <input class="input is-small" v-model="name" type="text" id="newDeckName" placeholder="Deck or List Name">
              </div>
            </div>
            <div class="field ">
              <label class="label is-small">
                  <b-icon icon="text" size="is-small" />

                  Description <span class="has-text-grey-light">(optional)</span>
              </label>
              <div class="control">
                <textarea class="textarea is-small" id="newDeckDescription" v-model="newDeck.description" placeholder="Description of your deck"></textarea>
              </div>
            </div>
            <div class="field">
            <label class="label is-small">
                <b-icon icon="file" size="is-small" />
                Import Deck File <span class="has-text-grey-light">(optional)</span>
            </label>
          <div class="file is-small has-name">
            <label class="file-label">
              <input class="file-input" type="file" name="file" @change="importList" id="fileinput">
              <span class="file-cta">
                <span class="file-icon">
                    <b-icon icon="upload" size="is-small" />
                </span>
                <span class="file-label" v-html="this.newDeck?.importFilename ? this.newDeck.importFilename : 'Select File'">

                </span>
              </span>
              <span class="file-name">
               <strong>.TXT</strong> | <strong>.DEK</strong> | <strong>.COD</strong> | <strong>MODO</strong>
              </span>
            </label>
          </div>
        </div>
        <br>
        <div class="field is-grouped">
            <div class="control">
                <a v-if="this.$parent.lists.length >= this.$parent.user.planObject.list_cap" class="button is-dark is-small is-pulled-right" href="/plans/">
                    <b-icon icon="lightbulb" size="is-small" />



                    <span>Get More Lists, Upgrade Plan</span>
                </a>

                <button :disabled="!isReady" v-if="this.$parent.lists.length <= this.$parent.user.planObject.list_cap" class="button is-success" @click="createList">
                    <b-icon icon="plus" size="is-small" />
                    <span>Create New List</span>
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    data () {
        return {
            name: '',
            newDeck: {
                name: '',
                description: ''
            },
            isReady: false,
            loading: false
        }
    },
    computed: {
      ...mapState([
        'isDarkModeActive'
      ])
    },
    watch:{

      name() {
        this.newDeck.name = this.name
        if(this.name != ''){
          this.isReady = true;
        } else {
          this.isReady = false;
        }
      }
    },
    methods: {
        async createList(event) {

            let bodyFormData = new FormData();
            bodyFormData.set('name', this.name);
            bodyFormData.set('description', this.newDeck.description);
            let endpoint = `${this.$config.API_DOMAIN}lists/create/`;


            const res = await fetch(endpoint,{
              method: 'post',
              headers:this.$echomtg.getUserHeadersNoJSON(),
              body: bodyFormData
            })
            const data = await res.json();
            this.$buefy.toast.open({
              message: data.message
            })

            let newList = data.data;
            this.$parent.lists.push(newList);
            this.$parent.sortList();
            this.newDeck.name = ''
            this.newDeck.description = ''


            if(this.newDeck.hasOwnProperty("cards")){
                this.addImportedCards(newList.id);
            }
        },
        async addImportedCards(listID){

            var add_endpoint = `${this.$config.API_DOMAIN}lists/add/`;
            let res, data;

            for (let index in this.newDeck.cards.main) {
                let card = this.newDeck.cards.main[index];
                let bodyFormData = new FormData();
                bodyFormData.set('list', listID);
                bodyFormData.set('echomtg_id', card.echoid);
                bodyFormData.set('quantity', card.quantity);

                res = await fetch(add_endpoint,{
                  method: 'post',
                  headers:this.$echomtg.getUserHeadersNoJSON(),
                  body: bodyFormData
                })
                data = await res.json();
                this.$buefy.toast.open({
                  message: data.message
                })
            }

            for (let index in this.newDeck.cards.side) {
                let card = this.newDeck.cards.side[index];
                let bodyFormData = new FormData();
                bodyFormData.set('list', listID);
                bodyFormData.set('echomtg_id', card.echoid);
                bodyFormData.set('quantity', card.quantity);
                bodyFormData.set('sb', 1);

                res = await fetch(add_endpoint,{
                  method: 'post',
                  headers:this.$echomtg.getUserHeadersNoJSON(),
                  body: bodyFormData
                })
                data = await res.json();
                this.$buefy.toast.open({
                  message: data.message
                })

            }
        },
        filterList: function(){
            this.$parent.lists = this.$parent.lists.filter(function(item) {
                return item.Title && item.Specifications.some(function(specification) {
                    return specification.Name === "Watt";
                });
            });
        },
        async importList(event){

            let f = event.target.files[0];
            if (f) {

                let r = new FileReader();
                r.onload = async function(e) {
                    this.isReady = false;
                    this.loading = true;
                    this.newDeck = {};
                    this.newDeck.importFilename = f.name;
                    this.newDeck.importContents = e.target.result;
                    this.newDeck.cards = {};


                    let endpoint = this.$echomtg.getAPIURL() + 'lists/deck_reader/'


                    let bodyFormData = new FormData();
                    bodyFormData.append('text', this.newDeck.importContents);

                    const res = await fetch(endpoint, {
                      method: 'post',
                      headers: this.$echomtg.getUserHeadersNoJSON(),
                      body : bodyFormData
                    });
                    const data = await res.json();
                    this.$buefy.toast.open({
                      message: this.newDeck.importFilename + ' captured successfully. ' + `${data.message}`,
                    })
                    this.newDeck.cards = data.deck;
                    this.newDeck.message = data.message;
                    this.loading = false;
                    if(this.name != ''){
                      this.isReady = true
                    }

                }.bind(this);

                r.readAsText(f);
            } else {
               this.$buefy.toast.open({
                  message: this.newDeck.importFilename + ' Failed to Load.',
                  type: 'is-danger'
                })

            }

        }
    }
}
</script>

<style>

</style>
