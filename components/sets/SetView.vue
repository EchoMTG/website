<template>
  <div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <a href="/sets/" title="magic the gathering sets and expansions">
            <span class="fa fa-tasks has-text-grey-light"></span>&nbsp;
            <span>Sets</span>
          </a>
        </li>

        <li class="is-active">
          <a href="/set/SNC/streets-of-new-capenna/" aria-current="page">
            <h1>
              <i class="ss ss-snc ss-echo has-text-grey"></i>&nbsp;
              <span itemprop="name">Streets of New Capenna</span>

              <span class="is-hidden-touch has-text-light-grey"
                >(SNC released on <span itemprop="date">2022-04-29)</span></span
              >
            </h1>
          </a>
        </li>
      </ul>
    </nav>

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

    <SetItemList
      v-if="this.tab == 'list'"
      :items="this.set.items"
      :cardsOwned="this.owned"
      />

    <sealed-product v-if="this.tab == 'sealed'" inline-template>
      <div class="container padded">
        <h1 class="title is-4">Sealed product for Streets of New Capenna</h1>

        <div class="columns is-multiline">
          <div
            class="column is-one-quarter-desktop is-one-thirds-tablet is-two-quarters-mobile"
          >
            <div class="card">
              <div class="card-header has-background-black">
                <p class="card-header-title title is-size-5 has-text-centered">
                  Collector Booster Display Case
                </p>
              </div>
              <footer class="card-footer has-background-black">
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Collector+Booster+Display+Case&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >Market</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Collector+Booster+Display+Case&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >Lowest</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Collector+Booster+Display+Case&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >Average</a
                >
              </footer>
              <footer class="card-footer">
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Collector+Booster+Display+Case&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >$1088.39</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Collector+Booster+Display+Case&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >$1069.99</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Collector+Booster+Display+Case&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >$1213.04</a
                >
              </footer>
              <div class="card-image">
                <figure class="image is-4by3">
                  <img
                    src="https://assets.echomtg.com/magic/cards/cropped/136007.hq.jpg"
                    alt="Streets of New Capenna - Collector Booster Display Case"
                  />
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img
                        src="https://assets.echomtg.com/magic/cards/cropped/136007.hq.jpg"
                        alt="Streets of New Capenna - Collector Booster Display Case"
                      />
                    </figure>
                  </div>
                  <div class="media-content">
                    <h2 class="title is-4">
                      Streets of New Capenna - Collector Booster Display Case
                    </h2>
                    <p class="subtitle is-6">$1088.39</p>
                  </div>
                </div>
                <div class="content">
                  Each sealed case contains 6
                  <em>Streets of New Capenna</em> Collector Booster Displays.
                  <br />
                  <br />Magic: The Gathering
                  <em>Streets of New Capenna</em> Collector Booster Box | 12
                  Packs + 1 Box Topper (181 Magic Cards) <br /><br /><strong
                    >KEY PRODUCT FEATURES</strong
                  >
                  <br />• 12 Streets of New Capenna MTG Collector Boosters + 1
                  foil box topper card <br />• 15 Magic cards + 1 foil token in
                  each booster <br />• Collector Booster-exclusive special
                  treatments <br />• 5 cards of rarity Rare or higher in every
                  pack <br />• 10 foil cards in every pack <br />• Join one of
                  five powerful families and build your criminal empire
                  <br /><br />
                  <strong>DESCRIPTION</strong>
                  The <em>Streets of New Capenna</em> Collector Booster Box
                  contains 12 <em>Streets of New Capenna</em> Collector Boosters
                  and 1 traditional foil box topper card. Collector Boosters
                  give you direct access to the coolest cards from a set—with
                  packs full of rares, foils, and special treatments.
                  <br /><br />
                  Each booster contains 15 Magic: The Gathering cards and 1
                  traditional foil double-sided token, with a combination of 5
                  cards of rarity Rare or higher and 2–5 Uncommon, 4–7 Common,
                  and 1 Land cards. Every pack contains a total of 10 foil
                  cards. Traditional foil Borderless Mythic Planeswalker in <1%
                  of boosters.
                </div>
              </div>
            </div>
          </div>
          <div
            class="column is-one-quarter-desktop is-one-thirds-tablet is-two-quarters-mobile"
          >
            <div class="card">
              <div class="card-header has-background-black">
                <p class="card-header-title title is-size-5 has-text-centered">
                  Set Booster Display Case
                </p>
              </div>
              <footer class="card-footer has-background-black">
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Set+Booster+Display+Case&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >Market</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Set+Booster+Display+Case&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >Lowest</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Set+Booster+Display+Case&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >Average</a
                >
              </footer>
              <footer class="card-footer">
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Set+Booster+Display+Case&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >$660.38</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Set+Booster+Display+Case&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >$633.47</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Set+Booster+Display+Case&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >$646.18</a
                >
              </footer>
              <div class="card-image">
                <figure class="image is-4by3">
                  <img
                    src="https://assets.echomtg.com/magic/cards/cropped/136002.hq.jpg"
                    alt="Streets of New Capenna - Set Booster Display Case"
                  />
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img
                        src="https://assets.echomtg.com/magic/cards/cropped/136002.hq.jpg"
                        alt="Streets of New Capenna - Set Booster Display Case"
                      />
                    </figure>
                  </div>
                  <div class="media-content">
                    <h2 class="title is-4">
                      Streets of New Capenna - Set Booster Display Case
                    </h2>
                    <p class="subtitle is-6">$660.38</p>
                  </div>
                </div>
                <div class="content">
                  Each sealed case contains 6
                  <em>Streets of New Capenna</em> Set Booster Displays.
                  <br />
                  <br />Magic: The Gathering Streets of New Capenna Set Booster
                  Box | 30 Packs + 1 Box Topper <br /><br />
                  <strong>KEY PRODUCT FEATURES</strong>
                  <br />• 30 <em>Streets of New Capenna</em> Set Boosters + 1
                  foil box topper card <br />• 12 Magic: The Gathering cards per
                  Set Booster—the best MTG booster to open just for fun <br />•
                  1–4 cards of rarity Rare or higher in every pack <br />•
                  Guaranteed Foil and Art Card in every pack <br />• Join one of
                  five powerful families and build your criminal empire
                  <br /><br />
                  <strong>DESCRIPTION</strong>
                  <br />The <em>Streets of New Capenna</em> Set Booster Box
                  contains 30 <em>Streets of New Capenna</em> Set Boosters and 1
                  traditional foil box topper card. Each Set Booster contains 12
                  Magic cards, 1 Art Card, and 1 token, ad card, counter
                  punchout card, or special card from Magic's history (a card
                  from "The List"). Each pack contains a combination of 1–4
                  card(s) of rarity Rare or higher and 3–7 Uncommon, 3–7 Common,
                  and 1 Land cards. One non–Art Card and non–Land card of any
                  rarity is foil. The Land card is foil in 21% of packs, and a
                  foil-stamped Signature Art Card replaces the Art Card in 5% of
                  Set Boosters. A card from The List replaces the token or ad
                  card in 25% of Set Boosters.
                </div>
              </div>
            </div>
          </div>
          <div
            class="column is-one-quarter-desktop is-one-thirds-tablet is-two-quarters-mobile"
          >
            <div class="card">
              <div class="card-header has-background-black">
                <p class="card-header-title title is-size-5 has-text-centered">
                  Draft Booster Box Case
                </p>
              </div>
              <footer class="card-footer has-background-black">
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Draft+Booster+Box+Case&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >Market</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Draft+Booster+Box+Case&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >Lowest</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Draft+Booster+Box+Case&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >Average</a
                >
              </footer>
              <footer class="card-footer">
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Draft+Booster+Box+Case&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >$568.99</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Draft+Booster+Box+Case&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >$548.88</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Draft+Booster+Box+Case&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >$572.86</a
                >
              </footer>
              <div class="card-image">
                <figure class="image is-4by3">
                  <img
                    src="https://assets.echomtg.com/magic/cards/cropped/136001.hq.jpg"
                    alt="Streets of New Capenna - Draft Booster Box Case"
                  />
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img
                        src="https://assets.echomtg.com/magic/cards/cropped/136001.hq.jpg"
                        alt="Streets of New Capenna - Draft Booster Box Case"
                      />
                    </figure>
                  </div>
                  <div class="media-content">
                    <h2 class="title is-4">
                      Streets of New Capenna - Draft Booster Box Case
                    </h2>
                    <p class="subtitle is-6">$568.99</p>
                  </div>
                </div>
                <div class="content">
                  Each sealed booster box case contains 6
                  <em>Streets of New Capenna</em> Draft Booster Boxes.
                  <br />
                  <br />Magic: The Gathering
                  <em>Streets of New Capenna</em> Draft Booster Box | 36 Packs +
                  1 Box Topper (541 Magic Cards)
                  <br />
                  <br /><strong>KEY PRODUCT FEATURES</strong> <br />• 36
                  <em>Streets of New Capenna</em> MTG Draft Boosters + 1 foil
                  box topper card <br />• The best SNC packs for booster draft
                  play—just draft, add lands, and play <br />• 15 Magic cards
                  per Draft Booster <br />• 1 Rare or Mythic Rare card in every
                  pack <br />• Join one of five powerful families and build your
                  criminal empire
                  <br />
                  <br /><strong>DESCRIPTION</strong> <br />The
                  <em>Streets of New Capenna</em> Draft Booster Box contains 36
                  <em>Streets of New Capenna</em> Draft Boosters and 1
                  traditional foil box topper card. Draft Boosters are
                  specifically designed for the best Magic: The Gathering
                  booster draft play experience. Each pack contains 15 Magic
                  cards and 1 token, ad card, or counter punchout card, with a
                  combination of 1 card of rarity Rare or higher and 3 Uncommon,
                  10 Common, and 1 Land cards. A traditional foil card of any
                  rarity replaces a Common in 33% of Streets of New Capenna
                  Draft Boosters. Traditional foil Borderless Mythic
                  Planeswalker in &gt; 1% of boosters.
                </div>
              </div>
            </div>
          </div>
          <div
            class="column is-one-quarter-desktop is-one-thirds-tablet is-two-quarters-mobile"
          >
            <div class="card">
              <div class="card-header has-background-black">
                <p class="card-header-title title is-size-5 has-text-centered">
                  Bundle Case
                </p>
              </div>
              <footer class="card-footer has-background-black">
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Bundle+Case&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >Market</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Bundle+Case&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >Lowest</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Bundle+Case&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >Average</a
                >
              </footer>
              <footer class="card-footer">
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Bundle+Case&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >$224.6</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Bundle+Case&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >$211.14</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Bundle+Case&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >$219.82</a
                >
              </footer>
              <div class="card-image">
                <figure class="image is-4by3">
                  <img
                    src="https://assets.echomtg.com/magic/cards/cropped/136009.hq.jpg"
                    alt="Streets of New Capenna - Bundle Case"
                  />
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img
                        src="https://assets.echomtg.com/magic/cards/cropped/136009.hq.jpg"
                        alt="Streets of New Capenna - Bundle Case"
                      />
                    </figure>
                  </div>
                  <div class="media-content">
                    <h2 class="title is-4">
                      Streets of New Capenna - Bundle Case
                    </h2>
                    <p class="subtitle is-6">$224.6</p>
                  </div>
                </div>
                <div class="content">
                  Each unopened case contains 6
                  <em>Streets of New Capenna</em> - Bundles.
                  <br />
                  <br />Magic: The Gathering Streets of New Capenna Bundle | 8
                  Set Boosters + Accessories <br /><strong
                    >KEY PRODUCT FEATURES</strong
                  >
                  <br />• 8 Streets of New Capenna MTG Set Boosters <br />• 1
                  foil alt-art promo card <br />• 40 basic land cards (20 foil +
                  20 nonfoil) <br />• Spindown life counter + card storage box
                  <br />• Join one of five powerful families and build your
                  criminal empire <br /><br />
                  <strong>DESCRIPTION</strong>
                  <br />The <em>Streets of New Capenna</em> Bundle contains 8
                  <em>Streets of New Capenna</em> Set Boosters—the best boosters
                  to open just for fun—plus exclusive accessories, with 40 basic
                  lands (20 traditional foils and 20 nonfoils), 1 traditional
                  foil promo card with Bundle-exclusive alternate art, 1
                  oversized Spindown life counter, 1 card storage box, and 2
                  reference cards. <br /><br />
                  Each Set Booster contains 12 Magic cards, 1 Art Card, and 1
                  token, ad card, counter punchout card, or special card from
                  Magic's history (a card from "The List"). In every pack you’ll
                  find a combination of 1–4 card(s) of rarity Rare or higher and
                  3–7 Uncommon, 3–7 Common, and 1 Land cards, including a
                  guaranteed foil card.
                </div>
              </div>
            </div>
          </div>
          <div
            class="column is-one-quarter-desktop is-one-thirds-tablet is-two-quarters-mobile"
          >
            <div class="card">
              <div class="card-header has-background-black">
                <p class="card-header-title title is-size-5 has-text-centered">
                  Commander Deck Display
                </p>
              </div>
              <footer class="card-footer has-background-black">
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Commander+Deck+Display&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >Market</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Commander+Deck+Display&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >Lowest</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Commander+Deck+Display&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >Average</a
                >
              </footer>
              <footer class="card-footer">
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Commander+Deck+Display&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >$172.72</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Commander+Deck+Display&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >$172.09</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Commander+Deck+Display&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >$199.97</a
                >
              </footer>
              <div class="card-image">
                <figure class="image is-4by3">
                  <img
                    src="https://assets.echomtg.com/magic/cards/cropped/136010.hq.jpg"
                    alt="Streets of New Capenna - Commander Deck Display"
                  />
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img
                        src="https://assets.echomtg.com/magic/cards/cropped/136010.hq.jpg"
                        alt="Streets of New Capenna - Commander Deck Display"
                      />
                    </figure>
                  </div>
                  <div class="media-content">
                    <h2 class="title is-4">
                      Streets of New Capenna - Commander Deck Display
                    </h2>
                    <p class="subtitle is-6">$172.72</p>
                  </div>
                </div>
                <div class="content">
                  Each display contains 5 of the
                  <em>Streets of New Capenna</em> Commander Decks.
                </div>
              </div>
            </div>
          </div>
          <div
            class="column is-one-quarter-desktop is-one-thirds-tablet is-two-quarters-mobile"
          >
            <div class="card">
              <div class="card-header has-background-black">
                <p class="card-header-title title is-size-5 has-text-centered">
                  Collector Booster Display
                </p>
              </div>
              <footer class="card-footer has-background-black">
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Collector+Booster+Display&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >Market</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Collector+Booster+Display&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >Lowest</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Collector+Booster+Display&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >Average</a
                >
              </footer>
              <footer class="card-footer">
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Collector+Booster+Display&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >$162.58</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Collector+Booster+Display&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >$160.32</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Collector+Booster+Display&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >$218.34</a
                >
              </footer>
              <div class="card-image">
                <figure class="image is-4by3">
                  <img
                    src="https://assets.echomtg.com/magic/cards/cropped/136006.hq.jpg"
                    alt="Streets of New Capenna - Collector Booster Display"
                  />
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img
                        src="https://assets.echomtg.com/magic/cards/cropped/136006.hq.jpg"
                        alt="Streets of New Capenna - Collector Booster Display"
                      />
                    </figure>
                  </div>
                  <div class="media-content">
                    <h2 class="title is-4">
                      Streets of New Capenna - Collector Booster Display
                    </h2>
                    <p class="subtitle is-6">$162.58</p>
                  </div>
                </div>
                <div class="content">
                  Magic: The Gathering <em>Streets of New Capenna</em> Collector
                  Booster Box | 12 Packs + 1 Box Topper (181 Magic Cards)
                  <br /><br /><strong>KEY PRODUCT FEATURES</strong> <br />• 12
                  Streets of New Capenna MTG Collector Boosters + 1 foil box
                  topper card <br />• 15 Magic cards + 1 foil token in each
                  booster <br />• Collector Booster-exclusive special treatments
                  <br />• 5 cards of rarity Rare or higher in every pack <br />•
                  10 foil cards in every pack <br />• Join one of five powerful
                  families and build your criminal empire <br /><br />
                  <strong>DESCRIPTION</strong>
                  The <em>Streets of New Capenna</em> Collector Booster Box
                  contains 12 <em>Streets of New Capenna</em> Collector Boosters
                  and 1 traditional foil box topper card. Collector Boosters
                  give you direct access to the coolest cards from a set—with
                  packs full of rares, foils, and special treatments.
                  <br /><br />
                  Each booster contains 15 Magic: The Gathering cards and 1
                  traditional foil double-sided token, with a combination of 5
                  cards of rarity Rare or higher and 2–5 Uncommon, 4–7 Common,
                  and 1 Land cards. Every pack contains a total of 10 foil
                  cards. Traditional foil Borderless Mythic Planeswalker in <1%
                  of boosters.
                </div>
              </div>
            </div>
          </div>
          <div
            class="column is-one-quarter-desktop is-one-thirds-tablet is-two-quarters-mobile"
          >
            <div class="card">
              <div class="card-header has-background-black">
                <p class="card-header-title title is-size-5 has-text-centered">
                  Set Booster Display
                </p>
              </div>
              <footer class="card-footer has-background-black">
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Set+Booster+Display&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >Market</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Set+Booster+Display&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >Lowest</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Set+Booster+Display&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >Average</a
                >
              </footer>
              <footer class="card-footer">
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Set+Booster+Display&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >$99.3</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Set+Booster+Display&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >$95</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Set+Booster+Display&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >$119.95</a
                >
              </footer>
              <div class="card-image">
                <figure class="image is-4by3">
                  <img
                    src="https://assets.echomtg.com/magic/cards/cropped/136003.hq.jpg"
                    alt="Streets of New Capenna - Set Booster Display"
                  />
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img
                        src="https://assets.echomtg.com/magic/cards/cropped/136003.hq.jpg"
                        alt="Streets of New Capenna - Set Booster Display"
                      />
                    </figure>
                  </div>
                  <div class="media-content">
                    <h2 class="title is-4">
                      Streets of New Capenna - Set Booster Display
                    </h2>
                    <p class="subtitle is-6">$99.3</p>
                  </div>
                </div>
                <div class="content">
                  Magic: The Gathering Streets of New Capenna Set Booster Box |
                  30 Packs + 1 Box Topper
                  <br /><br />
                  <strong>KEY PRODUCT FEATURES</strong>
                  <br />• 30 <em>Streets of New Capenna</em> Set Boosters + 1
                  foil box topper card <br />• 12 Magic: The Gathering cards per
                  Set Booster—the best MTG booster to open just for fun <br />•
                  1–4 cards of rarity Rare or higher in every pack <br />•
                  Guaranteed Foil and Art Card in every pack <br />• Join one of
                  five powerful families and build your criminal empire
                  <br /><br />
                  <strong>DESCRIPTION</strong>
                  <br />The <em>Streets of New Capenna</em> Set Booster Box
                  contains 30 <em>Streets of New Capenna</em> Set Boosters and 1
                  traditional foil box topper card. Each Set Booster contains 12
                  Magic cards, 1 Art Card, and 1 token, ad card, counter
                  punchout card, or special card from Magic's history (a card
                  from "The List"). Each pack contains a combination of 1–4
                  card(s) of rarity Rare or higher and 3–7 Uncommon, 3–7 Common,
                  and 1 Land cards. One non–Art Card and non–Land card of any
                  rarity is foil. The Land card is foil in 21% of packs, and a
                  foil-stamped Signature Art Card replaces the Art Card in 5% of
                  Set Boosters. A card from The List replaces the token or ad
                  card in 25% of Set Boosters.
                </div>
              </div>
            </div>
          </div>
          <div
            class="column is-one-quarter-desktop is-one-thirds-tablet is-two-quarters-mobile"
          >
            <div class="card">
              <div class="card-header has-background-black">
                <p class="card-header-title title is-size-5 has-text-centered">
                  Draft Booster Box
                </p>
              </div>
              <footer class="card-footer has-background-black">
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Draft+Booster+Box&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >Market</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Draft+Booster+Box&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >Lowest</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Draft+Booster+Box&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >Average</a
                >
              </footer>
              <footer class="card-footer">
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Draft+Booster+Box&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >$84.19</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Draft+Booster+Box&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >$78</a
                >
                <a
                  rel="nofollow"
                  href="https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Streets+of+New+Capenna+-+Draft+Booster+Box&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE"
                  class="card-footer-item"
                  >$104.4</a
                >
              </footer>
              <div class="card-image">
                <figure class="image is-4by3">
                  <img
                    src="https://assets.echomtg.com/magic/cards/cropped/136000.hq.jpg"
                    alt="Streets of New Capenna - Draft Booster Box"
                  />
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img
                        src="https://assets.echomtg.com/magic/cards/cropped/136000.hq.jpg"
                        alt="Streets of New Capenna - Draft Booster Box"
                      />
                    </figure>
                  </div>
                  <div class="media-content">
                    <h2 class="title is-4">
                      Streets of New Capenna - Draft Booster Box
                    </h2>
                    <p class="subtitle is-6">$84.19</p>
                  </div>
                </div>
                <div class="content">
                  Magic: The Gathering <em>Streets of New Capenna</em> Draft
                  Booster Box | 36 Packs + 1 Box Topper (541 Magic Cards)
                  <br />
                  <br /><strong>KEY PRODUCT FEATURES</strong> <br />• 36
                  <em>Streets of New Capenna</em> MTG Draft Boosters + 1 foil
                  box topper card <br />• The best SNC packs for booster draft
                  play—just draft, add lands, and play <br />• 15 Magic cards
                  per Draft Booster <br />• 1 Rare or Mythic Rare card in every
                  pack <br />• Join one of five powerful families and build your
                  criminal empire
                  <br />
                  <br /><strong>DESCRIPTION</strong> <br />The
                  <em>Streets of New Capenna</em> Draft Booster Box contains 36
                  <em>Streets of New Capenna</em> Draft Boosters and 1
                  traditional foil box topper card. Draft Boosters are
                  specifically designed for the best Magic: The Gathering
                  booster draft play experience. Each pack contains 15 Magic
                  cards and 1 token, ad card, or counter punchout card, with a
                  combination of 1 card of rarity Rare or higher and 3 Uncommon,
                  10 Common, and 1 Land cards. A traditional foil card of any
                  rarity replaces a Common in 33% of Streets of New Capenna
                  Draft Boosters. Traditional foil Borderless Mythic
                  Planeswalker in <1% of boosters.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </sealed-product>

    <SetTrendingView v-if="this.tab == 'trending'" :setName="this.set.name" :items="this.set.items" />
    <pull-odds
      v-if="this.tab == 'pull'"
      @add-full-set="addFullSet()"
      inline-template
    >
      <div class="container padded">
        <nav class="level is-mobile">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading is-size-7-mobile">Cards</p>
              <p class="title is-size-4-mobile">527</p>
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
    </pull-odds>
  </div>
</template>

<script>
import SetItemList from '@/components/sets/SetItemList';
import SetSummary from '@/components/sets/SetSummary';
import SetTrendingView from '@/components/sets/SetTrendingView';

export default {

    name: 'SetView',
    components: { SetItemList, SetSummary, SetTrendingView },
    props: {
      set: {
        type: Object,
        default: () => {}
      }
    },
    data: function data() {

        return {
            title: 'Set Name',
            tab: 'list',
            setCode: '',
            setData: {},
            cardsOwned: {},
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
                // createGrowl('Set Added');
                // reloadInventoryStats();
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

