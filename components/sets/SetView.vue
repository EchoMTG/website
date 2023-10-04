<template>
  <div>

    <SetSummary
      :setName="set.name"
      :setCode="set.set_code"
      :topcardImage="set.items[0].image_cropped"
      :setReleaseDate="set.release_date"
      :setTotalItems="set.items.length"
    />

    <div class="setTabs tabs is-boxed is-flex">
      <ul>
        <li class="is-active">
          <a
            class="has-icon"
            ref="listTab"
            href="javascript:void(0)"
            @click="setTab('list')"
          >

            <b-icon icon="table" size="is-small" />
            <span>Card <span class="hide-mobile">&amp; Price</span> List</span>
          </a>
        </li>
        <li>
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
        <li>
          <a
            class="has-icon"
            ref="trendingTab"
            href="javascript:void(0)"
            @click="setTab('trending')"
          >

            <b-icon icon="chart-areaspline" size="is-small" />
            <span>Trending <span class="hide-mobile">Prices</span></span>
          </a>
        </li>

        <li>
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
        href="/api/sets/download/?set_code=SNC"
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
        :callback="callback"
        />

      <SetSealed v-if="this.tab == 'sealed'" :set="this.set" />

      <SetTrendingView v-if="this.tab == 'trending'" :setName="this.set.name" :items="this.set.items" />
      <SetCalculationsView v-if="this.tab == 'calculations'" :set="this.set" @add-full-set="addFullSet()" />
    </div>
  </div>
</template>

<script>
import SetItemList from '@/components/sets/SetItemList';
import SetSummary from '@/components/sets/SetSummary';

import SetSealed from '@/components/sets/SetSealed';
import SetTrendingView from '@/components/sets/SetTrendingView';
import SetCalculationsView from '@/components/sets/SetCalculationsView';
import { mapState } from 'vuex'

export default {

    name: 'SetView',
    components: { SetItemList, SetSummary, SetTrendingView, SetCalculationsView, SetSealed },
    props: {
      set: {
        type: Object,
        default: function(){
          return {
            'items': [],
            'owned': {
              regular: [],
              foiled: []
            }
          }
        }
      },
      current_tab: {
        type: String,
        default: 'list'
      },
      callback: {
        type: Function,
        required: true
      }
    },
    data: function data() {

        return {
            title: 'Set Name',
            tab: 'list',
            setCode: '',
        };

    },
    methods: {
      addHashToLocation(url) {
        history.pushState(
          {},
          null,
          url
        )
      },
      makeSetPath(code, path_part){
        return `/mtg/${code}/${path_part}/`
      },
      setTab: function(str){
          this.$refs[this.tab+'Tab'].parentElement.classList.remove('is-active')
          this.tab = str
          this.$refs[str+'Tab'].parentElement.classList.add('is-active')

          if(this.tab == 'list'){
            this.addHashToLocation(this.$route.path)
          } else {
            this.addHashToLocation(this.$route.path + this.tab + '/')
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
    watch: {
      current_tab(){
        this.tab = this.current_tab
      }
    },
    mounted() {

        window.addEventListener("scroll", this.lazyLoad);
        window.scrollTo(0, 0);
        setTimeout(this.lazyLoad, 500)
      },
    computed: {
      owned() { return this.set?.owned ? this.set.owned : {} },
      ...mapState(['userLevel'])

    }
}
</script>

