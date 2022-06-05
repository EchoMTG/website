<template>
<div class="tags has-addons" v-if="(sideboard == 1 && cardInfo.side > 0) || (sideboard == 0 && cardInfo.main > 0) ">
    
        <span class="tag is-size-7 is-bold"  v-if="sideboard == 1">{{cardInfo.side}}</span>
        <span class="tag is-size-7 is-bold" v-else>{{cardInfo.main}}</span> 
        
        <a 
            v-bind:class="'tag is-dark is-size-7 color-strip list-item ' + card.colors.toLowerCase().replace(',','')" 
            :title="card.name" 
            :href="card.echo_url"
            :data-tcg-mid="card.tcg_mid" 
            :data-foil-price="card.foil_price" 
            :data-image="'https://assets.echomtg.com/magic/cards/original/'+card.emid+'.jpg'">
            {{card.name}} 
        </a>
        <a class="tag is-size-7 is-dark" @click="openMissingInventory" v-if="cardInfo.on_hand == 0">
            <i class="fa fa-exclamation-triangle has-text-danger"></i>
        </a>
        <a class="tag is-size-7 is-dark" @click="openMissingInventory" v-if="cardInfo.on_hand != 0 && cardInfo.missing != 0">
            <i class="fa fa-exclamation has-text-warning"></i>
        </a>
        <a class="tag is-size-7 is-dark" @click="openMissingInventory"  v-if="cardInfo.missing == 0">
            <i class="fa fa-check has-text-success"></i>
        </a>
        <span class="tag is-size-7 ">
            <a v-on:click.stop="addCard(card.mid,sideboard)"><span class="fa fa-plus-circle"></span></a> 
            <a v-on:click.stop="removeCard(card.mid,sideboard)"><span class="fa fa-minus-circle"></span></a>
        </span>
         <span class="tag is-size-7 is-dark">
            <a v-on:click.stop="moveToSideboard(card.mid,sideboard)"><span class="fa fa-exchange fa-rotate-90"></span></a>
        </span>
   </div>
  
</template>

<script>
export default {
    props: ['card','sideboard','cardInfo'],
    methods: {
        removeCard: function (cardMid,sb){
            this.$parent.$parent.removeCardByMID(cardMid,sb);

        },
        addCard: function (cardMid, sideboard){
            //this.$emit('addCard',cardMid);
            this.$parent.addCard(cardMid,sideboard);
        },
        moveToSideboard: function (cardMid,sb){
            sb = (sb == 1) ? 0 : 1;
            this.$parent.moveToSideboard(cardMid,sb);
        },
        openMissingInventory: function(){
            this.$parent.$parent.setCurrentTab('list-inventory-view');
        }
    }

}
</script>

<style>

</style>