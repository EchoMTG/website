<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />
    <full-ad title="You Must be Logged in to Use the Inventory App"
      image="https://assets.echomtg.com/images/product/collection-app-2023.png"
    v-if="!authenticated"/>
    <span v-if="authenticated">
      <section class="has-background-black has-text-white ">


        <nav class="level is-mobile pt-2">

          <div class="level-item has-text-centered">
            <div>
              <p class="heading is-size-7-touch has-text-grey"><span class="is-hidden-touch">{{getDate()}}</span> Value</p>
              <p class="title is-size-5 has-text-light is-size-6-touch">{{cs}}{{quickstats.current_value}}</p>
            </div>
          </div>
          <div class="level-item has-text-centered is-hidden-touch">
            <div>
              <p class="heading is-size-7-touch has-text-grey">Low Value</p>
              <p class="title is-size-5 has-text-light is-size-6-touch">{{quickstats.current_value_low}}</p>
            </div>
          </div>

          <div class="level-item has-text-centered">
            <div>
              <p class="heading is-size-7-touch has-text-grey"><span class="is-hidden-touch">Acquired</span><span class="is-hidden-desktop">Acq.</span> Cost</p>
              <p class="title is-size-5 has-text-light is-size-6-touch">{{cs}}{{quickstats.acquired_value}}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading is-size-7-touch has-text-grey"><span class="is-hidden-touch">All-time</span> Gain/Loss</p>
              <p class="title is-size-5 has-text-light is-size-6-touch"><span :class="quickstats.change_value >= 0 ? `has-text-success` : `has-text-danger`">{{quickstats.change_value}}%</span></p>
            </div>
          </div>
          <div class="level-item has-text-centered is-hidden-touch">
            <div>
              <p class="heading is-size-7-touch has-text-grey">Profit/Loss</p>
              <p class="title is-size-5 has-text-light is-size-6-touch"><span>{{cs}}{{quickstats.total_profit}}</span></p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading is-size-7-touch has-text-grey">Items <span class="is-hidden-touch">Tracked</span></p>
              <p class="title is-size-5 has-text-light is-size-6-touch"><b-icon size="is-small" type="is-danger" v-if="overCardCap" icon="alert-circle" /> {{quickstats.total_items}}</p>
            </div>
          </div>
          <div class="level-item has-text-centered is-hidden-touch">
            <div>
              <p class="heading is-size-7-touch has-text-grey"><b-icon icon="mirror-rectangle" size="is-small" class="foil-symbol" /> Foils</p>
              <p class="title is-size-5 has-text-light is-size-6-touch">{{quickstats.total_foils}}</p>
            </div>
          </div>
          <div class="level-item has-text-centered is-hidden-touch">
            <div>
              <p class="heading is-size-7-touch has-text-grey">Sealed Items</p>
              <p class="title is-size-5 has-text-light is-size-6-touch"><nuxt-link to="/apps/sealed/">{{quickstats.total_sealed}}</nuxt-link></p>
            </div>
          </div>
           <div class="level-item has-text-centered is-hidden-touch">
            <div>
              <p class="heading is-size-7-touch has-text-grey">For Trade</p>
              <p class="title is-size-5 has-text-light is-size-6-touch"><nuxt-link :to="`/${user.username}/trades/`">{{quickstats.total_tradable}}</nuxt-link></p>
            </div>
          </div>
          <div class="level-item is-flex is-flex-direction-row-reverse is-hidden-touch">
            <export-dropdown class="is-align-items-end mr-2"  />
            <nuxt-link to="/user/settings/" class="button is-small is-dark is-outlined mr-2 has-text-white">
              <b-icon icon="account-cash" size="is-small" class="mr-1" /> {{quickstats.currency_symbol}}{{quickstats.user?.currency_code}}
            </nuxt-link>
          </div>
        </nav>

        <div class="level p-0 mb-1 is-mobile is-hidden-mobile">
          <div class="level-left is-flex-grow-3	is-hidden-touch">
            <p style="min-width: 90px" class="ml-2 has-text-weight-bold is-size-6">Quick Add:</p>
            <global-search
              showimage
              inventoryAddCallbackOn
              showinventorybuttons

              :callbackname="'Add to Inventory'" />
              <nuxt-link class="button is-small mr-2 is-dark is-outlined has-text-white"  to="/apps/import/"><b-icon icon="tray-arrow-down" size="is-small" class="mr-1"/> CSV/Scanner Import</nuxt-link>
              <a class="button is-small is-danger has-icon-left" href="https://www.youtube.com/watch?v=LG1EVm-cEqk" target="_blank"><b-icon icon="youtube" size="is-small" /><span>How to Video</span></a>
          </div>
          <div class="level-right is-align-content-stretch	is-align-items-center	ml-2" v-if="user.plan != 'common'">
            <b-tooltip :label="inventoryStats?.stats ? cs+(parseFloat(inventoryStats?.stats.all.mythics_value).toFixed(2)) : '0'">
              <b-taglist class="mb-0 level-item is-clickable" attached>
                <b-tag type="is-black" class="mb-0"><i class="ss ss-magic mythic-symbol mr-1"></i> Mythics</b-tag>
                <b-tag class="mb-0 has-background-black-ter has-text-white">{{quickstats.total_mythic}}</b-tag>
              </b-taglist>
            </b-tooltip>
            <b-tooltip :label="inventoryStats?.stats ? cs+(parseFloat(inventoryStats?.stats.all.rares_value).toFixed(2))  : '0'">
              <b-taglist class="mb-0 level-item is-clickable" attached>
                <b-tag type="is-black" class="mb-0"><i class="ss ss-magic rare-symbol mr-1"></i>Rares</b-tag>
                <b-tag class="mb-0 has-background-black-ter has-text-white">{{quickstats.total_rare}}</b-tag>
              </b-taglist>
            </b-tooltip>
            <b-tooltip :label="inventoryStats?.stats ? cs+(parseFloat(inventoryStats?.stats.all.uncommons_value).toFixed(2)) : '0'">
             <b-taglist class="mb-0 level-item is-clickable" attached>
              <b-tag type="is-black" class="mb-0"><i class="ss ss-magic uncommon-symbol mr-1"></i>Uncommons</b-tag>
              <b-tag class="mb-0 has-background-black-ter has-text-white">{{quickstats.total_uncommon}}</b-tag>
            </b-taglist>
            </b-tooltip>
            <b-tooltip :label="inventoryStats?.stats ? cs+(parseFloat(inventoryStats?.stats.all.commons_value).toFixed(2)) : '0'">
            <b-taglist class="mb-0 level-item is-clickable" attached>
              <b-tag type="is-black" class="mb-0"><i class="ss ss-magic common-symbol mr-1"></i>Commons</b-tag>
              <b-tag class="mb-0 has-background-black-ter has-text-white">{{quickstats.total_common}}</b-tag>
            </b-taglist>
            </b-tooltip>
             <div class="mb-0 level-item" >
             </div>
          </div>
          <div class="level-right" v-else>
            <p class="level-item mr-4 ml-2">
            Support EchoMTG development. <nuxt-link class="ml-1" to="/plans/">Plans start at $2/mo or $20/year</nuxt-link>
            </p>
          </div>
        </div>
        <nav class="level is-mobile p-2">
          <div class="level-left">
            <b-input
                placeholder="Search Inventory..."
                v-model="search"
                icon="magnify"

                size="is-small"
                class="level-item mr-2"
                />

            <feature-gate :showAd="false" :gate-level="1" classes="level-item is-hidden-mobile">
              <set-selector class="level-item is-hidden-mobile"  :callback="setExpansion" />
            </feature-gate>
            <b-dropdown class="level-item is-hidden-mobile" v-if="checkedRows.length > 0" :expanded="true" :triggers="['hover']" aria-role="list">
              <template #trigger>
                  <b-button
                      size="is-small"
                      icon-left="lightning-bolt"
                      type="is-info"
                      :label="`Bulk Action (${checkedRows.length})`"
                      icon-right="menu-down" />
              </template>
              <b-dropdown-item @click="toggleBulkModal('addtolist')" aria-role="list-item"><b-icon icon="plus" size="is-small" /> Add to List</b-dropdown-item>
              <b-dropdown-item @click="toggleBulkModal('delete')" aria-role="list-item"><b-icon icon="delete" size="is-small" /> Delete</b-dropdown-item>
              <b-dropdown-item @click="toggleBulkModal('changedate')" aria-role="list-item"><b-icon icon="calendar" size="is-small" /> Change Date</b-dropdown-item>
              <b-dropdown-item @click="toggleBulkModal('changeprice')" aria-role="list-item"><b-icon icon="currency-usd" size="is-small"/> Acquired Price</b-dropdown-item>
              <b-dropdown-item @click="toggleBulkModal('togglefoil')" aria-role="list-item"><b-icon icon="star-shooting-outline" size="is-small"/> Toggle Foil</b-dropdown-item>
              <b-dropdown-item @click="toggleBulkModal('toggletradable')" aria-role="list-item"><b-icon icon="hand-coin" size="is-small"/> Toggle Tradable</b-dropdown-item>
            </b-dropdown>
          </div>
          <div class="level-right">
            <touch-flyout buttonText="Filters" classes="inventory-flyout">
              <div class="level-item touch-flyout-container  is-flex is-flex-direction-row" >
                <b-field class="mr-1" style="margin-bottom: 0 !important;">
                  <p class="control">
                      <b-button aria-disabled="true" type="is-dark" class="has-background-dark has-text-white" disabled size="is-small">
                        <strong>{{cs}} &gt;</strong>
                      </b-button>
                  </p>
                  <b-input
                    v-model="priceOver"
                    size="is-small"
                    style="max-width: 50px;"
                    placeholder="2.10"
                    />
                </b-field>
                <b-field class="mr-1" style="margin-bottom: 0 !important;">
                  <p class="control">
                      <b-button aria-disabled="true" type="is-dark" class="has-background-dark has-text-white" disabled size="is-small">
                        <strong>{{cs}} &lt;</strong>
                      </b-button>
                  </p>
                  <b-input
                    style="max-width: 50px;"
                    v-model="priceUnder"
                    size="is-small"
                    placeholder="9.20"
                    />
                </b-field>
                <b-select class="mr-1"  placeholder="Show Tradable" size="is-small" v-model="tradable">
                    <option selected value="">By Tradable</option>
                    <option disabled>---</option>
                    <option value="">Show All</option>
                    <option value="0">Not for Trade</option>
                    <option value="1">Only Tradable</option>
                </b-select>
                <b-select class="mr-1"  placeholder="Color" size="is-small" v-model="color">
                  <option selected="selected" value="">By Color</option>
                  <option disabled="disabled">----</option>
                  <option data-color="All" value="">All</option>
                  <option data-color="Land" value="land">Land</option>
                  <option data-color="Colorless" value="colorless">Colorless</option>
                  <option data-color="Blue" value="blue">Blue</option>
                  <option data-color="Black" value="black">Black</option>
                  <option data-color="White" value="white">White</option>
                  <option data-color="Red" value="red">Red</option>
                  <option data-color="Green" value="green">Green</option>
                  <option data-color="Multicolor" value="multicolor">Multicolor</option>
                </b-select>
                <b-select class="mr-1"  placeholder="Rarity" size="is-small" v-model="rarity">
                    <option selected="selected" value="" disabled="disabled">By Rarity</option>
                    <option value="false">All</option>
                    <option value="sealed">Sealed</option>
                    <option disabled="disabled">----</option>
                    <option value="Mythic Rare">Mythic</option>
                    <option value="Rare">Rare</option>
                    <option value="Uncommon">Uncommon</option>
                    <option value="Common">Common</option>
                    <option value="Basic Land">Basic Land</option>
                    <option value="Special">Special</option>
                    <option value="Token">Token</option>
                </b-select>
                <feature-gate :showAd="false" :gate-level="1" classes="">
                  <b-select placeholder="Foil" size="is-small" class="mr-1" v-model="foil">
                    <option selected="selected" value="">By Foil</option>
                    <option disabled="disabled">----</option>
                    <option data-color="All" value="">All</option>
                    <option data-color="Only Foils" value="1">Only Foils</option>
                    <option data-color="Non Foils" value="0">Non-foils</option>
                  </b-select>
                </feature-gate>
                <feature-gate :showAd="false" :gate-level="1" classes="">
                  <b-select placeholder="CMC" size="is-small" class="mr-1" v-model="cmc">
                    <option selected="selected" value="">By CMC</option>
                    <option disabled="disabled">----</option>
                    <option value="">Any</option>
                    <option value="=0"> = 0</option><option value="<=0"> &lt;= 0</option><option value="=1"> = 1</option><option value="<=1"> &lt;= 1</option><option value="=2"> = 2</option><option value="<=2"> &lt;= 2</option><option value="=3"> = 3</option><option value="<=3"> &lt;= 3</option><option value="=4"> = 4</option><option value="<=4"> &lt;= 4</option><option value="=5"> = 5</option><option value="<=5"> &lt;= 5</option><option value="=6"> = 6</option><option value="<=6"> &lt;= 6</option><option value="=7"> = 7</option><option value="<=7"> &lt;= 7</option><option value="=8"> = 8</option><option value="<=8"> &lt;= 8</option><option value="=9"> = 9</option><option value="<=9"> &lt;= 9</option><option value="=10"> = 10</option><option value="<=10"> &lt;= 10</option><option value="=11"> = 11</option><option value="<=11"> &lt;= 11</option><option value="=12"> = 12</option><option value="<=12"> &lt;= 12</option><option value="=13"> = 13</option><option value="<=13"> &lt;= 13</option><option value="=14"> = 14</option><option value="<=14"> &lt;= 14</option><option value="=15"> = 15</option><option value="<=15"> &lt;= 15</option>
                  </b-select>
                </feature-gate>
                <feature-gate adText="Upgrade Now for more filters, stats, reporting emails, features, and storage" :gateLevel="1" classes="level-item is-hidden-mobile">
                  <b-select placeholder="Reserve List" size="is-small" class="mr-1" v-model="reserve_list">
                      <option selected disabled value="">Reserve List</option>
                      <option disabled>---</option>
                      <option value="false">Show All</option>
                      <option value="true">Only Reserve</option>
                  </b-select>
                </feature-gate>
                <div class="is-clearfix" />
              </div>
            </touch-flyout>

          </div>
        </nav>

      </section>
      <section>
        <bulk-edit-modal :currency_symbol="cs" :removeChecked="clearChecked" :active="showBulkActionModal" :toggleBulkModal="toggleBulkModal" :selecteditems="checkedRows" :actiontype="bulkActionType" :callback="$fetch" />
      </section>
      <b-table
        :data="currentInventoryPage"
        :loading="loading"
        :height="tableHeight"
        :debounce-search="0"
        :sticky-header="true"
        paginated
        backend-pagination
        pagination-size="is-small"
        pagination-order="is-right"
        :total="total"
        :per-page="perPage"
        @page-change="onPageChange"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
        :page-input="false"
        backend-sorting
        sort-icon-size="is-small"
        sort-icon="arrow-up"
        :default-sort-direction="defaultSortOrder"
        :default-sort="[sortField, sortOrder]"
        @sort="onSort"
        striped
        narrowed
        :mobile-cards="false"
        :detailed="$device.isDesktop ? true : false"
        custom-detail-row
        @details-open="(row, index) => $buefy.toast.open(`Expanded ${row.name}`)"
        :show-detail-icon="$device.isDesktop ? true : false"
        ref="table"
        detail-key="inventory_id"
        :checked-rows.sync="checkedRows"
        checkable
        :checkbox-position="`left`"
        >

          <b-table-column field="name" label="Name" sortable v-slot="props">
            <item-inspector-wrapper :deactivateHover="false" :showsetsymbol="true" :item="props.row" />
          </b-table-column>
          <b-table-column width="175" cell-class="is-hidden-touch" header-class="is-hidden-touch" field="set" label="Expansion" sortable v-slot="props">
            <set-tag :code="props.row.set_code" :name="props.row.set" :url="props.row?.echo_set_url ? props.row.echo_set_url :''"/>

          </b-table-column>

          <!-- Mobile Version Combined Price Data -->
          <b-table-column cell-class="is-hidden-desktop" width="120" header-class="is-hidden-desktop"  :field="user.use_market == 1 ? 'tcg_market' : 'tcg_mid'" label="Price" sortable v-slot="props">
            <span class="has-text-warning-dark" v-if="props.row.foil == 1 && props.row.foil_price > 0">
            {{cs}}{{props.row?.foil_price.toFixed(2)}}
            </span>
            <span v-if="props.row.foil == 0 && props.row.tcg_market > 0 && user.use_market == 1">
            {{cs}}{{props.row?.tcg_market.toFixed(2)}}
            </span>
            <span v-if="props.row.foil == 0 && props.row.tcg_mid > 0 && user.use_market == 0">
            {{cs}}{{props.row?.tcg_mid.toFixed(2)}}
            </span>
            <span v-if="props.row.price_change !== 0" :class="type(props.row.price_change)" style="padding: 2px 4px; font-size: 9px;">
              {{ props.row.price_change }}%
            </span>
          </b-table-column>
          <b-table-column width="70" cell-class="is-hidden-touch" header-class="is-hidden-touch" field="price_change" label="7-Day" sortable v-slot="props">
            <span :class="type(props.row.price_change)">
              <b-icon icon="triangle-small-up" size="is-small" v-if="props.row.price_change > 0" />
              <b-icon icon="triangle-small-down" size="is-small" v-if="props.row.price_change < 0" />
              {{ props.row.price_change }}%
            </span>

          </b-table-column>
          <b-table-column width="70" cell-class="is-hidden-touch" header-class="is-hidden-touch" field="tcg_market" label="Price" sortable v-slot="props">
            <span class="has-text-warning-dark" v-if="props.row.foil == 1 && props.row.foil_price > 0">
            {{cs}}{{props.row?.foil_price.toFixed(2)}}
            </span>
            <span v-if="props.row.foil == 0 && props.row.tcg_market > 0 && user.use_market == 1">
            {{cs}}{{props.row?.tcg_market.toFixed(2)}}
            </span>
            <span v-if="props.row.foil == 0 && props.row.tcg_mid > 0 && user.use_market == 0">
            {{cs}}{{props.row?.tcg_mid.toFixed(2)}}
            </span>
          </b-table-column>

          <b-table-column width="80" cell-class="is-hidden-touch" header-class="is-hidden-touch" field="personal_gain" label="Gain/Loss"  sortable centered v-slot="props">
            <span v-if="props.row.price_acquired !== 0" class="tag" :class="type(props.row.gain)">
              {{ props.row.gain }}%
            </span>
            <b-tooltip label="When acquired price is set to 0 there is infinite value. To the moon!" type="is-success" v-else>
             <span class="has-text-success" ><b-icon icon="infinity" /></span>
            </b-tooltip>
          </b-table-column>

          <b-table-column width="110" field="price_acquired" cell-class="is-hidden-mobile" header-class="is-hidden-mobile" :label="`Acq. Price`" v-slot="props" sortable centered>
              <price-acquired-input :currency_symbol="cs" :inventory_id="props.row.inventory_id" :price_acquired="props.row.price_acquired" :callback="refreshPriceMeta"  />
          </b-table-column>
          <b-table-column width="115" cell-class="is-hidden-mobile" header-class="is-hidden-mobile" field="date_acquired" label="Acq. Date" v-slot="props" sortable centered>

              <date-acquired-input :date="props.row.date_acquired"  :inventory_id="props.row.inventory_id" />

          </b-table-column>

          <b-table-column  label="Bulk Action">
            <template v-slot:header="{ column }">

            </template>
            <template  v-slot="props">

              <touch-flyout>
                <div class="is-flex	is-justify-content-space-between ">
                  <NuxtImg width="170" class="is-hidden-fullhd mr-2" :src="props.row.image" :alt="`${props.row.name} image`" />
                  <div class="touch-flyout-container is-flex-grow-2 is-flex">
                    <div class="is-hidden-fullhd">
                      <price-acquired-input :currency_symbol="cs" :inventory_id="props.row.inventory_id" :callback="refreshPriceMeta" :price_acquired="props.row.price_acquired"  />
                      <date-acquired-input class="mb-2-touch" :date="props.row.date_acquired"  :inventory_id="props.row.inventory_id" />
                    </div>
                    <div class="is-flex mb-2-touch">
                      <condition-select class="mr-1" :inventory_id="props.row.inventory_id" :current_condition="props.row.condition"  />
                      <language-select class="mr-1" :inventory_id="props.row.inventory_id" :current_language="props.row.lang"  />
                    </div>
                    <div class="is-flex mb-2-touch">
                      <note-button class="mr-1" :inventory_item="props.row" :callback="$fetch"/>
                      <move-to-earnings-button class="mr-1" :inventory_item="props.row" :currency_symbol="cs" :callback="$fetch"/>
                      <toggle-foil-button class="mr-1" :disabled="!props.row.foil_price > 0" :inventory_id="props.row.inventory_id" :foil="props.row.foil" :callback="$fetch" />
                    </div>
                    <div class="is-flex is-flex-grow-2 mb-2-touch">
                      <toggle-tradable-button class="mr-1" :inventory_id="props.row.inventory_id" :tradable="props.row.tradable" :callback="$fetch" />
                      <duplicate-button class="mr-1" :copy="props.row" :callback="$fetch" />
                      <delete-inventory-button class="ml-auto mr-1" :inventory_id="props.row.inventory_id" :callback="() => removeFromList(props.index)" />
                    </div>
                  </div>
                </div>
              </touch-flyout>


            </template>
          </b-table-column>

          <template slot="detail" slot-scope="props">
            <tr>
              <td colspan="10" style="max-height: 300px">
                <section >
                  <div class="columns">
                    <div class="column is-one-fifth">
                      <b-image
                        :alt="props.row.name"
                        :src="props.row.image"
                        placeholder="https://assets.echomtg.com/magic/cards/magic-card-back.jpg"
                        />
                    </div>
                    <div class="column is-two-fifths">
                      <quick-graph
                        :emid="props.row.emid"
                        :acquired_price="props.row.price_acquired"
                        :acquired_date="props.row.date_acquired"
                        :foil="props.row.foil"
                        />
                    </div>
                    <div class="column is-two-fifths">
                      <item-list-box :item="props.row" />
                    </div>
                  </div>
                </section>
              </td>
            </tr>
          </template>

          <template #bottom-left>
            <div class="is-flex">
              <b-dropdown class="mr-2" v-if="checkedRows.length > 0" position="is-top-right" :expanded="true" :triggers="['hover']" aria-role="list">
                  <template #trigger>
                      <b-button
                          size="is-small"
                          icon-left="lightning-bolt"
                          class="is-pulled-right"
                          type="is-info"
                          :label="`Bulk Action (${checkedRows.length})`"
                          icon-right="menu-down" />
                  </template>
                  <b-dropdown-item @click="toggleBulkModal('addtolist')" aria-role="list-item"><b-icon icon="plus" size="is-small" /> Add to List</b-dropdown-item>
                  <b-dropdown-item @click="toggleBulkModal('delete')" aria-role="list-item"><b-icon icon="delete" size="is-small" /> Delete</b-dropdown-item>
                  <b-dropdown-item @click="toggleBulkModal('changedate')" aria-role="list-item"><b-icon icon="calendar" size="is-small" /> Change Date</b-dropdown-item>
                  <b-dropdown-item @click="toggleBulkModal('changeprice')" aria-role="list-item"><b-icon icon="currency-usd" size="is-small"/> Acquired Price</b-dropdown-item>
                  <b-dropdown-item @click="toggleBulkModal('togglefoil')" aria-role="list-item"><b-icon icon="star-shooting-outline" size="is-small"/> Toggle Foil</b-dropdown-item>
                  <b-dropdown-item @click="toggleBulkModal('toggletradable')" aria-role="list-item"><b-icon icon="hand-coin" size="is-small"/> Toggle Tradable</b-dropdown-item>
                </b-dropdown>
                <b-select size="is-small" v-model="perPage">
                  <option
                    v-for="num in paginationOptions"
                    :value="num"
                    v-bind:key="num+`page`"
                    >{{num}} Per Page</option>
                </b-select>
              <!-- <b>Total checked</b>: {{ checkedRows.length }} -->
              </div>
          </template>

      </b-table>
    </span>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import DeleteInventoryButton from '~/components/inventory/DeleteInventoryButton.vue'
import ItemInspectorWrapper from '~/components/items/ItemInspectorWrapper.vue'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue'
import SetSelector from '~/components/magic/SetSelector.vue'
import ToggleTradableButton from '~/components/inventory/ToggleTradableButton.vue'
import PriceAcquiredInput from '~/components/inventory/PriceAcquiredInput.vue'
import DateAcquiredInput from '~/components/inventory/DateAcquiredInput.vue'
import QuickGraph from '~/components/inventory/QuickGraph.vue'
import ItemListBox from '~/components/items/ItemListBox.vue'
import ExportDropdown from '~/components/inventory/ExportDropdown.vue'
import DuplicateButton from '~/components/inventory/DuplicateButton.vue'
import ToggleFoilButton from '~/components/inventory/ToggleFoilButton.vue'
import SetTag from '~/components/magic/SetTag.vue'
import MoveToEarningsButton from '~/components/inventory/MoveToEarningsButton.vue'
import NoteButton from '~/components/inventory/NoteButton.vue'
import BulkEditModal from '~/components/inventory/BulkEditModal.vue'
import ConditionSelect from '~/components/inventory/ConditionSelect.vue'
import LanguageSelect from '~/components/inventory/LanguageSelect.vue'
import FullAd from '~/components/cta/FullAd.vue'
import FeatureGate from '~/components/user/FeatureGate.vue'
import TouchFlyout from '~/components/responsive/TouchFlyout.vue'
import GlobalSearch from '@/components/GlobalSearch.vue'

export default {
  fetchOnServer: true,
  name: 'Inventory',
  components: {
    EchoBreadCrumbs,
    ItemInspectorWrapper,
    DeleteInventoryButton,
    PriceAcquiredInput,
    SetSelector,
    ToggleTradableButton,
    QuickGraph,
    ItemListBox,
    DateAcquiredInput,
    ExportDropdown,
    DuplicateButton,
    ToggleFoilButton,
    MoveToEarningsButton,
    NoteButton,
    SetTag,
    BulkEditModal,
    ConditionSelect,
    LanguageSelect,
    FullAd,
    FeatureGate,
    TouchFlyout,
    GlobalSearch
  },
  data() {
      return {
          item_data: [],
          total: 0,
          loading: false,
          search: '',
          rarity: '',
          tradable: '',
          color: '',
          cmc: '',
          foil: '',
          reserve_list: '',
          priceOver: null,
          priceUnder: null,
          sortField: 'date_acquired',
          sortOrder: 'desc',
          defaultSortOrder: 'desc',
          page: 1,
          perPage: 100,
          paginationOptions: [
            100,250,500
          ],
          tableHeight: 400,
          windowHeight: 1000,
          debounce: null,
          set_code: '',
          checkedRows: [],
          showBulkActionModal: false,
          bulkActionType: 'Delete',
          inventoryStats: {}
      }
  },
  watch: {
    search() {
      clearTimeout(this.debounce)
      this.sortOrder = 'asc';
      this.defaultSortOrder = 'asc';
      this.sortField = 'name';
      if(this.search == ''){
        this.sortOrder = 'desc';
        this.defaultSortOrder = 'desc';
        this.sortField = 'date_acquired';
      }
      this.debounce = setTimeout(() => {
        this.$fetch();
      }, 600)
    },
    set_code(){
      this.$fetch();
    },
    authenticated(){
      this.$fetch();
    },
    tradable() {
      this.$fetch();
    },
    rarity() {
      this.$fetch();
    },
    foil() {
      this.$fetch();
    },
    color() {
      this.$fetch();
    },
    cmc() {
      this.$fetch();
    },
    reserve_list() {
      this.$fetch();
    },
    priceOver() {
      this.$fetch();
    },
    priceUnder() {
      this.$fetch();
    },
    perPage() {
      this.$fetch();
    },
    item_data(){
      this.$store.commit('currentInventoryPage',[...this.item_data]);
    }
  },
  async fetch() {
      if(!this.authenticated) return;

      this.loading = true
      try {
        let start = (this.page - 1) * this.perPage;
        const data = await this.$echomtg.inventoryView(
          start,
          this.perPage,
          this.sortOrder,
          this.sortField,
          this.search,
          this.set_code,
          this.color,
          this.rarity,
          this.tradable,
          this.reserve_list,
          this.cmc,
          this.priceOver,
          this.priceUnder,
          this.foil
          )

        this.item_data = []

        let currentTotal = data.meta.total_pages * data.meta.items_per_page

        this.total = currentTotal

        this.item_data = data.items
        this.clearChecked()

        this.loading = false

        this.onResize();

      } catch (error){

          this.item_data = []
          this.total = 0
          this.loading = false
      }
    },
  methods: {
    setExpansion(set){

      if(set?.set_code){
        this.set_code = set.set_code
      } else {
        this.set_code = ''
      }
    },
    clearChecked(){
      this.checkedRows = []
    },
    toggleBulkModal(type='') {
      this.showBulkActionModal = !this.showBulkActionModal
      this.bulkActionType = type !== '' ? type : 'delete'
    },
    getSetIcon(set_code){
      return this.$echomtg.setIconClass(set_code)
    },
    removeFromList(index){
      this.$delete(this.item_data, index)
      this.refreshPriceMeta()
    },

    async refreshPriceMeta(){
      const data = await this.$echomtg.inventoryQuickStats();
      this.$store.commit('quickstats',data.stats);
    },

    async getInventoryStats(){

      this.inventoryStats = await this.$echomtg.inventoryStats();
    },

    onPageChange(page) {
        this.page = page
        this.$fetch()
    },
    /*
      * Handle sort event
    */
    onSort(field, order) {
        this.sortField = field
        this.sortOrder = order
        this.$fetch()
    },
    /*
    * Type style in relation to the value
    */
    type(number) {
      if (number < -5) {
            return 'tag has-text-white has-background-danger'
        } else if (number > 5) {
            return 'tag  has-text-white has-background-success'
        } else if (number < 0) {
            return 'tag has-background-danger-light'
        } else if (number > 0) {
            return 'tag has-background-success-light'
        } else {
          return 'tag'
        }
    },

    updateTableHeight() {
      let height = 400;
      if(this.$refs.table){
        let rects = this.$refs.table.$el.getBoundingClientRect();
        height = (this.windowHeight - rects.top) - 80 // 120 is the table header and pagination bar
      }
      this.tableHeight = height
    },
    onResize() {
      this.windowHeight = window.innerHeight
      this.updateTableHeight()
    },
    getDate(){
      return this.$moment().format("MMM D YYYY");
    }
  },


  filters: {
    /**
    * Filter to truncate string, accepts a length parameter
    */
    truncate(value, length) {
        return value.length > length
            ? value.substr(0, length) + '...'
            : value
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },

  mounted() {
    this.onResize();
    this.$fetch()
    this.refreshPriceMeta()
    this.updateTableHeight()
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
    this.getInventoryStats()
  },
  computed: {
    cs() {
      return this.user.currency_symbol
    },
    overCardCap(){

      return this.user.planObject.card_cap <= parseInt(this.quickstats.total_items)
    },
    crumbs() {
      return [
        {
          label: 'Apps',
          url: '/apps/',
          icon: ''
        },
        {
          label: this.authenticated ? `${this.user.username}'s Inventory` : `Trading Card Inventory Tracking`,
          url: '/apps/inventory/',
          icon: ''
        }
      ]
    },
    ...mapState([
      'userName',
      'user',
      'authenticated',
      'quickstats',
      'currentInventoryPage'
    ])
  },
  head () {
    return {
        title: this.authenticated ? `${this.user.username}'s EchoMTG Inventory Binder` : `Magic the Gathering Inventory Collection Tracker`,
        meta: [
          {
            hid: 'og:image',
            property: 'og:image',
            content: `https://assets.echomtg.com/images/echomtg-og-default.png`
          },
          {
            hid: 'description',
            name: 'description',
            content:  `Manage your Trading card collection with EchoMTG organization tools.`
          }
        ]
    }
  }
}
</script>
