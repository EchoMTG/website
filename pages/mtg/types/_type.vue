<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />
    <SetSummary
      :setName="slug"
      :topcardImage="items[0].image_cropped"
      :setTotalItems="items.length"
    />
    <b-table :data="items">
      <b-table-column field="name" label="Card Name" v-slot="props" sortable searchable>

        <nuxt-link :to="props.row.url" no-prefetch>
            <b-image
                lazy
                :src="props.row.image_cropped"
                custom-class="mr-3"
                placeholder="https://assets.echomtg.com/magic/cards/cropped/placeholder.png"
                style="height: 50px; width:70px; float: left; margin-right: 4px;" />


        </nuxt-link>


        <item-inspector-wrapper :item="props.row" />
      </b-table-column>
       <b-table-column field="rarity" label="Rarity" searchable sortable v-slot="props">
            <span class="is-mobile">[{{props.row.collectors_number}}]</span>
            <em v-html="replaceSymbols(props.row.mc)"></em>
            <span class="">{{props.row.rarity}}</span>
          </b-table-column>
          <b-table-column field="types" label="Type" searchable sortable v-slot="props">
              {{ props.row.types }}
          </b-table-column>
          <b-table-column field="expansion" label="Expansion" searchable sortable v-slot="props">
              {{ props.row.expansion }}
          </b-table-column>
          <b-table-column field="collectors_number" label="#" numeric sortable v-slot="props">
            {{props.row.collectors_number}}
          </b-table-column>

          <b-table-column field="price_change" label="7-Day" numeric sortable v-slot="props">
            <span v-if="props.row.price_change !== 0" :class="changeTag(props.row.price_change)">
              {{ props.row.price_change }} %
            </span>
          </b-table-column>
          <b-table-column field="price"  label="Regular" numeric sortable v-slot="props">
              <span v-if="props.row.price > 0">{{cs}}{{ props.row.price }}</span>
              <b-button v-if="props.row.price" icon-left="plus" size="is-small" variant="contained" type="is-primary" @click="addItem(props.row.emid, 0)"></b-button>
          </b-table-column>
          <b-table-column field="foil_price"  label="Foil" numeric sortable v-slot="props">
              <span v-if="props.row.foil_price > 0">{{cs}}{{ props.row.foil_price }}</span>
              <b-button v-if="props.row.foil_price" icon-left="plus" size="is-small" variant="contained" type="is-warning" @click="addItem(props.row.emid,1)"></b-button>
          </b-table-column>
    </b-table>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import ItemCard from '~/components/items/ItemCard.vue';
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue';
import SetSummary from '@/components/sets/SetSummary';
import ItemInspectorWrapper from '~/components/items/ItemInspectorWrapper.vue'

export default {
  name: 'GroupTypes',
  components: {
    EchoBreadCrumbs,
    ItemInspectorWrapper,
    SetSummary,
    ItemCard
  },
  data () {
    return {
      cs: '$',
      items: [{
        image_cropped: ''
      }],
      slug: ''
    }
  },
  async asyncData({ params, redirect, $echomtg}) {

    let data;
    try {
      data = await $echomtg.getGroup('custom',150,params.type.replace(/-/g,' '), true)
    } catch(err){
      console.log(err)
    }

    // return it
    if (data.items.length > 0) {
      const items = data.items
      const slug = params.type
      return {
        items, slug
      }
    } else {
      redirect('/mtg/')
    }
  },
  methods: {
    getSetIconClass(set_code){
      return this.$echomtg.setIconClass(set_code) + ' mr-1'
    },
    changeTag(number) {
      if (number < -5) {
            return 'tag has-text-white has-background-danger'
        } else if (number > 5) {
            return 'tag  has-text-white has-background-success'
        } else if (number < 0) {
            return 'tag has-background-danger-light'
        } else if (number > 0) {
            return 'tag has-background-success-light'
        } else {
          return 'tag'
        }
    },
    getRarityColor(rarity) {
      let color = 'is-warning'
      switch (rarity.toLowerCase()){
        case 'uncommon':
          color='is-grey';
          break;
        case 'common':
          color='is-white';
          break;
        case 'rare':
          color='is-warning';
          break;
        case 'mythic rare':
        case 'mythic':
          color='is-danger';
        break;
      }
      return color;
    },
    async addItem(emid,foil=0){
      try {
        const json = await this.$echomtg.inventoryQuickAdd(emid,foil);
        if(json.status == 'success'){
          this.$buefy.snackbar.open({
              message: json.message,
              type: 'is-warning',
              queue: false,
              duration: 10000,
              position: 'is-bottom',
              pauseOnHover: true,
              actionText: 'UNDO',
              onAction: async () => {
                  const deleted = await this.$echomtg.inventoryDeleteItem(json.inventory_id);
                  this.$buefy.snackbar.open({
                    message: `${json.inventory_id} ${deleted.message}`,
                    type: 'is-danger',
                    queue: false
                  });
              }
          })
          this.callback()
        } else {
          this.$store.commit('loginSignupModalShow',true);
          this.$echomtg.log('failed to add')
        }
      } catch (err){
        this.$buefy.snackbar.open({
          message: error,
          type: 'is-error',
          position: 'is-top',
        })
      }
    },
    replaceSymbols(str){
      return this.$echomtg.replaceSymbols(str)
    },

  },
  computed: {
    ...mapState(['user','authenticated']),
    nameCleaned (){
      return
    },
    crumbs () {
      return [
        {
          label: 'Magic: the Gathering',
          url: '/mtg/',
          icon: ''
        },
        {
          label: 'Types',
          url: '/mtg/types/',
          icon: ''
        },
         {
          label: this.slug.replace('-',' '),
          url: this.$nuxt.$route.path,
          icon: ''
        },
      ]
    },

  },
  head () {
    return {
        title: `${this.slug.replace('-',' ')} Printings, Prices, and Variations`,
        meta: [
          { hid: 'og:image', property: 'og:image', content: ''},
          {
            hid: 'description',
            name: 'description',
            content:  `Card Images and Prices for the Magic the Gathering card ${this.slug.replace('-',' ')}`
          }
        ]

    }
  }

}
</script>
