// import  es  from '../store/index.js'

export default function ({route,redirect}) {


    console.log(route.path)
    let found = null;
    // example: alter/1225/volcanic-island/

    // alters database
    const altersRegex = new RegExp("/mtg-alters/", "ig"); // global insensitive
    found = altersRegex.exec(route.path)
    if(found !== null && found.length > 0){
      return redirect(`/mtg/alters/`);
    }

    // regex for magic variations from legacy echomtg.com website
    // example : /magic-card/birds-of-paradise/
    // target : /mtg/birds-of-paradise
    const allListingsRegex = new RegExp("/magic-card/(.+)", "ig"); // global insensitive
    found = allListingsRegex.exec(route.path)
    if(found !== null && found.length > 1){
      return redirect(`/mtg/${found[1]}`)
    }

    // regex for magic cards from legacy echomtg.com website
    // example: /card/142633/portal-to-phyrexia/
    // notes: need to extract set_code by making request to api using card ID
    // target: /mtg/sets/[set_code]/[card_name]/[id]
    const itemRegex = new RegExp("/card/([0-9]+)/([a-z0-9-]+)/?", "ig"); // global insensitive
    found = itemRegex.exec(route.path)
    if(found !== null && found.length > 1){
      return redirect(`/mtg/set_code/${found[2]}/${found[1]}`)
    }

    // regex for magic sets from legacy echomtg.com website
    // example: /set/bro/the-brothers-war/
    // target: /mtg/sets/bro/the-brothers-war
    const setsRegex = new RegExp("/set/([a-z0-9A-z]+)/([a-z0-9-]+)/?", "ig"); // global insensitive
    found = setsRegex.exec(route.path)
    if(found !== null && found.length > 1){
      return redirect(`/mtg/${found[1].toLowerCase()}/${found[2].toLowerCase()}`);
    }

    // regex for magic set page
    // example: /sets/
    // target: /mtgs/sets
    const setRegex = new RegExp("/sets/", "ig"); // global insensitive
    found = setRegex.exec(route.path)
    if(found !== null && found.length > 0){
      return redirect(`/mtg/sets/`);
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
