 <template>
      <div class="container set-item-list-container">
        <div v-if="items.length > 0" class="is-flex padded filterBar">
          <div class="control has-icons-left">
            <input
              v-model="search"
              class="input is-small is-rounded has-background-dark has-text-grey"
              type="text"
              @input="$event.target.composing = false"
              placeholder="Name or Type.."
            />
            <span class="icon is-small is-left">
              <i class="fa fa-search"></i>
            </span>
          </div>

          <div class="control has-icons-left is-hidden-mobile">
            <input
              v-model="textSearch"
              class="input is-small is-rounded has-background-dark has-text-grey"
              type="text"
              @input="$event.target.composing = false"
              placeholder="Card/Oracle Text.."
            />
            <span class="icon is-small is-left">
              <i class="fa fa-search"></i>
            </span>
          </div>

          <div class="select is-small is-rounded has-text-grey">
            <select v-model="rarity" class="has-text-grey">
              <option value="" selected>Any Rarity</option>
              <option disabled>---</option>
              <option value="common">Common</option>
              <option value="uncommon">Uncommon</option>
              <option value="rare">Rare</option>
              <option value="mythic">Mythic</option>
              <option value="special">Special</option>
              <option value="basic land">Basic Land</option>
              <option value="token">Token</option>
            </select>
          </div>

          <div
            class="select is-small is-rounded has-text-grey"
            v-if="variants.length > 0"
          >
            <select v-model="variant" class="has-text-grey">
              <option value="" selected>Any Variant</option>
              <option disabled>---</option>
              <option value="none">No Variants</option>
              <option v-for="v in variants" :value="v">
                {{ v.replace(') (', ' ') }}
              </option>
            </select>
          </div>

          <div
            class="select is-small is-rounded has-text-grey is-hidden-mobile"
            v-if="Object.keys(cardsowned).length > 0"
          >
            <select v-model="showOwned" class="has-text-grey">
              <option value="" selected>All</option>
              <option disabled>---</option>
              <option value="true reg">Owned Regular</option>
              <option value="true foil">Owned Foil</option>
              <option value="false reg">Not Owned Regular</option>
              <option value="false foil">Not Owned Foil</option>
            </select>
          </div>

          <div class="field has-addons is-hidden-mobile">
            <p class="control">
              <a
                class="button is-small is-rounded is-static has-background-dark has-text-grey"
              >
                $ >
              </a>
            </p>
            <p class="control">
              <input
                class="input is-small is-rounded valueAboveInput"
                v-model="valueAbove"
                type="text"
                placeholder="00.00"
              />
            </p>
          </div>

          <div class="field has-addons is-hidden-mobile">
            <p class="control">
              <a
                class="button is-small is-rounded is-static has-background-dark has-text-grey"
              >
                $ <
              </a>
            </p>
            <p class="control">
              <input
                class="input is-small is-rounded valueAboveInput"
                v-model="valueBelow"
                type="text"
                placeholder="00.00"
              />
            </p>
          </div>

          <div class="field is-hidden-mobile">
            <p class="control">
              <a class="button is-small is-rounded" @click="toggleFullView()">
                <span class="icon">
                  <i class="fa fa-file-photo-o"></i>
                </span>
              </a>
            </p>
          </div>

          <div class="field" style="margin-left: auto">
            <button
              class="button is-small is-dark has-text-danger is-outlined"
              @click="clearFilters()"
            >
              <span class="icon is-small is-left">
                <i class="fa fa-times-circle-o"></i>
              </span>
              <span>Clear <span class="is-hidden-mobile">Filters</span></span>
            </button>
          </div>
        </div>
        <div
          v-if="items.length > 0 && this.filteredItems.length == 0"
          class="box has-text-centered"
        >
          <h4 class="title">No Results Found</h4>
          <button class="button" @click="clearFilters()">
            Clear Search and Filters
          </button>
        </div>
        <table id="set-table" class="table is-striped is-bordered">
          <thead class="has-background-black">
            <tr>
              <th class="owned">
                <span class="green fa fa-check-circle"></span>
              </th>

              <th class="is-clickable" @click="changeSortMetric('name')">
                <span>Name</span>
                <span v-if="this.sortMetric == 'name'" class="icon">
                  <i
                    v-if="this.sortDirection == 'DESC'"
                    class="fa fa-caret-down"
                  ></i>
                  <i
                    v-if="this.sortDirection == 'ASC'"
                    class="fa fa-caret-up"
                  ></i>
                </span>
              </th>
              <th class="is-clickable" @click="changeSortMetric('rarity')">
                <span>Rarity</span>
                <span v-if="this.sortMetric == 'rarity'" class="icon">
                  <i
                    v-if="this.sortDirection == 'DESC'"
                    class="fa fa-caret-down"
                  ></i>
                  <i
                    v-if="this.sortDirection == 'ASC'"
                    class="fa fa-caret-up"
                  ></i>
                </span>
              </th>
              <th
                class="is-clickable is-hidden-mobile"
                @click="changeSortMetric('collectors_number')"
              >
                <span>C#</span>
                <span
                  v-if="this.sortMetric == 'collectors_number'"
                  class="icon"
                >
                  <i
                    v-if="this.sortDirection == 'DESC'"
                    class="fa fa-caret-down"
                  ></i>
                  <i
                    v-if="this.sortDirection == 'ASC'"
                    class="fa fa-caret-up"
                  ></i>
                </span>
              </th>
              <th
                class="is-clickable"
                @click="changeSortMetric('price_change')"
              >
                <span>Change</span>
                <span v-if="this.sortMetric == 'price_change'" class="icon">
                  <i
                    v-if="this.sortDirection == 'DESC'"
                    class="fa fa-caret-down"
                  ></i>
                  <i
                    v-if="this.sortDirection == 'ASC'"
                    class="fa fa-caret-up"
                  ></i>
                </span>
              </th>
              <th class="is-clickable" @click="changeSortMetric('tcg_mid')">
                <span>Reg. Price</span>
                <span v-if="this.sortMetric == 'tcg_mid'" class="icon">
                  <i
                    v-if="this.sortDirection == 'DESC'"
                    class="fa fa-caret-down"
                  ></i>
                  <i
                    v-if="this.sortDirection == 'ASC'"
                    class="fa fa-caret-up"
                  ></i>
                </span>
              </th>
              <th class="is-clickable" @click="changeSortMetric('foil_price')">
                <span>Foil Price</span>
                <span v-if="this.sortMetric == 'foil_price'" class="icon">
                  <i
                    v-if="this.sortDirection == 'DESC'"
                    class="fa fa-caret-down"
                  ></i>
                  <i
                    v-if="this.sortDirection == 'ASC'"
                    class="fa fa-caret-up"
                  ></i>
                </span>
              </th>
            </tr>
          </thead>

          <tbody v-if="items.length > 0">
            <tr
              v-for="item in filteredItems"
              :key="item.emid"
              :owned="isCardOwned(item.emid, 'regular')"
              :ownedfoil="isCardOwned(item.emid, 'foiled')"
              :fullview="fullView"
              @emit-wiki="openWiki(item)"
              is="set-tr"
              :item="item"
            ></tr>
          </tbody>

          <!-- shown if note logged in -->
        </table>
        <item-wiki-edit
          v-bind:item="wikiItem"
          @emit-wiki-close="closeWiki()"
          v-bind:open="wikiOpen"
        ></item-wiki-edit>
      </div>
</template>

<script>
export default {
  name: 'SetItemList',

    data: function data() {

        return {
            title: 'Set Name',
            items: [],
            tab: 'list',
            cardsowned: {},
            setData: {},
            cardsOwned: {},
        };

    },
     mounted () {
      console.log('setitemlist',this.items)

  },
}
</script>

