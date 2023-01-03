<template>
  <div>
    <b-table :data="items">
      <b-table-column field="name" v-slot="props" searchable>
        {{props.row.name}}
      </b-table-column>
    </b-table>
  </div>
</template>
<script>
import ItemCard from '~/components/items/ItemCard.vue';
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue';

export default {
  name: 'ReserveList',
  components: {
    EchoBreadCrumbs,
    ItemCard
  },
  data () {
    return {
      cs: '$',
      items: []
    }
  },
  async asyncData({redirect, $echomtg }) {

    let data;
    try {
      data = await $echomtg.getGroup('reserved')
    } catch(err){
      console.log(err)
    }
    console.log(data);

    // return it
    if (data.items.length > 0) {
      const items = data.items
      return {
        items
      }
    } else {
      redirect('/mtg/')
    }
  },
  methods: {
    getSetIconClass(set_code){
      return this.$echomtg.setIconClass(set_code) + ' mr-1'
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

  },
  computed: {
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
          url: '/mtg/groups/',
          icon: ''
        },
         {
          label: 'Magic Reserve List',
          url: this.$nuxt.$route.path,
          icon: ''
        },
      ]
    },

  },
  head () {
    return {
        title: `Magic reserve list`,
        meta: [
          { hid: 'og:image', property: 'og:image', content: ''},
          {
            hid: 'description',
            name: 'description',
            content:  `Reserved list`
          }
        ]

    }
  }

}
</script>
