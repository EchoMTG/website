<template>
  <div>
      <nuxt keep-alive />
      <echo-bread-crumbs :data="crumbs" />
      <set-checklist
        :items="this.set.items"
        :cardsowned="this.set.owned"
        :totalFoiled="this.set.total_foil_cards"
        :totalRegular="this.set.total_regular_cards"
      />
   </div>

</template>
<style scoped>
@media print {
  #navbar-main, .navbar, .aside {
		display: none !important;
	}

  body{
		padding: 40px 0px 0px 40px;
	}
	table{
		border: 1px #ccc solid;
		width: 900px;
	}
	table tr {
		border: 1px #ccc solid;
	}
	table tr td:first-child, table tr td:nth-child(2){
		border-right: 1px #ccc solid;
	}
	table#set-table tr td:nth-child(2), table tr td:nth-child(7){
		background: #fffbe5;

	}
	table tr td:nth-child(7){
		padding-left: 10px;
		font-weight: bold;
	}
	table tr td:nth-child(3) {
	 padding-left: 5px;
	}
}


</style>
<script>
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue';
import SetChecklist from '~/components/sets/SetChecklist.vue';


export default {
  name: 'Expansion',
  components: {
    EchoBreadCrumbs,
    SetChecklist
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
    console.log(data)

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
          url: '/',
          icon: ''
        },
        {
          label: 'Checklist',
          url: this.$nuxt.$route.path,
          icon: ''
        }
      ]
    }
  },
  head () {
    return {
        title: `${this.set.name} Printable Checklist`,

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
