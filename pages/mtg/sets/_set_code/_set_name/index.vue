<template>
  <div>
      <nuxt keep-alive />
      <echo-bread-crumbs :data="crumbs" />
      <SetView :set="set" :callback="refreshData" />
   </div>

</template>

<script>
import SetView from '@/components/sets/SetView'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue';


export default {
  name: 'Expansion',
  components: {
    SetView,
    EchoBreadCrumbs
  },
  props: {

  },
  data () {
    return {
      set: {
        name: '',
      },
      set_code: '',
      checkedRows: []
    }
  },
  computed: {



  },
  async asyncData({ params, redirect, $echomtg }) {

    let data = await $echomtg.getSet(params.set_code);

    // return it
    if (data) {
      return {
        set: data.set,
        set_code: params.set_code
      }
    } else {
      redirect('/mtg/sets/')
    }
  },
  methods: {

    makeSetPath(code, path_part){
      return `/mtg/${code}/${path_part}/`
    },
    async refreshData() {
      let data = await this.$echomtg.getSet(this.set_code);
      this.set = data.set;
      console.log(data)
    }

  },
  computed: {
    crumbs () {
      return [
        {
          label: 'Magic: the Gathering',
          url: '/mtg/',
          icon: ''

        },
        {
          label: 'Sets',
          url: '/mtg/sets/',
          icon: ''
        },
        {
          label: this.set.name,
          url: this.$nuxt.$route.path,
          icon: ''
        }
      ]
    }
  },
  head () {
    return {
        title: `${this.set.name} Price List and Card Data`,

        meta: [
          { hid: 'og:image', property: 'og:image', content: this.set.set_symbol },
           {
            hid: 'description',
            name: 'description',
            content:  `Card Images and Prices for the Magic the Gathering set ${this.set.name}, ${this.set.set_code}`
          }
        ]
    }
  }

}
</script>
