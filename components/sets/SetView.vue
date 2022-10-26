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
            <span class="icon"><i class="fa fa-table"></i></span>
            <span>Card <span class="hide-mobile">&amp; Price</span> List</span>
          </a>
        </li>
        <li>
          <a
            class="navbar-item has-icon"
            ref="pullTab"
            href="javascript:void(0)"
            @click="setTab('pull')"
          >
            <span class="icon"><i class="fa fa-calculator"></i></span>
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
            <span class="icon"><i class="fa fa-area-chart"></i></span>
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
            <span class="icon"><i class="fa fa-gift"></i></span>
            <span>Sealed <span class="hide-mobile">Product</span></span>
          </a>
        </li>
      </ul>

      <a
        class="button is-outlined is-small has-icon-left hide-mobile"
        target="_blank"
        href="/api/sets/download/?set_code=SNC"
      >
        <span class="icon"><i class="fa fa-file-excel-o"></i></span>
        <span>CSV</span>
      </a>
      <a
        class="button is-outlined has-background-dark is-small has-icon-left hide-mobile"
        style="margin-left: 3px"
        target="_blank"
        href="https://www.echomtg.com/printable-checklist/SNC/streets-of-new-capenna/"
      >
        <span class="icon"><i class="fa fa-print"></i></span>
        <span>Checklist</span>
      </a>
    </div>
    <div class="setViews">
      <SetItemList
        v-if="this.tab == 'list'"
        :items="this.set.items"
        :cardsowned="this.set.owned"
        :totalFoiled="this.set.total_foil_cards"
        :totalRegular="this.set.total_regular_cards"
        />

      <SetSealed v-if="this.tab == 'sealed'" :set="this.set" />

      <SetTrendingView v-if="this.tab == 'trending'" :setName="this.set.name" :items="this.set.items" />
      <SetCalculationsView v-if="this.tab == 'pull'" :set="this.set" @add-full-set="addFullSet()" />
    </div>
  </div>
</template>

<script>
import SetItemList from '@/components/sets/SetItemList';
import SetSummary from '@/components/sets/SetSummary';

import SetSealed from '@/components/sets/SetSealed';
import SetTrendingView from '@/components/sets/SetTrendingView';
import SetCalculationsView from '@/components/sets/SetCalculationsView';

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
        setTab: function(str){
            this.$refs[this.tab+'Tab'].parentElement.classList.remove('is-active')
            this.tab = str
            this.$refs[str+'Tab'].parentElement.classList.add('is-active')
        },
        addFullSet: function() {
            var r = confirm("Add one of everycard? This cannot be undone.");
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
    created () {
        this.setCode = this.$parent.setCode
        this.userLevel = this.$parent.userLevel
    },
    mounted() {

        window.addEventListener("scroll", this.lazyLoad);
        window.scrollTo(0, 0);
        setTimeout(this.lazyLoad, 500)
      },
    computed: {
      owned() { return this.set?.owned ? this.set.owned : {} }
    }
}
</script>

