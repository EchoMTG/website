<template>
<div>
    <h2 class="title is-size-5">Start a New Deck/List </h2>
        <div class="box">
            <div class="field">
              <label class="label is-small">
                <span class="fa fa-tag"></span>List/Deck Name
              </label>
              <div class="control">
                <input class="input is-small" v-model="newDeck.name" type="text" id="newDeckName" placeholder="Deck or List Name">
              </div>
            </div>
            <div class="field ">
              <label class="label is-small">
                  <span class="fa fa-list-alt"></span>
                  Description <span class="has-text-grey-light">(optional)</span>
              </label>
              <div class="control">
                <textarea class="textarea is-small" id="newDeckDescription" v-model="newDeck.description" placeholder="Description of your deck"></textarea>
              </div>
            </div>
            <div class="field">
            <label class="label is-small">
                <span class="fa fa-file-text-o"></span>
                Import Deck File <span class="has-text-grey-light">(optional)</span>
            </label>
          <div class="file is-small has-name">
            <label class="file-label">
              <input class="file-input" type="file" name="file" @change="importList" id="fileinput">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fa fa-upload"></i>
                </span>
                <span class="file-label">
                  Select File
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
                    <span class="icon">
                        <i class="fa fa-lightbulb-o"></i>
                    </span>
                    <span>Get More Lists, Upgrade Plan</span>
                </a>
              
                <button v-if="this.$parent.lists.length <= this.$parent.user.planObject.list_cap" class="button is-success" @click="createList">
                    <span class="icon">
                    <i class="fa fa-plus"></i>
                    </span>
                    <span>Create New List</span>
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data () {
        return {
            newDeck: {
                name: '',
                description: ''
            }
        }
    },
    methods: {
        createList: function (event) {
            let token = this.$cookies.get('token');
            let bodyFormData = new FormData();
            bodyFormData.set('name', this.newDeck.name);
            bodyFormData.set('description', this.newDeck.description);
            let endpoint = `${process.env.API_DOMAIN}lists/create/?&auth=${token}`;
            let $this = this;
            axios({
                method: 'post',
                url: endpoint,
                data: bodyFormData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            }).then(function(response) {
                let newList = response.data.data;
                $this.$parent.lists.push(newList);
                $this.$parent.sortList();
                $this.newDeck.name = ''
                $this.newDeck.description = ''
                createGrowl($this.newDeck.name + ' created.');
                if($this.newDeck.hasOwnProperty("cards")){
                    $this.addImportedCards(newList.id);
                }
            });
        },
        addImportedCards(listID){
            let token = this.$cookies.get('token');
            var add_endpoint = `${process.env.API_DOMAIN}lists/add/?&auth=${token}`;
            let $this = this;

            for (let index in this.newDeck.cards.main) {
                let card = this.newDeck.cards.main[index];
                let bodyFormData = new FormData();
                bodyFormData.set('list', listID);
                bodyFormData.set('echomtg_id', card.echoid);
                bodyFormData.set('quantity', card.quantity);

                axios({
                    method: 'post',
                    url: add_endpoint,
                    data: bodyFormData,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                }).then(function(response){
                    createGrowl(card.name + ' added to ' + $this.newDeck.name);
                });
            }

            for (let index in this.newDeck.cards.side) {
                let card = this.newDeck.cards.side[index];
                let bodyFormData = new FormData();
                bodyFormData.set('list', listID);
                bodyFormData.set('echomtg_id', card.echoid);
                bodyFormData.set('quantity', card.quantity);
                bodyFormData.set('sb', 1);

                axios({
                    method: 'post',
                    url: add_endpoint,
                    data: bodyFormData,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                }).then(function(response){
                    createGrowl(card.name + ' added to ' + $this.newDeck.name);
                });

            }
        },
        filterList: function(){
            this.$parent.lists = this.$parent.lists.filter(function(item) {
                return item.Title && item.Specifications.some(function(specification) {
                    return specification.Name === "Watt";
                });
            });
        },
        importList: function(event){
            let f = event.target.files[0];
            if (f) {
                let r = new FileReader();
                r.onload = function(e) {
                    this.newDeck = {};
                    this.newDeck.importFilename = f.name;
                    this.newDeck.importContents = e.target.result;
                    this.newDeck.cards = {};
                    document.querySelector('.file-name').innerHTML = this.newDeck.importFilename;
                    let endpoint = api_url + 'lists/deck_reader/'
                    let bodyFormData = new FormData();
                    bodyFormData.set('text', this.newDeck.importContents);
                    let $this = this;
                    axios({
                        method: 'post',
                        url: endpoint,
                        data: bodyFormData,
                        config: { headers: {'Content-Type': 'multipart/form-data' }}
                    }).then(function(response){
                        $this.newDeck.cards = response.data.deck;
                        $this.newDeck.message = response.data.message;
                        createGrowl($this.newDeck.importFilename + ' captured successfully.');
                    });


                }.bind(this);

                r.readAsText(f);
            } else {
                createGrowl($this.newDeck.importFilename + ' Failed to Load.','error');
            }
        }
    }
}
</script>

<style>

</style>