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
  async asyncData({ params, redirect, $config, env }) {

    let set_code = params.set_code;
    let set;

    // fetch the set
    let endpoint = `${$config.API_DOMAIN}data/set/?set_code=${set_code}`;

    const res = await fetch(
      endpoint, {
        headers: {
          'Authorization' : 'Bearer ' + $config.S2S_KEY
        }
      }
    );

    // try to get the json
    try {
      set = await res.json();
    } catch(err){
      console.log(err, res)
    }

    // return it
    if (set) {
      return {
        set: set.set
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
