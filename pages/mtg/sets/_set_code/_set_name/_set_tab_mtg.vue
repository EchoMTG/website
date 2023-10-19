<template>
  <div>
    <!-- <nuxt v-if="user?.user_level && parseInt(user.user_level) >= 3" keep-alive /> -->
    <echo-bread-crumbs :data="crumbs" />
    <SetSummary
      :setName="set.name"
      :setCode="set.set_code"
      :topcardImage="set?.items[0]?.image_cropped"
      :setReleaseDate="set.release_date"
      :setTotalItems="set.items.length"
    />

    <div class="setTabs tabs is-boxed is-flex">
      <ul>
        <li :class="tabClass('list')">
          <a
            class="navbar-item has-icon"
            ref="listTab"
            href="javascript:void(0)"
            @click="setTab('list')"
          >

            <b-icon icon="table-large" size="is-small" />
            <span>Card <span class="hide-mobile">&amp; Price</span> List</span>
          </a>
        </li>
        <li :class="tabClass('calculations')">
          <a
            class="navbar-item has-icon"
            ref="calculationsTab"
            href="javascript:void(0)"
            @click="setTab('calculations')"
          >
            <b-icon icon="calculator" size="is-small" />
            <span
              >Calculations<span class="hide-mobile">
                &amp; Pack Odds</span
              ></span
            >
          </a>
        </li>
        <li v-if="this.authenticated" :class="tabClass('trending')">
          <a
            class="navbar-item has-icon"
            ref="trendingTab"
            href="javascript:void(0)"
            @click="setTab('trending')"
          >
            <b-icon icon="chart-areaspline" size="is-small" />
            <span>Trending <span class="hide-mobile">Prices</span></span>
          </a>
        </li>

        <li :class="tabClass('sealed')">
          <a
            class="navbar-item has-icon"
            ref="sealedTab"
            href="javascript:void(0)"
            @click="setTab('sealed')"
          >
            <b-icon icon="gift" size="is-small" />
            <span>Sealed <span class="hide-mobile">Product</span></span>
          </a>
        </li>
      </ul>

      <a
        class="button is-outlined is-small has-icon-left hide-mobile"
        target="_blank"
        :href="`/api/sets/download/?set_code=${set.set_code}`"
      >
        <b-icon icon="microsoft-excel" size="is-small" />
        <span>Download Full Set CSV</span>
      </a>
      <a
        class="button is-success is-small has-icon-left hide-mobile ml-2 mr-2"

        target="_blank"
        :href="tab == 'list' ? `printable-check-list/` : `../printable-check-list/`"
      >
        <b-icon icon="printer" size="is-small" />
        <span>Open Printable Checklist</span>
      </a>
    </div>
    <div class="setViews">
      <SetItemList
        v-if="this.tab == 'list' || this.tab == ''"
        :items="this.set.items"
        :cardsowned="this.set.owned"
        :totalFoiled="this.set.total_foil_cards"
        :totalRegular="this.set.total_regular_cards"
        :callback="refreshData"
        :game="1"
        />

      <SetSealed v-if="this.tab == 'sealed'" :set="this.set" />

      <SetTrendingView v-if="this.authenticated && this.tab == 'trending'" :setName="this.set.name" :items="this.set.items" />
      <SetCalculationsView v-if="this.tab == 'calculations'" :set="this.set" @add-full-set="addFullSet()" />
    </div>
  </div>
</template>

<script>

import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue';
import { mapState } from 'vuex'
import SetItemList from '@/components/sets/SetItemList';
import SetSummary from '@/components/sets/SetSummary';
import SetSealed from '@/components/sets/SetSealed';
import SetTrendingView from '@/components/sets/SetTrendingView';
import SetCalculationsView from '@/components/sets/SetCalculationsView';


export default {
  name: 'Expansion',
  components: {

    EchoBreadCrumbs,
    SetItemList, SetSummary, SetTrendingView, SetCalculationsView, SetSealed
  },
  props: {

  },
  data () {
    return {
      set: {
        name: '',
      },
      set_code: '',
      checkedRows: [],
      tab: 'list'
    }
  },
  computed: {

    ...mapState([
      'user',
      'authenticated'
    ])

  },
  async asyncData({ params, redirect, $echomtg }) {

    let data = await $echomtg.getSet(params.set_code);
    let tab = params?.set_tab_mtg ? params.set_tab_mtg : 'list'

    // return it
    if (data) {
      return {
        set: data.set,
        set_code: params.set_code,
        tab: tab
      }
    } else {
      redirect('/mtg/sets/')
    }
  },
  methods: {
    tabClass(tab){
      let classList = "";
      if(this.tab == tab){
        classList += ' is-active';
      }
      return classList;
    },
    addHashToLocation(url) {
      history.pushState(
        {},
        null,
        url
      )
    },
    makeSetPath(code, set_name){
      return `/mtg/sets/${code.toLowerCase()}/${this.$echomtg.cleanSet(set_name)}/`
    },
    async refreshData() {
      let data = await this.$echomtg.getSet(this.set_code);
      this.set = data.set;
    },
    setTab: function(str){
      // this.$refs[this.tab+'Tab'].parentElement.classList.remove('is-active')
      this.tab = str
      // this.$refs[str+'Tab'].parentElement.classList.add('is-active')
      const seturl  = this.makeSetPath(this.set.set_code, this.set.name)
      if(this.tab == 'list'){
        this.addHashToLocation(seturl)
      } else {
        this.addHashToLocation(seturl + this.tab + '/')
      }

    },
    addFullSet: function() {
        var r = confirm("Add one of everycard? This can only be undone from your inventory.");
        if (r == true) {
            this.items.forEach(item => {
                //setTimeout(addToInventoryByEchoID(item.emid),500);
                return item
            });
        }
    },

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
        title: `${this.set.name} Price List`,

        meta: [
          { hid: 'og:image', property: 'og:image', content: this.set.set_symbol },
           {
            hid: 'description',
            name: 'description',
            content:  `MTG ${this.set.set_code} price list and Card list ${this.set.name} from the Magic the Gathering`
          }
        ],
        link: [
          {
            rel: 'canonical',
            href: 'https://www.echomtg.com' + this.$route.path
          }
        ]
    }
  }

}
</script>
