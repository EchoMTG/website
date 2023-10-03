<template>
    <tr>
        <td>
            <NuxtLink :to="`/apps/lists/${item.id}`" class="has-text-black has-text-weight-bold">
                <span>{{item.name}}</span>
            </NuxtLink>
        </td>
        <td>{{item.date_created}}</td>
        <td>
            <button v-if="item.public == 0" class="button is-primary is-small"  @click="makePublic(item.id, index)">Make Sharable</button>
            <button v-if="item.public == 1" class="button is-info is-small"  @click="openPublicLink">
                <b-icon icon="share" size="is-small" />
                <span>open public link</span>
            </button>
            <button class="button is-danger is-small modal-button is-pulled-right"  @click="openDeleteModal($vnode.key)" aria-haspopup="true">
                <b-icon icon="delete" size="is-small" />
            </button>
        </td>
    </tr>
</template>

<script>
import axios from 'axios'
export default {
    props: ['item','index'],
    methods: {
        loadList: function (event) {
            window.location.href = '/lists/'+this.item.id+'/';

        },
        openPublicLink: function (event) {
            window.location.href = '/public/list/'+this.item.hash+'/';

        },
        openDeleteModal: function(key){
            document.querySelector('#delete-modal').classList.add("is-active");
            this.$parent.targetDeck = this.$parent.lists[key];
            this.$parent.targetDeckKey = key;
            //document.querySelector('#delete-list-button').setAttribute("data-list-key",key);
        },
        makePublic: function(id, index){
            let token = this.$cookies.get('token');
            let listID = id;
            let $this = this;
            let endpoint = `${this.$config.API_DOMAIN}lists/toggle_public/?&auth=${token}`;
            let bodyFormData = new FormData();
            bodyFormData.set('list', listID);
            bodyFormData.set('public', 1);

            axios({
                method: 'post',
                url: endpoint,
                data: bodyFormData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            }).then(function(response){
                $this.$set($this.$parent.lists, index, response.data.list);
                createGrowl(' made public ');
            });
        }
    }
}
</script>

<style>

</style>
