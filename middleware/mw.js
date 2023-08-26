// import  es  from '../store/index.js'

export default function ({route,redirect}) {


    // console.log(route.path)
    let found = null;
    // example: alter/1225/volcanic-island/

    // app redirects
    if(route.path == '/inventory/') return redirect(`/apps/inventory/`);
    if(route.path == '/lists/') return redirect(`/apps/lists/`);
    if(route.path == '/inventory/watchlist/') return redirect(`/apps/watchlist/`);
    if(route.path == '/inventory/earnings/') return redirect(`/apps/earnings/`);
    if(route.path == '/inventory/sealed/') return redirect(`/apps/sealed/`);
    if(route.path == '/inventory/stats/') return redirect(`/apps/stats/`);
    if(route.path == '/inventory/import/') return redirect(`/apps/import/`);
    if(route.path == '/sets/') return redirect(`/mtg/sets/`);


    // blog


     // example: /blog/post/108/how-to-prepare-for-the-upcoming-renewal-on-mtga/
    // target: /blog/108/how-to-prepare-for-the-upcoming-renewal-on-mtga/
    const blogRegex = new RegExp("^/blog/post/([a-z0-9]+)/?", "ig"); // global insensitive
    found = blogRegex.exec(route.path)
    if(found !== null && found.length > 1){
      return redirect(`/blog/${found[1]}`)
    }

    // regex for tradelist
    // example: /tradelist/063c60f990e89705d97cecffc3a31832/
    // target: /apps/tradelist/063c60f990e89705d97cecffc3a31832
    const tradelistRegex = new RegExp("^/tradelist/([a-z0-9]+)/?", "ig"); // global insensitive
    found = tradelistRegex.exec(route.path)
    if(found !== null && found.length > 1){
      return redirect(`/apps/trades/${found[1]}`)
    }

    // alters database
    const altersRegex = new RegExp("^/mtg-alters/", "ig"); // global insensitive
    found = altersRegex.exec(route.path)
    if(found !== null && found.length > 0){
      return redirect(`/mtg/alters/`);
    }

    // regex for magic variations from legacy echomtg.com website
    // example : /magic-card/birds-of-paradise/
    // target : /mtg/birds-of-paradise
    const allListingsRegex = new RegExp("^/magic-card/(.+)", "ig"); // global insensitive
    found = allListingsRegex.exec(route.path)
    if(found !== null && found.length > 1){
      return redirect(`/mtg/${found[1]}`)
    }

    // regex for magic cards from legacy echomtg.com website
    // example: /card/142633/portal-to-phyrexia/
    // notes: need to extract set_code by making request to api using card ID
    // target: /mtg/sets/[set_code]/[card_name]/[id]
    const itemRegex = new RegExp("^/card/([0-9]+)/([a-z0-9-]+)/?", "ig"); // global insensitive
    found = itemRegex.exec(route.path)
    if(found !== null && found.length > 1){
      return redirect(`/mtg/items/${found[2]}/${found[1]}`)
    }

    // regex for magic sets from legacy echomtg.com website
    // example: /set/bro/the-brothers-war/
    // target: /mtg/sets/bro/the-brothers-war
    const setsRegex = new RegExp("^/set/([a-z0-9A-z]+)/([a-z0-9-]+)/?", "ig"); // global insensitive
    found = setsRegex.exec(route.path)
    if(found !== null && found.length > 1){
      return redirect(`/mtg/sets/${found[1].toLowerCase()}/${found[2].toLowerCase()}`);
    }

    // trailing slash to be forces
    if(route.path.at(-1) !== '/'){
      //   console.log('regex setRegex result',found)
      //   console.log('regex result 0 ',found[0] ? found[0] : 'n/a')
        return redirect(`${route.path}/`);
    }

    // normal return
    return true;
}
