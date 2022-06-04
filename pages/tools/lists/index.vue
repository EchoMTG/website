<template>
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
                        <tr is="list-item" v-for="(list, index) in lists" :item="list" :index="index" :key="index" />
                    </tbody>
                </table>
            </div>
            <div class="column is-one-third">
                <create-list></create-list>
            </div>
            <div class="modal" id="delete-modal">
                <div class="modal-background"></div>
                <div class="modal-card">
                <!-- <section class="modal-card-body">
                    Delete <span v-html="targetDeck.name"></span>?
                </section> -->
                    <footer class="modal-card-foot">
                        <button class="button is-danger" v-bind:data-list-key="targetDeckKey" id="delete-list-button" @click="deleteList">Delete</button>
                        <button class="button is-dark" onclick="document.querySelector('#delete-modal').classList.remove('is-active')">Cancel</button>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import CreateList from "@/components/list/CreateList.vue";
import ListItem from "@/components/list/ListItem.vue";
  export default {
      components: { CreateList, ListItem },
      data () {
        return {
            lists: [],
            targetDeck: {'name':'deck'},
            targetDeckKey: 0,
            user: { planObject: {'list_cap':5}}
        }
    },
    methods: {
        deleteList(event) {
            let token = this.$cookies.get('token');
            let listKey = event.target.getAttribute('data-list-key');

            console.log(this.lists[listKey].id);
            let bodyFormData = new FormData();
            bodyFormData.set('list', this.lists[listKey].id);
            bodyFormData.set('status', 0);
            let endpoint = `${process.env.API_DOMAIN}lists/toggle_status/?&auth=${token}`;
            let $this = this
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
        sortList(){
            this.lists.sort((obj1, obj2) => obj2.id - obj1.id);
        },
    },
    created(){
        let $this = this
        let token = this.$cookies.get('token');
        let url = `${process.env.API_DOMAIN}lists/all/?&auth=${token}`
        axios.get(url)
            .then(function(response){
                const mapped = Object.entries(response.data.lists).map(([k,v]) => v);
                // var result = Object.keys(response.data.lists).map((key) => { return { index: response.data.lists[key]}});
                mapped.forEach(item => {
                    $this.lists.push(item)
                    // $this.targetDeck = item;
                    // $this.targetDeckKey = index;
                })
                
                // for(index in mapped){
                //     $this.lists.push(response.data.lists[index])
                //     $this.targetDeck = response.data.lists[index];
                //     $this.targetDeckKey = index;
                // }
                $this.sortList();
            });

        axios.get(`${process.env.API_DOMAIN}user/meta/?&auth=${token}`)
            .then(function(response){
                $this.user = response.data.user;
            });
    }
  }
</script>
