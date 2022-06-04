<template>
  <div>
    <deck-view  :list="list"/>
  </div>
</template>

<script>
// import axios from 'axios'
import DeckView from '../../../components/single/DeckView.vue'
const api_url = process.env.VUE_APP_API_DOMAIN;
export default {
    async asyncData({ params, $http }) {
      const id = params.id
      // let token = this.$cookies.get('token');
      const url = `${api_url}lists/get/?list=${id}`;

      const { list } = await fetch(url).then(res => res.json());
      return { id, list }
    },

    components: { DeckView },

    // created(){
    //   console.log('response');
    //   const id = params.id;
    //   let token = this.$cookies.get('token');
    //   let list = await axios.get(`${api_url}lists/get/?list=${id}&auth=${token}`)
    //   .then( (response) => {
    //     console.log(response);
    //           // $this.calculateGraphData();
    //           // $this.cardArray = [];
    //           // for(index in $this.list.card_list){
    //           //     $this.cardArray.push($this.list.card_list[index]);
    //           // }
    //           // if($this.sortOrder == 'ASC'){
    //           //     $this.sortListASC();
    //           // } else {
    //           //     $this.sortListDESC();
    //           // }

    //       })
    //       .catch(function (error) {
    //           console.log(error);
    //       });

    //   return { list }
    // }


}
</script>

<style>

</style>
