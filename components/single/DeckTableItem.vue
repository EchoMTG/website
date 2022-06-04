<template>
    <tr class="">
        <td>
        <a :href="card.echo_set_url"><img width="18px" :src="card.set_image" :alt="card.set_code"></a>
            [<a :href="card.echo_set_url">{{card.set_code}}</a>]
        </td>
        <td>
        <strong class="list-item list-item-clean" style="width: 200px" :title="card.name" :data-tcg-mid="card.tcg_mid" :data-foil-price="card.foil_price" :data-image="'https://assets.echomtg.com/magic/cards/original/'+card.emid+'.jpg'">
        <a :href="card.echo_url">{{card.name}}</a>
        </strong> 
        </td> 
        <td>{{card.types}}</td> 
        <td v-if="card.foil == 0">{{this.$parent.list.currency_symbol}}{{card.tcg_mid}} / {{this.$parent.list.currency_symbol}}{{card.tcg_low}}</td>
        <td v-else>{{this.$parent.list.currency_symbol}}{{card.foil_price}}</td>
        <td class="is-hoverable">
        <a @click="toggleFoil" v-if="card.foil == 1" class="tag is-warning">Foil</a>
        <a @click="toggleFoil" v-if="card.foil == 0" class="tag is-gray">Normal</a>
        </td> 
        <td><button @click="addCard" class="button is-dark is-small"><i class="fa fa-plus"></i></button> <button @click="removeCard" class="button is-danger is-text is-small"><i class="fa fa-trash"></i></button></td> 
    </tr>
</template>

<script>
export default {
    props: ['card'],
    methods: {
        removeCard: function() {
            this.$emit('removeCard', this.card.id)
        },
        addCard: function (cardMid){
            this.$emit('addCard',this.card.mid);
        },
        toggleFoil: function (){

            let foil = (this.card.foil == 1) ? 0 : 1;
            this.$emit('toggleFoil',this.card.id, foil);
        }
    }

}
</script>

<style>

</style>