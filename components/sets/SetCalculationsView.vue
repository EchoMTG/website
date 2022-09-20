<template>
      <div class="container padded">
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
              <p class="title is-size-4-mobile">$671.83</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading is-size-7-mobile">
                Foil Set <span class="hide-mobile">Value</span>
              </p>
              <p class="title is-size-4-mobile">
                <span class="average_foil">$1718.67</span>
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading is-size-7-mobile">
                Box <span class="hide-mobile">Expected Value</span>
              </p>
              <p class="title is-size-4-mobile">
                <span class="average_value">$2390.5</span>
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading is-size-7-mobile">
                Pack <span class="hide-mobile">Expected Value</span>
              </p>
              <p class="title is-size-4-mobile">&mdash;</p>
            </div>
          </div>
        </nav>

        <div class="columns">
          <div class="column is-two-forths">
            <div class="card">
              <div class="card-header">
                <h3 class="card-header-title">
                  <span class="icon has-text-grey">
                    <i class="fa fa-calculator"></i>
                  </span>
                  <span>Streets of New Capenna Averages and Pull Odds</span>
                </h3>
              </div>

              <div class="card-content" style="padding: 0">
                <table class="set-numbers">
                  <tbody>
                    <tr>
                      <th></th>
                      <th>Mythic</th>
                      <th>Rare</th>
                      <th>Uncommon</th>
                      <th>Common</th>
                    </tr>
                    <tr>
                      <td>
                        <span class="average_value">527 Unique Cards</span>
                      </td>
                      <td><span class="average_value">54</span></td>
                      <td><span class="average_value">149</span></td>
                      <td><span class="average_value">110</span></td>
                      <td><span class="average_value">116</span></td>
                    </tr>
                    <tr>
                      <td>Average Value</td>
                      <td><span class="average_value">$1.91</span></td>
                      <td><span class="average_value">$0.69</span></td>
                      <td><span class="average_value">$0.16</span></td>
                      <td><span class="average_value">$0.13</span></td>
                    </tr>
                    <tr>
                      <td>Average Foil Value</td>
                      <td><span class="average_foil">$2.00</span></td>
                      <td><span class="average_foil">$0.66</span></td>
                      <td><span class="average_foil">$0.14</span></td>
                      <td><span class="average_foil">$0.11</span></td>
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
                    <i class="fa fa-database"></i>
                  </span>
                  <span>My Streets of New Capenna Collection Tally</span>
                </h3>
              </div>

              <div class="card-content">
                <a
                  @click="emitAddFullSet()"
                  class="button is-small has-icon-left is-pulled-right"
                >
                  <span class="icon"><i class="fa fa-plus"></i></span>
                  <span>Add Full Set</span>
                </a>
                <h5 class="title is-size-6">
                  You own 0 (0%) of 415 Regular Cards*
                </h5>
                <progress
                  class="progress is-medium is-info"
                  value="0"
                  max="415"
                >
                  0
                </progress>

                <h5 class="title is-size-6">
                  You own 0 (0%) of 508 Foiled Cards*
                </h5>
                <progress
                  class="progress is-medium is-warning"
                  value="0"
                  max="508"
                >
                  0
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
  }

}
</script>

