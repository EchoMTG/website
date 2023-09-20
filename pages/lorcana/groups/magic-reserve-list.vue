<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />
    <SetSummary
      setName="Magic Reserved List"
    />

  </div>
</template>
<script>
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
  async asyncData({ params, redirect, $echomtg, $config }) {

    // let data;
    // try {
    //   data = await $echomtg.getGroup('reserved')
    // } catch(err){
    //   console.log(err)
    // }

    // // return it
    // if (data.items.length > 0) {
    //   const items = data.items
    //   const slug = params.group
    //   return {
    //     items, slug
    //   }
    // } else {
    //   redirect('/mtg/')
    // }
  },
  methods: {


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
