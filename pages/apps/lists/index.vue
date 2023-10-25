<template>
<div>
   <echo-bread-crumbs :data="crumbs"/>
   <full-ad
      title="You Must be Logged in to Use Lists and Decks"
      v-if="!authenticated" />
    <span v-if="authenticated">
        <div class="lists2">
            <div class="columns">
                <div class="column">
                    <h2 class="title is-size-5 p-5">
                        Your Lists and Decks
                        <span class="has-text-grey">
                            (<span v-html="lists.length"></span> of <span v-html="user.planObject.list_cap"></span>)
                        </span>
                        <a v-if="lists.length >= user.planObject.list_cap" class="button is-success is-small is-pulled-right" href="/plans/">
                            <b-icon icon="lightbulb" size="is-small" />
                            <span>Get More Lists, Upgrade Plan</span>
                        </a>
                    </h2>
                    <b-field class="px-3">
                        <b-input placeholder="Search by list name..."
                            type="search"
                            v-model="search"
                            icon="magnify">
                        </b-input>
                    </b-field>
                    <table v-if="lists.length > 0" class="table is-striped is-bordered is-fullwidth">
                        <tbody>
                            <tr is="list-item" v-for="(list, index) in filteredLists" :item="list" :index="index" :key="index" />
                        </tbody>
                    </table>
                </div>
                <div class="column is-one-third">
                    <create-list class="pr-3 pt-5"></create-list>
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
    </span>
</div>
</template>

<script>

import { mapState } from 'vuex'
import CreateList from "@/components/list/CreateList.vue";
import ListItem from "@/components/list/ListItem.vue";
import EchoBreadCrumbs from "@/components/navigation/EchoBreadCrumbs.vue";
import FullAd from '~/components/cta/FullAd.vue'

  export default {
    components: {
      CreateList,
      ListItem,
      EchoBreadCrumbs,
      FullAd

    },
    data () {
      return {
          lists: [],
          targetDeck: {'name':'deck'},
          targetDeckKey: 0,
          search: ''
      }
    },
    computed: {
      filteredLists() {
        if(this.search == '') return this.lists;
        return this.lists.filter((list) => list.name.toLowerCase().includes(this.search.toLowerCase()))
      },
      crumbs() {
        return [
          {
            label: 'Apps',
            url: '/apps/',
            icon: ''
          },
          {
            label: 'Lists and Decks',
            url: '/apps/lists/',
            icon: ''
          }
        ]
      },
      ...mapState([
        'user',
        'authenticated'
      ])
    },
    async fetch(){

        try{
            const res = await this.$echomtg.getAllLists();

            const mapped = Object.entries(res.lists).map(([k,v]) => v);

            mapped.forEach(item => {
                this.lists.push(item)
            })

            this.sortList();
        } catch (err){

        }
    },
    methods: {
        async deleteList(event) {
            let token = this.$cookies.get('token');
            let listKey = event.target.getAttribute('data-list-key');


            let bodyFormData = new FormData();
            bodyFormData.set('list', this.lists[listKey].id);
            bodyFormData.set('status', 0);
            let endpoint = `${this.$config.API_DOMAIN}lists/toggle_status/?&auth=${token}`;


            const res = await fetch(endpoint,{
              method: 'post',
              headers: this.$echomtg.getS2SHeadersNoJSON(),
              body: bodyFormData

            })

            const data = await res.json()
            this.lists.splice(listKey, 1);
            document.querySelector('#delete-modal').classList.remove("is-active");

        },
        sortList(){
            this.lists.sort((obj1, obj2) => obj2.id - obj1.id);
        },
    },
    head () {
      return {
        title: `Lists/Decks`,

        meta: [
          // { hid: 'og:image', property: 'og:image', content: this.list.items[0].image_cropped },
           {
            hid: 'description',
            name: 'description',
            content:  `List and Deck Management on EchoMTG`
          }
        ],
        link: [
          {
            rel: 'canonical',
            href: 'https://www.echomtg.com' + this.$route.path
          }
        ]
      }
    }
  }
</script>
