<template>
  <div>
    Hello world
   </div>
</template>

<script>
import axios from 'axios'
import ModalBox from '@/components/ModalBox'

export default {
  name: 'Expansion',
  components: { ModalBox },
  props: {
    dataUrl: {
      type: String,
      default: null
    },
    checkable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      setItems: {},
      checkedRows: []
    }
  },
  computed: {


  },
  mounted () {
    console.log(this.$route.params)
    if (this.dataUrl) {
      let api_url = this.$config.API_DOMAIN + this.dataUrl
      console.log(api_url)

      this.isLoading = true
      axios
        .get(api_url)
        .then((r) => {
          this.isLoading = false
          if (r.data && r.data.data) {
            if (r.data.data.length > this.perPage) {
              this.paginated = true
            }
            this.expansions = r.data.data
          }
        })
        .catch((e) => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    }
  },
  async asyncData({ params, redirect, env }) {
    console.log('async',params, env.S2S_KEY)
    let set_code = params.set_code;
    let setItems;
    const res = await fetch(
      `https://www.echomtg.com/api/data/set/?set_code=${set_code}`, {
        headers: {
          'Authorization' : 'Bearer ' + process.env.S2S_KEY
        }
      }
    );
    try {
      setItems = await res.json();
      console.log(setItems);
    } catch(err){
      console.log(err, res)
    }


    if (setItems) {
      return {
        setItems: setItems
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
