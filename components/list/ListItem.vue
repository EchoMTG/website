<template>
    <tr>
        <td>
            <NuxtLink :to="`/apps/lists/${item.id}`" class="has-text-black has-text-weight-bold">
                <span>{{item.name}}</span>
            </NuxtLink>
        </td>
        <td>{{item.date_created}}</td>
        <td>
            <button v-if="item.public == 0" class="button is-primary is-small"  @click="makePublic(item.id)">Make Sharable</button>
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

export default {
    props: ['item','index','callback'],
    methods: {
        async openPublicLink(event) {
            window.location.href = '/public/list/'+this.item.hash+'/';
        },
        openDeleteModal: function(key){
            document.querySelector('#delete-modal').classList.add("is-active");
            this.$parent.targetDeck = this.$parent.lists[key];
            this.$parent.targetDeckKey = key;
        },
       async makePublic(id){

          let endpoint = `${this.$config.API_DOMAIN}lists/toggle_public/`;
          let bodyFormData = new FormData();
          bodyFormData.set('list', id);
          bodyFormData.set('public', 1);

          const res = await fetch(endpoint,{
            headers: this.$echomtg.getUserHeadersNoJSON(),
            method: 'post',
            body: bodyFormData
          })

          const data = await res.json();

          this.$buefy.toast.open({
            message: `${data.message}`,
            type: 'is-success'
          })

          this.callback()

        },
    }
}
</script>

<style>

</style>
