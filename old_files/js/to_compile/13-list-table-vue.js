
var api_url = (window.location.hostname == 'dev.echomtg.com') ? 'https://dev.echomtg.com/api/' : 'https://www.echomtg.com/api/';


// table row for lists
Vue.component('dashboard-list-tr', {
    props: ['item'],
    template: `<tr>
                <td @click="loadList" >
                    <a v-on:click="loadList" class="has-text-white has-text-weight-bold">
                    <span class="icon"><i class="fa fa-edit"></i></span>
                    <span>{{item.name}}</span>
                    </a>
                    
                   </td>
                <td @click="loadList">{{item.date_created}}</td>
                <td>
                    <button v-if="item.public == 0" class="button is-primary is-small"  @click="makePublic">Make Sharable</button>
                    <button v-if="item.public == 1" class="button is-info is-small"  @click="openPublicLink">
                    <span class="icon">
                        <i class="fa fa-share"></i>
                    </span>
                    <span>open public link</span>
                    </button>
                    <button class="button is-danger is-small modal-button is-pulled-right"  @click="openDeleteModal($vnode.key)" aria-haspopup="true">
                        <i class="fa fa-trash-o"></i>
                    </button>
                </td>
               </tr>`,
    methods: {
        loadList: function (event) {
            window.location.href = '/lists/'+this.item.id+'/';

        },
        openPublicLink: function (event) {
            window.location.href = '/decks/list/'+this.item.hash+'/';

        },
        openDeleteModal: function(key){
            document.querySelector('#delete-modal').classList.add("is-active");
            this.$parent.targetDeck = this.$parent.lists[key];
            this.$parent.targetDeckKey = key;
            //document.querySelector('#delete-list-button').setAttribute("data-list-key",key);
        },
        makePublic: function(key){

            let listID = this.$parent.lists[key].id;
            let $this = this;

            let endpoint = api_url + 'lists/toggle_public/';
            let bodyFormData = new FormData();
            bodyFormData.set('list', listID);
            bodyFormData.set('public', 1);

            axios({
                method: 'post',
                url: endpoint,
                data: bodyFormData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            }).then(function(response){

                $this.$set($this.$parent.lists, key, response.data.list);
                createGrowl(' made public ');
            });

        }

    }
});

// table row for lists
Vue.component('create-list', {
    template: `
        <div>
        
        <h2 class="title is-size-5">Start a New Deck/List </h2>
        
        <div class="box">
            <div class="field">
              <label class="label is-small">
                <span class="fa fa-tag"></span>
                List/Deck Name
              </label>
              <div class="control">
                <input class="input is-small" type="text" id="newDeckName" placeholder="Deck or List Name">
              </div>
            </div>
        
            
            <div class="field ">
              <label class="label is-small">
                  <span class="fa fa-list-alt"></span>
                  Description <span class="has-text-grey-light">(optional)</span>
              </label>
              <div class="control">
                <textarea class="textarea is-small" id="newDeckDescription" placeholder="Description of your deck"></textarea>
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
    `,
    data () {
        return {
            newDeck: {}
        }
    },
    methods: {
        createList: function (event) {
            let name = document.getElementById("newDeckName").value;
            let description = document.getElementById("newDeckDescription").value;
            let bodyFormData = new FormData();

            bodyFormData.set('name', name);
            this.newDeck.name = name;
            bodyFormData.set('description', description);

            let endpoint = api_url + `lists/create/`;
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
                createGrowl($this.newDeck.name + ' created.');
                if($this.newDeck.hasOwnProperty("cards")){
                    $this.addImportedCards(newList.id);

                }


            });
        },
        addImportedCards(listID){

            var add_endpoint = api_url + 'lists/add/';
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
});

Vue.component('dashboard-list-table-view',{

    template: `
      <div>
        <nav class="breadcrumb" aria-label="breadcrumbs">
         
          <ul>
            <li class="is-active"><a href="/lists/"><span class="fa fa-archive has-text-grey-light"></span>&nbsp; Lists</a></li>
            
           
          </ul>
          
          
          
        </nav>
         <div class="lists2">   
             <div class="columns">
             
                 <div class="column">
                 <h2 class="title is-size-5">
                 Your Lists 
                 <span class="has-text-grey">
                    (<span v-html="lists.length"></span> of <span v-html="user.planObject.list_cap"></span>)
                 </span>
                    <a v-if="lists.length >= user.planObject.list_cap" class="button is-success is-small is-pulled-right" href="/plans/">
                    <span class="icon">
                        <i class="fa fa-lightbulb-o"></i>
                    </span>
                    <span>Get More Lists, Upgrade Plan</span>
                    </a>
                 </h2>
                     
                     <table v-if="lists.length > 0" class="table is-hoverable is-bordered is-fullwidth">
                        
                         <tbody>
                         <tr is="dashboard-list-tr"
                             v-for="(list, index) in lists"
                             v-bind:item="list"
                             v-bind:key="index"></tr>
                         </tbody>
                     </table>
                 </div>
                 <div class="column is-one-third">
                   <create-list></create-list>
                </div>
                 <div class="modal" id="delete-modal">
                  <div class="modal-background"></div>
                  <div class="modal-card">
                    <section class="modal-card-body">
                      Delete <span v-html="targetDeck.name"></span>?
                    </section>
                    <footer class="modal-card-foot">
                      <button class="button is-danger" v-bind:data-list-key="targetDeckKey" id="delete-list-button" @click="deleteList">Delete</button>
                      <button class="button is-dark" onclick="document.querySelector('#delete-modal').classList.remove('is-active')">Cancel</button>
                    </footer>
                  </div>
</div>
             </div>
          </div>
        </div>
    `,
    data () {
        return {
            lists: [],
            targetDeck: {'name':'deck'},
            targetDeckKey: 0,
            user: {'planObject':{'list_cap':5}}
        }
    },
    methods: {

        deleteList: function(event) {
            let $this = this;
            let listKey = event.target.getAttribute('data-list-key');

            let bodyFormData = new FormData();
            bodyFormData.set('list', this.lists[listKey].id);
            bodyFormData.set('status', 0);
            let endpoint = api_url + `lists/toggle_status/`;

            axios({
                method: 'post',
                url: endpoint,
                data: bodyFormData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            }).then(function(){
                $this.lists.splice(listKey, 1);
                document.querySelector('#delete-modal').classList.remove("is-active");
            });
        },
        sortList: function(){
            this.lists.sort(function(obj1, obj2) {
                // Ascending: first age less than the previous
                return  obj2.id - obj1.id;
            });
        }
    },
    created () {
        let $this = this;
        axios
            .get(api_url + 'lists/all/')
            .then(function(response){
                for(index in response.data.lists){
                    $this.lists.push(response.data.lists[index])
                    $this.targetDeck = response.data.lists[index];
                    $this.targetDeckKey = index;
                }
                $this.sortList();

            });

        axios
            .get(api_url + 'user/meta/')
            .then(function(response){
                $this.user = response.data.user;
            });

    }

})

