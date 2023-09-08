<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />
    <SetSummary
      setName="Magic Reserved List"
    />
    Hello world {{ slug }}
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
  async fetch() {
    console.log(this.$route.params)
    console.log('HELLO WORLD')

    let data;
    try {
      data = await this.$echomtg.getGroup('reserved')
    } catch(err){
      console.log(err)
    }
    console.log(data)
    // return it
    if (data.items.length > 0) {
      const items = data.items
      const slug = this.$route.params['group']
      return {
        items, slug
      }
    } else {
      this.error({ statusCode: 404, message: 'Page not found' })
    }
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
    ...mapState([
      'user',
      'authenticated'
    ])
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
