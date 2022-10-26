<template>
  <div>
      <echo-bread-crumbs :data="crumbs" />
      <SetView :set="set" />
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
        set: data.set
      }
    } else {
      redirect('/sets/')
    }
  },
  methods: {

    makeSetPath(code, path_part){
      return `/set/${code}/${path_part}/`
    }

  },
  computed: {
    crumbs () {
      return [
        {
          label: 'Expansions',
          url: '/sets/',
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
  mounted() {
    console.log("SET",this.set)
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
