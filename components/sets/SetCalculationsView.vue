<template>
  <div class="p-4">
    <nav class="level is-mobile">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading is-size-7-mobile">Unique Items</p>
          <p class="title is-size-4-mobile">{{set.items.length}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading is-size-7-mobile">
            Reg. Set <span class="hide-mobile">Value</span>
          </p>
          <p class="title is-size-4-mobile">${{set.total_value.toFixed(2)}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading is-size-7-mobile">
            Foil Set <span class="hide-mobile">Value</span>
          </p>
          <p class="title is-size-4-mobile">
            <span class="average_foil">${{set.foil_value.toFixed(2)}}</span>
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading is-size-7-mobile">
            Box <span class="hide-mobile">Expected Value</span>
          </p>
          <p class="title is-size-4-mobile">
            <span class="average_value">${{set.box_value.toFixed(2)}}</span>
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading is-size-7-mobile">
            Pack <span class="hide-mobile">Expected Value</span>
          </p>
          <p class="title is-size-4-mobile">${{set.pack_value.toFixed(2)}}</p>
        </div>
      </div>
    </nav>

    <div class="columns">
      <div class="column is-two-forths">
        <div class="card">
          <div class="card-header">
            <h3 class="card-header-title">

               <b-icon icon="calculator" class="icon has-text-grey" size="is-small" />
              <span>{{set.name}} and Pull Odds</span>
            </h3>
          </div>

          <div class="card-content" style="padding: 0">
            <table class="table is-striped is-fullwidth">

              <thead>
                <tr>
                  <th></th>
                  <th>Mythic</th>
                  <th>Rare</th>
                  <th>Uncommon</th>
                  <th>Common</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span class="average_value">{{set.total_cards}} Unique Cards</span>
                  </td>
                  <td><span class="average_value">{{set.mythic_total}}</span></td>
                  <td><span class="average_value">{{set.rare_total}}</span></td>
                  <td><span class="average_value">{{set.uncommon_total}}</span></td>
                  <td><span class="average_value">{{set.common_total}}</span></td>
                </tr>
                <tr>
                  <td>Average Value</td>
                  <td><span class="average_value">${{set.mythic_value_average}}</span></td>
                  <td><span class="average_value">${{set.rare_value_average}}</span></td>
                  <td><span class="average_value">${{set.uncommon_value_average}}</span></td>
                  <td><span class="average_value">${{set.common_value_average}}</span></td>
                </tr>
                <tr>
                  <td>Average Foil Value</td>
                  <td><span class="average_foil">${{set.mythic_foil_value_average}}</span></td>
                  <td><span class="average_foil">${{set.rare_foil_value_average}}</span></td>
                  <td><span class="average_foil">${{set.uncommon_foil_value_average}}</span></td>
                  <td><span class="average_foil">${{set.common_foil_value_average}}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <div class="card-header">
            <h3 class="card-header-title">
              <span class="icon has-text-grey">
                <b-icon icon="database" size="is-small" />
              </span>

              <span>{{set.name}} Collection Tally</span>
            </h3>
          </div>

          <div class="card-content">
            <a
              @click="emitAddFullSet()"
              class="button is-small has-icon-left is-pulled-right"
            >
              <b-icon icon="plus" size="is-small" />
              <span>Add Full Set</span>
            </a>
            <h5 class="title is-size-6">
              You own {{totalRegularOwned}} ({{set.percentage_owned}}%) of {{set.total_regular_cards}} Regular Cards*
            </h5>
            <progress
              class="progress is-medium is-info"
              :value="totalRegularOwned"
              :max="set.total_regular_cards"
            >
              {{totalRegularOwned}}
            </progress>

            <h5 class="title is-size-6">
              You own {{totalFoiledOwned}} ({{set.foil_percentage_owned}}%) of {{set.total_foil_cards}} Foiled Cards*
            </h5>
            <progress
              class="progress is-medium is-warning"
              :value="totalFoiledOwned"
              :max="set.total_foil_cards"
            >
              {{totalFoiledOwned}}
            </progress>

            <small
              >*Total regular and foil card counts are talled based on if a
              price exists. There may be situations where you own a foil
              without a price and you would own 101% of cards.</small
            >
            <br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'SetCalculationsView',
  props: {
      set: {
        type: Object,
        default: () => {}
      }
  },
  created() {
    this.$echomtg.log(this.set)
  },
  computed:{
    totalFoiledOwned(){
        return Object.keys(this.set.foil_cards_owned || {}).length
    },
    totalRegularOwned(){
      return Object.keys(this.set.cards_owned || {}).length
    }
  }

}
</script>

