<template>
  <div class="setSummary">
      <div class="imageBox">
          <img :src="topcardImage" class="setTopImage" alt="<?=$set->name?> top card image">
      </div>
      <div class="columns">
          <div class="column is-three-fifths">
              <i class="largeSetIcon ss ss-<?=strtolower($set->set_code)?> ss-echo is-size-3 has-text-black"></i>
              <h1>
                  <em class="has-text-white has-shadow has-text-weight-light is-size-6">Magic the Gathering MTG</em>
                  <br>
                  <a class="is-size-3" href="<?=$set->getURL()?>"><?=$set->name?> - <?=$set->set_code?></a>
              </h1>
              <h2 class="has-text-weight-normal has-text-light-grey is-size-7">MTG <?=$set->name?> was released on <?=$set->release_date?> with <?=$set->total_cards?> unique cards.</h2>
          </div>
          <div class="column">
              <!-- CTA -->
              <?php if(!isset($_SESSION['user']['password']) ) { ?>

              <div class="card">

                  <div class="card-content">
                      <div class="content">

                          <h5>Receive weekly updates on your collection.</h2>
                          <p>Free membership gives you access to collection tracking and user-only features.</p>

                          <a  href="/register/" class="button is-success" onclick=" ga('send', 'event', 'Register Button', 'click', 'Registration from Set View');">
                              <span class="icon">
                                  <i class="fa fa-user-plus"></i>
                              </span>
                              <span>Create a Free Account</span>
                          </a>
                      </div>
                  </div>
              </div>
              <?php } ?>

          </div>
      </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'SetSummary',
  props:['items', 'name'],
  data () {
    return {
      title: 'SUMMARY',
      topImage: 'https://assets.echomtg.com/magic/cards/cropped/316.hq.jpg'
    }

  },
  computed: {
      topcardImage: function(){
          if(this.items){
              return this.items[0].image_cropped
          }
          return this.topImage
      },
      ...mapState([
        'user',
        'isLayoutBoxed',
        'isLayoutAsideHidden',
        'isLayoutMobile'
    ])
  }
}
</script>
