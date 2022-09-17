<template>
  <div>

      <SetView :set="set" />
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

    console.log("mounted items", this.set.items)
  },
  async asyncData({ params, redirect, $config, env }) {

    let set_code = params.set_code;
    let set;

    // fetch the set
    let endpoint = `${$config.API_DOMAIN}data/set/?set_code=${set_code}`;
    console.log(endpoint,env.S2S_KEY)
    const res = await fetch(
      endpoint, {
        headers: {
          'Authorization' : 'Bearer ' + env.S2S_KEY
        }
      }
    );

    // try to get the json
    try {
      set = await res.json();
      console.log('fetching set from _set_name', set)
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

  }
}
</script>
