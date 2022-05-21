<template>
    <div class="list-summary">
        <div class="content">
            <h1 class="is-title"><strong>{{list.name}}</strong>  <small class="is-size-5 has-text-grey"> ({{list.total_cards_on_hand}} of {{list.total_cards}} in inventory)</small></h1>
            <div class="field is-grouped is-grouped-multiline">
                <div class="control">
                    <span class="tags has-addons">
                        <span class="tag">Total</span>
                        <span class="tag is-dark">{{list.total_cards}}</span>
                    </span> 
                    </div>
                    <div class="control">
                    <span class="tags has-addons">
                        <span class="tag">Main</span> 
                        <span class="tag is-dark" v-if="list.hasOwnProperty('sideboard')">{{list.total_cards - list.sideboard.total}}</span>
                        <span class="tag is-dark" v-else>{{list.total_cards}}</span>
                    </span>
                    </div>
                <div class="control">
                    <span class="tags has-addons" v-if="list.hasOwnProperty('sideboard')">
                        <span class="tag">Sideboard</span> 
                        <span class="tag is-dark" >{{list.sideboard.total}}</span>
                    </span>
                    </div> 
                    <div class="control">
                    <span class="tags has-addons">
                        <span class="tag">Est. Value</span> 
                        <span class="tag is-dark"><strong class="has-text-white">{{list.currency_symbol}}{{list.current_low_value}}</strong> - <strong class="has-text-white">{{list.currency_symbol}}{{list.current_value}}</strong></span>
                    </span>
                    </div>    
                    <div class="control">
                    <span class="tags has-addons">
                        <span class="tag">Created On</span> 
                        <span class="tag is-dark">
                            <strong class="has-text-white"><time :datetime="list.date_created">{{list.date_created}}</time></strong>
                        </span>
                    </span>
                    </div>                          
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['list'],
}
</script>

<style>

</style>