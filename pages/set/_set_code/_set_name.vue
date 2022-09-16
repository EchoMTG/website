<template>
  <div>
    Hello world
      <SetView :items="set.items" />
   </div>

</template>

<script>
import SetView from '@/components/sets/SetView'


export default {
  name: 'Expansion',
  components: { SetView },
  props: {

  },
  data () {
    return {
      set: {},
      checkedRows: []
    }
  },
  computed: {


  },
  mounted () {


  },
  async asyncData({ params, redirect, env, $config }) {

    let set_code = params.set_code;
    let set;

    // fetch the set
    const res = await fetch(
      `${$config.API_DOMAIN}data/set/?set_code=${set_code}`, {
        headers: {
          'Authorization' : 'Bearer ' + process.env.S2S_KEY
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
        set: set
      }
    } else {
      redirect('/sets/')
    }
  },
  methods: {

    makeSetPath(code, path_part){
      return `/set/${code}/${path_part}/`
    }

  }
}
</script>
