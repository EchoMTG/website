// import  es  from '../store/index.js'

export default function ({req,route,redirect}) {


    // console.log(req?.originalUrl ? req?.originalUrl : 'no original url')
    // console.log(req?.baseUrl ? req?.baseUrl : 'no original url')
    console.log('route',route.path)
    // card variation pages
    // /magic-card/skeletal-snake/


    // regex for magic variations from legacy echomtg.com website
    // example : /magic-card/birds-of-paradise/
    // target : /mtg/birds-of-paradise
    const allListingsRegex = new RegExp("/magic-card/(.+)", "ig"); // global insensitive
    let found = allListingsRegex.exec(route.path)

    if(found !== null && found.length > 1){
      console.log('regex alllisting result',found)
      console.log('regex result 0 ',found[0] ? found[0] : 'n/a')
      console.log('regex result 1',found[1] ? found[1] : 'n/a')
      return redirect(`/mtg/${found[1]}`)
    }

    // regex for magic cards from legacy echomtg.com website
    // example: /card/142633/portal-to-phyrexia/
    // notes: need to extract set_code by making request to api using card ID
    // target: /mtg/sets/[set_code]/[card_name]/[id]
    const itemRegex = new RegExp("/card/([0-9]+)/([a-z0-9-]+)/?", "ig"); // global insensitive
    found = itemRegex.exec(route.path)
    if(found !== null && found.length > 1){
      console.log('regex itemRegex result',found)
      console.log('regex result 0 ',found[0] ? found[0] : 'n/a')
      console.log('regex result 1',found[1] ? found[1] : 'n/a')
      return redirect(`/mtg/mtg/${found[2]}/${found[2]}`)
    }

    // regex for magic sets from legacy echomtg.com website
    // example: /set/bro/the-brothers-war/
    // target: /mtg/sets/bro/the-brothers-war
    const setsRegex = new RegExp("/set/([a-z0-9A-z]+)/([a-z0-9-]+)/?", "ig"); // global insensitive
    found = setsRegex.exec(route.path)
    if(found !== null && found.length > 1){
      console.log('regex setsRegex result',found)
      console.log('regex result 0 ',found[0] ? found[0] : 'n/a')
      console.log('regex result 1',found[1] ? found[1] : 'n/a')
      return redirect(`/mtg/${found[1]}/${found[2]}`);
    }

    // regex for magic set page
    // example: /sets/
    // target: /mtgs/sets
    const setRegex = new RegExp("/sets/", "ig"); // global insensitive
    found = setRegex.exec(route.path)
    if(found !== null && found.length > 0){
      console.log('regex setRegex result',found)
      console.log('regex result 0 ',found[0] ? found[0] : 'n/a')
      return redirect(`/mtg/sets`);
    }

    // normal return
    return
}
