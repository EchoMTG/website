<template>
  <div>
    <!-- <nuxt v-if="user?.user_level && parseInt(user.user_level) >= 3" keep-alive /> -->
    <echo-bread-crumbs :data="crumbs" />
    <SetSummaryLorcana
      :setName="set.name"
      :setCode="set.set_code"
      :topcardImage="set.items[0].image_cropped"
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
            <span class="icon"><i class="fa fa-table"></i></span>
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
            <span class="icon"><i class="fa fa-calculator"></i></span>
            <span
              >Calculations<span class="hide-mobile">
                &amp; Pack Odds</span
              ></span
            >
          </a>
        </li>
        <li :class="tabClass('trending')">
          <a
            class="navbar-item has-icon"
            ref="trendingTab"
            href="javascript:void(0)"
            @click="setTab('trending')"
          >
            <span class="icon"><i class="fa fa-area-chart"></i></span>
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
            <span class="icon"><i class="fa fa-gift"></i></span>
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
        :href="`printable-check-list/`"
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
        :game="71"
        />

      <SetSealed v-if="this.tab == 'sealed'" :set="this.set" />

      <SetTrendingView v-if="this.tab == 'trending'" :setName="this.set.name" :items="this.set.items" />
      <SetCalculationsView v-if="this.tab == 'calculations'" :set="this.set" @add-full-set="addFullSet()" />
    </div>
  </div>
</template>

<script>

import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue';
import { mapState } from 'vuex'
import SetItemList from '@/components/sets/SetItemList';
import SetSummaryLorcana from '@/components/sets/SetSummaryLorcana';
import SetSealed from '@/components/sets/SetSealed';
import SetTrendingView from '@/components/sets/SetTrendingView';
import SetCalculationsView from '@/components/sets/SetCalculationsView';


export default {
  name: 'Expansion',
  components: {

    EchoBreadCrumbs,
    SetItemList, SetSummaryLorcana, SetTrendingView, SetCalculationsView, SetSealed
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
      'user'
    ])

  },
  async asyncData({ params, redirect, $echomtg }) {

    let data = await $echomtg.getSet(params.set_code);
    let tab = params?.set_tab_lorcana ? params.set_tab_lorcana : 'list'

    // return it
    if (data) {
      return {
        set: data.set,
        set_code: params.set_code,
        tab: tab
      }
    } else {
      redirect('/lorcana/sets/')
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
      return `/lorcana/sets/${code.toLowerCase()}/${this.$echomtg.cleanSet(set_name)}/`
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

        lazyLoad: function () {
            let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
            let active = false;
            if (active === false) {
              active = true;
              setTimeout(() => {
                lazyImages.forEach(function (lazyImage) {
                  if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImages = lazyImages.filter(function (image) {
                      return image !== lazyImage;
                    });

                    if (lazyImages.length === 0) {
                      window.removeEventListener("scroll", this.lazyLoad);
                    }
                  }
                });
                active = false;
              }, 200)

            }
          },

  },
  mounted() {

        window.addEventListener("scroll", this.lazyLoad);
        window.scrollTo(0, 0);
        setTimeout(this.lazyLoad, 500)
      },
  computed: {
    crumbs () {
      return [
        {
          label: 'Disney Lorcana',
          url: '/lorcana/',
          icon: ''

        },
        {
          label: 'Sets',
          url: '/lorcana/sets/',
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
            content:  `Card Images and Prices for the Disney Lorana set ${this.set.name}, ${this.set.set_code}`
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
