<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />
    <SetSummary
      :setName="slug"
      :customTitle="custompage.title"
      :customDescription="custompage.description"
      :topcardImage="items[0]?.image_cropped || ' '"
      :setTotalItems="items.length"
    />
    <b-table
      v-if="items.length > 1"
      :data="items"
      striped
      :mobile-cards="false"
      paginated
       pagination-size="is-small"
          pagination-position="bottom"
          :per-page="50"
      >
      <b-table-column field="name" label="Card Name" v-slot="props" sortable searchable>

        <nuxt-link :to="props.row.url" no-prefetch>
            <b-image
                lazy
                :src="props.row?.image_cropped || ''"
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

              <set-tag :code="props.row.set_code" :name="props.row.expansion" :url="props.row?.set_url ? props.row.set_url :''" />
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
    <hr />
    <div class="content message is-dark container py-5 px-5 mb-5" v-if="custompage.content">
      <div v-html="custompage.content" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import ItemCard from '~/components/items/ItemCard.vue';
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue';
import SetSummary from '@/components/sets/SetSummary';
import ItemInspectorWrapper from '~/components/items/ItemInspectorWrapper.vue'
import SetTag from '~/components/magic/SetTag.vue';

export default {
  name: 'GroupTypes',
  components: {
    EchoBreadCrumbs,
    ItemInspectorWrapper,
    SetSummary,
    ItemCard,
    SetTag
  },
  data () {
    return {
      custompage: {},
      items: [{
        image_cropped: ''
      }],
      slug: ''
    }
  },
  created() {
  },
  async fetch() {

    let data;
    try {
      data = await this.$echomtg.getGroup(this.$route.params['group'],1000)
      
    } catch(err){
      // Vue.error({ statusCode: 500, message: err.message })
    }

    // return it
    if (data.items.length > 0) {
      this.items = data.items
      this.custompage = data.custompage
      this.slug = this.$route.params['group']
    } else {
      // Vue.error({ statusCode: 404, message: 'Page not found' })
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
    cs() {
      return this.user.currency_symbol
    },
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
          label: 'Groups',
          url: '/mtg/groups/',
          icon: ''
        },
          {
          label: this.slug.replace('-',' '),
          url: this.$nuxt.$route.path,
          icon: ''
        },
      ]
    },
    ...mapState([
      'user',
      'authenticated'
    ])
  },
  head () {
    return {
        title: `${this.custompage.seo_meta_title}`,
        meta: [
          { hid: 'og:image', property: 'og:image', content: ''},
          {
            hid: 'description',
            name: 'description',
            content:  `${this.custompage.seo_meta_description}`,
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
