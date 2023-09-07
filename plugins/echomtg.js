export default (context, inject) => {
  const echomtg = {}

  echomtg.getUserHeaders = () => {
    return {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
    }
  }

  echomtg.getUserHeadersNoJSON = () => {
    return {
      'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
    }
  }

  echomtg.getS2SHeaders = () => {
    return {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + context.app.$config.S2S_KEY
    }
  }

  echomtg.getS2SHeadersNoJSON = () => {
    let bearer = context.app.$cookies.get('token') ? context.app.$cookies.get('token') : context.app.$config.S2S_KEY
    return {
      'Authorization' : 'Bearer ' + bearer
    }
  }


  echomtg.getS2SGetHeaders = () => {
    return {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + context.app.$config.S2S_KEY
    }
  }

  echomtg.log = (...params) => {
    if(/(dev)|(localhost)|(nuxt)/i.test(context.app.$config.API_DOMAIN)){
      console.log(...params);
    }
  }

  echomtg.isLoggedIn = () => {
    return undefined !== context.app.$cookies.get('token');
  }

  echomtg.setIconClass = (set_code) => {
    let sc = set_code.toLowerCase();
    return `ss ss-${sc} ss-echo`
  }

  echomtg.getAPIURL = () => {
    return context.app.$config.API_DOMAIN;
  }

  echomtg.getToken = () => {
    return context.app.$cookies.get('token');
  }



  echomtg.createGrowl = (message,icon,color="grey") => {
    //alert(message + icon + color)
    if(context.app.$buefy){
      context.app.$buefy.snackbar.open({
        message: message,
        queue: false
      })
    }
  }

  echomtg.getItem = async (emid) => {
    let endpoint = `${context.app.$config.API_DOMAIN}data/item/?emid=${emid}`;

    // pricing
    const res = await fetch(endpoint, {
      headers: {
          'Authorization' : 'Bearer ' + context.app.$config.S2S_KEY
          }
      })
      return await res.json();

  }

  echomtg.getTypes = async () => {
    let endpoint = `${context.app.$config.API_DOMAIN}magic/types/`;

    const res = await fetch(endpoint, {
      headers: echomtg.getS2SGetHeaders()
    })
    return await res.json();

  }

  echomtg.getGroup = async (name,limit=150,type=false,unique=false) => {
    let params = [
      `limit=${limit}`,
      `name=${name}`
    ]

    if(type){
      params.push(`type=${type}`)
    }
    if(unique){
      params.push(`unique=true`)
    }

    let endpoint = `${context.app.$config.API_DOMAIN}magic/groups/?${params.join('&')}`;
    const res = await fetch(endpoint, {
      headers:  echomtg.getUserHeaders()
    })
    return await res.json();

  }

echomtg.search = async (query,expansion = '',types = '',oracle = '',limit = 50) => {
  let endpoint = `${context.app.$config.API_DOMAIN}search/mass/?search=${query}&wcExpansion=${expansion}`;
  endpoint += `&limit=${limit}&textsearch=${oracle}&type=${types}`;
  // pricing
  const res = await fetch(endpoint, {
  headers: {
      'Authorization' : 'Bearer ' + context.app.$config.S2S_KEY,
      },
  });
  if (res.status !== 200){
    return [];
  }
  const data = await res.json();
  if (data.data === undefined){
    return [];
  }
  return data.data;
};

  echomtg.getSets = async (game=1) => {
    let res = await fetch(`${context.app.$config.API_DOMAIN}data/sets/?game=${game}`, {
      headers: echomtg.getS2SHeadersNoJSON()
    })
    let data = await res.json();

    return data.data;
  }

  echomtg.getSet = async (set_code,game=1) => {
    // fetch the set
    let endpoint = `${context.app.$config.API_DOMAIN}data/set/?set_code=${set_code}&minified=true&game=${game}`;

    // try to get the json
     try {
      const res = await fetch(
        endpoint, {
        headers: echomtg.getS2SHeadersNoJSON()
        }
      );
      return await res.json();

    } catch(err){
      echomtg.log(err)
    }
  }

  echomtg.getSealed = async (set_code,game=1) => {
    let url = `${context.app.$config.API_DOMAIN}sets/sealed/?set_code=${set_code}&game=${game}`;

    let res = await fetch(url, {
      headers: {
        'Authorization' : 'Bearer ' + context.app.$config.S2S_KEY
      }
    })
    let data = await res.json();
    echomtg.log('getting sealed from echo api', data.data)
    return data.data;
  }

  echomtg.getWatchlist = async (start=0,limit=100) => {
    let url = `${context.app.$config.API_DOMAIN}watchlist/view/?start=${start}&limit=${limit}`;

    let res = await fetch(url, {
      headers: {
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      }
    })
    return await res.json();
  }

  echomtg.deleteFromWatchlist = async (watchlist_id) => {
    let url = `${context.app.$config.API_DOMAIN}watchlist/remove/`;
    let body = {
      id: watchlist_id,
    }
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      },
      body: JSON.stringify(body)
    });
    return await res.json();
  }
  echomtg.updateWatchlist = async (watchlist_id, threshold) => {
    let url = `${context.app.$config.API_DOMAIN}watchlist/update/`;
    let body = {
      id: watchlist_id,
      threshold: threshold
    }
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      },
      body: JSON.stringify(body)
    });
    return await res.json();
  }

  echomtg.findInList = async (emid) => {
    let url = `${context.app.$config.API_DOMAIN}lists/find_in_list/?emid=${emid}`;

    const res = await fetch(url, {
      headers: {
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      }
    });
    let data = await res.json();

    return data;
  }

  echomtg.addToList = async (emid,list_id,foil=0) => {
    let url = `${context.app.$config.API_DOMAIN}lists/add/`;
    let body = {
      emid: emid,
      list: list_id,
      quantity: 1,
      foil: foil,
      sb: 0
    }
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      },
      body: JSON.stringify(body)
    });
    let data = await res.json();
    return data;
  }

  echomtg.removeFromList = async (list_item_id,list_id) => {
    let url = `${context.app.$config.API_DOMAIN}lists/remove/`;
    let body = {
      id: list_item_id,
      list: list_id
    }
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      },
      body: JSON.stringify(body)
    });
    return await res.json();

  }

  echomtg.getAllLists = async () => {
    let url = `${context.app.$config.API_DOMAIN}lists/all/`;

    const res = await fetch(url, {
      headers: {
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      }
    });
    let data = await res.json();

    if(data.status == 'error') return data;
    //if(Object.keys(data.lists).length == 0) return data;

    let lists = [];
    let listkeys = Object.keys(data.lists);

    for(let i = 0; i < listkeys.length; i++){
      lists.push(data.lists[listkeys[i]])
    }
    data.lists = lists;
    return data;
  }

  echomtg.inventoryUpdate = async (id,options={}) => {
    let endpoint = `${context.app.$config.API_DOMAIN}inventory/update/`;

    const body = {
      "id": id,
      ...options
    }

    echomtg.log(endpoint, 'updating inventory', body);

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      },
      body: JSON.stringify(body)
    })

    return await res.json();
  }

  echomtg.inventoryAdd = async (emid,options={}) => {
    let endpoint = `${context.app.$config.API_DOMAIN}inventory/add/`;
    let body = {
      "emid": emid,
      "language": options?.language ? options.language : "EN",
      "condition": options?.condition ? options.condition : "NM",
      "foil": options?.foil ? options.foil : 0,
      "quantity" : options?.quantity ? options.quantity : 1
    }
    if(options?.acquired_price) {
      body.acquired_price = options.acquired_price
    }
    if(options?.acquired_date) {
      body.acquired_date = options.acquired_date
    }

    echomtg.log(endpoint, 'adding inventory', body);

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      },
      body: JSON.stringify(body)
    })

    return await res.json();
  }

  echomtg.inventoryQuickAdd = async (emid,foil=0) => {

    let url = `${context.app.$config.API_DOMAIN}inventory/add/?emid=${emid}&foil=${foil}`;
    echomtg.log(url, 'adding inventory', context.app.$cookies.get('token'));
    const res = await fetch(url, {
      headers: {
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      }
    });
    return await res.json();
  }

  // USER

  echomtg.registerUser = async (email, username, password) => {
    let url = `${context.app.$config.API_DOMAIN}user/register/`;
    const payload = {
      'email' : email,
      'username' : username,
      'password' : password
    }
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return await res.json();
  }

  echomtg.updateUser = async (payload) => {

    let url = `${context.app.$config.API_DOMAIN}user/update/`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      },
      body: JSON.stringify(payload)
    });
    return await res.json();
  }

  echomtg.deleteUserCreditCard = async (card_id) => {
    let body = {
      card_id: card_id
    }
    let url = `${context.app.$config.API_DOMAIN}billing/remove_card/`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      },
      body: JSON.stringify(body)
    });
    return await res.json();
  }

  echomtg.switchUserPlan = async (plan) => {
    let body = {
      plan: plan,
    }

    let url = `${context.app.$config.API_DOMAIN}billing/switch_plan/`;

    const res = await fetch(url, {
      method: 'POST',
      headers: echomtg.getUserHeaders(),
      body: JSON.stringify(body)
    });
    return await res.json();
  }

  echomtg.addUserCreditCard = async (number,month,year,cvc, plan = false) => {
    let body = {
      card_number: number,
      exp_month: month,
      exp_year: year,
      cvc: cvc
    }
    if(plan && plan !== ''){
      body['plan'] = plan;
    }
    let url = `${context.app.$config.API_DOMAIN}billing/add_card/`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      },
      body: JSON.stringify(body)
    });
    return await res.json();
  }

  echomtg.getUserCreditCard = async () => {
    let url = `${context.app.$config.API_DOMAIN}billing/get_cards/`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      }
    });
    return await res.json();
  }

  echomtg.getUserPaymentHistory = async () => {
    let url = `${context.app.$config.API_DOMAIN}billing/payments/`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      }
    });
    return await res.json();
  }

  echomtg.getUserBillingCustomer = async () => {
    let url = `${context.app.$config.API_DOMAIN}billing/customer/`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      }
    });
    return await res.json();
  }

  echomtg.getUserBillingSubscriptions = async () => {
    let url = `${context.app.$config.API_DOMAIN}billing/subscriptions/`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      }
    });
    return await res.json();
  }

  echomtg.getUserMeta = async () => {

    let url = `${context.app.$config.API_DOMAIN}user/meta/`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      }
    });
    return await res.json();
  }

  echomtg.updateUserBillingDefaultCard = async (card_id) => {
    let body = {};
    body['card_id'] = card_id;

    let url = `${context.app.$config.API_DOMAIN}billing/set_default_card/`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      },
      body: JSON.stringify(body)
    });
    return await res.json();
  }

  echomtg.getUserSubscriptions = async () => {

    let url = `${context.app.$config.API_DOMAIN}user/subscriptions/`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      }
    });
    return await res.json();
  }


  echomtg.updateUserSubscriptions = async (body) => {

    let url = `${context.app.$config.API_DOMAIN}user/subscriptions/`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      },
      body: JSON.stringify(body)
    });
    return await res.json();
  }


  echomtg.clearUserInventory = async () => {

    let url = `${context.app.$config.API_DOMAIN}user/clear/`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      }
    });
    return await res.json();
  };

  echomtg.deleteUser = async () => {

    let url = `${context.app.$config.API_DOMAIN}user/delete/`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      }
    });
    return await res.json();
  };

  echomtg.logout = async () => {
    let url = `${context.app.$config.API_DOMAIN}user/logout/`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      }
    });
    return await res.json();
  }


  echomtg.inventoryDeleteItem = async (inventory_id) => {

    let url = `${context.app.$config.API_DOMAIN}inventory/remove/`;
    let body = {
      id: inventory_id
    }
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      },
      body: JSON.stringify(body)
    });
    return await res.json();
  }

  echomtg.inventoryToggleTradable = async (inventory_id, tradable) => {

    let url = `${context.app.$config.API_DOMAIN}inventory/toggle_tradable/`;
    let body = {
      id: inventory_id,
      tradable: tradable ? 1 : 0
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      },
      body: JSON.stringify(body)
    });
    return await res.json();
  }

  echomtg.inventoryQuickStats = async () => {
    let url = `${context.app.$config.API_DOMAIN}inventory/quickstats/`;

    const res = await fetch(url, {
      headers: {
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      }
    });

    return await res.json();

  }

  echomtg.inventoryStats = async () => {
    let url = `${context.app.$config.API_DOMAIN}inventory/stats/`;

    const res = await fetch(url, {
      headers: {
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      }
    });

    return await res.json();

  }

  echomtg.inventoryView = async (
    start=0,
    limit=200,
    direction='DESC',
    sort='date_acquired',
    search='',
    set_code='',
    color='',
    rarity='',
    tradable=false,
    reserve_list=false,
    cmc=false,
    priceOver=false,
    priceUnder=false,
    foil='') => {

    const params = [
      `start=${start}`,
      `limit=${limit}`,
      `direction=${direction}`,
      `sort=${sort}`,
      `search=${search}`,
      `set_code=${set_code}`,
      `color=${color}`,
      `rarity=${rarity}`,
      tradable && tradable != '' ? `tradable=${tradable}` : null,
      reserve_list ? `reserve_list=${reserve_list}` : null,
      cmc ? `cmc=${cmc}` : null,
      priceUnder ? `price_under=${priceUnder}` : null,
      priceOver ? `price_over=${priceOver}` : null,
      foil != '' ? `foils=${foil}` : null
    ].join('&')

    let url = `${context.app.$config.API_DOMAIN}inventory/view/?${params}`;

    const res = await fetch(url, {
      headers: {
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      }
    });

    return await res.json();
  }

  echomtg.tradesPublicList = async (start=0,limit=100,search='') => {

    const params = [
      `start=${start}`,
      `limit=${limit}`,
      search == '' ? null : `search=${search}`
    ].join('&')

    let url = `${context.app.$config.API_DOMAIN}trades/public_list/?${params}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: echomtg.getUserHeadersNoJSON()
    });

    return await res.json();

  }

  echomtg.tradesPublicListBackend = async (start=0,limit=100,search=null) => {

    const params = [
      `start=${start}`,
      `limit=${limit}`,
      search == '' || search==null ? null : `search=${search}`
    ].join('&')

    let url = `${context.app.$config.API_DOMAIN}trades/public_list/?${params}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: echomtg.getS2SHeadersNoJSON()
    });

    return await res.json();

  }


  echomtg.tradesView = async (params) => {
    let url = `${context.app.$config.API_DOMAIN}trades/view/?${params}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: echomtg.getS2SHeaders()
    });
    return await res.json();
  }

  echomtg.tradesUserHash = (userid) => {
    return echomtg.md5( userid + 'em123')
  }


  echomtg.notesGet = async (note_id) => {

    let url = `${context.app.$config.API_DOMAIN}notes/note/?id=${note_id}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: echomtg.getUserHeadersNoJSON()
    });

    return await res.json();
  }

  echomtg.notesCreate = async (target_id, note, app = 'inventory' ) => {

    let url = `${context.app.$config.API_DOMAIN}notes/create/`;
    let body = {
      target_id: target_id,
      note: note,
      target_app: app
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: echomtg.getUserHeaders(),
      body: JSON.stringify(body)
    });

    return await res.json();
  }

  echomtg.notesUpdate = async (note_id,note) => {

    let url = `${context.app.$config.API_DOMAIN}notes/edit/`;
    let body = {
      id: note_id,
      note: note
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: echomtg.getUserHeaders(),
      body: JSON.stringify(body)
    });

    return await res.json();
  }

  echomtg.notesDelete = async (note_id) => {

    let url = `${context.app.$config.API_DOMAIN}notes/delete/`;
    let body = {
      id: note_id
    }
    const res = await fetch(url, {
      method: 'POST',
      headers: echomtg.getUserHeaders(),
      body: JSON.stringify(body)
    });
    return await res.json();
  }

  echomtg.getArticle = async (id) => {

    let url = `${context.app.$config.API_DOMAIN}data/article/?id=${id}`;

    const res = await fetch(url, {
      headers: echomtg.getS2SHeadersNoJSON()
    });

    return await res.json();
  }

  echomtg.getArticles = async (start=0,limit=100,search='') => {

    let url = `${context.app.$config.API_DOMAIN}data/articles/?start=${start}&limit=${limit}&search=${search}`;

    const res = await fetch(url, {
      headers: echomtg.getS2SHeadersNoJSON()
    });

    return await res.json();
  }


  echomtg.getEarningsStats = async () => {

    let url = `${context.app.$config.API_DOMAIN}earnings/stats/`;

    const res = await fetch(url, {
      headers: echomtg.getUserHeaders()
    });

    return await res.json();
  }

  echomtg.getEarnings = async (
    start=0,
    limit=50,
    direction='DESC',
    sort='e.date_sold',
    search='') => {

    const params = [
      `start=${start}`,
      `limit=${limit}`,
      `direction=${direction}`,
      `sort=${sort}`,
      `search=${search}`,
    ].join('&')

    let url = `${context.app.$config.API_DOMAIN}earnings/view/?${params}`;

    const res = await fetch(url, {
      headers: {
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      }
    });

    return await res.json();
  }

  echomtg.earningsAdd = async (emid,acquired_price,sold_price,foil=0 ) => {

    let url = `${context.app.$config.API_DOMAIN}earnings/add/`;
    let body =  {
      "emid": emid,
      "acquired_price": acquired_price,
      "sold_price": sold_price,
      "foil": foil
    }
    const res = await fetch(url, {
      method: 'POST',
      headers: echomtg.getUserHeaders(),
      body: JSON.stringify(body)
    });
    return await res.json();
  }



  echomtg.earningsDeleteItem = async (earnings_id) => {

    let url = `${context.app.$config.API_DOMAIN}earnings/remove/`;
    let body = {
      id: earnings_id
    }
    const res = await fetch(url, {
      method: 'POST',
      headers: echomtg.getUserHeaders(),
      body: JSON.stringify(body)
    });
    return await res.json();
  }
  echomtg.earningChangeSoldPrice = async (earnings_id, price) => {

    let url = `${context.app.$config.API_DOMAIN}earnings/adjust_sold/`;
    let body = {
      id: earnings_id,
      value: price
    }
    const res = await fetch(url, {
      method: 'POST',
      headers: echomtg.getUserHeaders(),
      body: JSON.stringify(body)
    });
    return await res.json();
  }

  echomtg.earningChangeAcquiredPrice = async (earnings_id, price) => {

    let url = `${context.app.$config.API_DOMAIN}earnings/adjust_acquired/`;
    let body = {
      id: earnings_id,
      value: price
    }
    const res = await fetch(url, {
      method: 'POST',
      headers: echomtg.getUserHeaders(),
      body: JSON.stringify(body)
    });
    return await res.json();
  }

  echomtg.earningChangeSoldDate = async (earnings_id, date) => {

    let url = `${context.app.$config.API_DOMAIN}earnings/adjust_date/`;
    let body = {
      id: earnings_id,
      value: date
    }
    const res = await fetch(url, {
      method: 'POST',
      headers: echomtg.getUserHeaders(),
      body: JSON.stringify(body)
    });
    return await res.json();
  }



  echomtg.editListMeta = async (list_id, name, description) => {

    let n = encodeURIComponent(name)
    let d = encodeURIComponent(description)

    let url = `${context.app.$config.API_DOMAIN}lists/edit/list=${list_id}&name=${n}&description=${d}`;
    echomtg.log(url, 'editing list name and description', context.app.$cookies.get('token'));
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
        }
      });
      let data = await res.json();
      this.createGrowl(data.message);
    } catch (error){
      echomtg.log(error);
    }
  }

  echomtg.wikiItemPatch = async (body) => {

    let url = `${context.app.$config.API_DOMAIN}wiki/update_item/`;

    const res = await fetch(url, {
      method: 'PATCH',
      headers: echomtg.getUserHeaders(),
      body: JSON.stringify(body)
    });
    return await res.json();
  }

  echomtg.getFAQs = async (start=0,limit=0,category=false) => {

    let url = `${context.app.$config.API_DOMAIN}faqs/view/?start=${start}&limit=${limit}&category=${category}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: echomtg.getUserHeaders()
    });
    return await res.json();
  }

  echomtg.faqCreate = async (question,answer,category) => {

    let url = `${context.app.$config.API_DOMAIN}faqs/create/`;
    let body = {
      question: question,
      answer: answer,
      category: category
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: echomtg.getUserHeaders(),
      body: JSON.stringify(body)
    });
    return await res.json();
  }

  echomtg.faqEdit = async (id,question,answer,category) => {

    let url = `${context.app.$config.API_DOMAIN}faqs/edit/`;
    let body = {
      id: id,
      question: question,
      answer: answer,
      category: category
    }

    const res = await fetch(url, {
      method: 'PUT',
      headers: echomtg.getUserHeaders(),
      body: JSON.stringify(body)
    });
    return await res.json();
  }

  echomtg.faqDelete = async (id) => {

    let url = `${context.app.$config.API_DOMAIN}faqs/delete/`;
    let body = {
      id: id
    }

    const res = await fetch(url, {
      method: 'DELETE',
      headers: echomtg.getUserHeaders(),
      body: JSON.stringify(body)
    });
    return await res.json();
  }


  echomtg.replaceSymbols = (str) => {

    if(str == null) return ''
    str = str.toLowerCase();
		let pattern =  /\{\{?(.*?)\}?\}/gi;
		let matches = str.match(pattern);
    if( matches == null ) return str;
		// symbols
		if(matches.length > 0){
			matches.forEach(match => {
				let splitLetters = match.toLowerCase().replace(/(\{\{?)|(\}?\})/g,'');

				switch(match.toLowerCase()){
					case '{{g}}':
					case '{{G}}':
          case '{G}':
          case '{g}':
					case '{{u}}':
					case '{{U}}':
          case '{u}':
					case '{U}':
					case '{{w}}':
					case '{{W}}':
          case '{w}':
					case '{W}':
					case '{{b}}':
					case '{{B}}':
          case '{b}':
					case '{B}':
					case '{{r}}':
					case '{{R}}':
          case '{r}':
					case '{R}':
					case '{{X}}':
					case '{{x}}':
					case '{{t}}':
					case '{{T}}':
          case '{T}':
          case '{t}':
					case '{{n}}':
					case '{{N}}':
          case '{n}':
          case '{N}':
						str = str.replace(match,`<span class="symbol ${splitLetters}">${splitLetters}</span>`);
						break;
					case '{{rg}}':
					case '{{ub}}':
					case '{{gw}}':
					case '{{uw}}':
					case '{{br}}':
					case '{{bg}}':
					case '{{ru}}':
					case '{{ur}}':
					case '{{wb}}':
					case '{{rw}}':
					case '{{wu}}':
					case '{{gu}}':
						let leftLetter = splitLetters.substring(0, 1);
						let rightLetter = splitLetters.substring(1, 2);
						str = str.replace(match,`<span class="splitmana"><span class="symbol split left ${leftLetter}">${leftLetter}</span><span class="symbol split right ${rightLetter}">${rightLetter}</span></span>`);
						break;


					case '{{phyrexian red}}':
					case '{{phyrexian blue}}':
					case '{{phyrexian black}}':
					case '{{phyrexian white}}':
					case '{{phyrexian green}}':
					case '{{gp}}':
					case '{{wp}}':
					case '{{rp}}':
					case '{{up}}':
					case '{{bp}}':
						let letters = splitLetters.replace('/\{\{|\}\}/','');
						let symbolColor = letters.substr(0,1);
						str = str.replace(match, '<span class="symbol phyrexian ' + symbolColor + '">Phyrexian ' + symbolColor + '</span>');
						break;


					default:
						let number = splitLetters;
						if(splitLetters == 'COLORLESS' || splitLetters == '^') {
							number = '&loz;';
						}
						str = str.replace(match,`<span class="symbol colorless">${number}</span>`);
						break;

				}


			})

			return str
		}
  }

  // IMAGE AND URL MAKING FUNCTIONS
  echomtg.getImageCropURL = (emid) => {
    return 'https://assets.echomtg.com/magic/cards/cropped/'+emid+'.hq.jpg';
  }

  echomtg.getImageFlipURL = (emid) => {
      return 'https://assets.echomtg.com/magic/cards/original/'+emid+'.flip.jpg';
  }

  echomtg.getImageURL = (emid) => {
    return 'https://assets.echomtg.com/magic/cards/original/'+emid+'.jpg';
  }

  echomtg.getSetSymbolURL = (set_code) => {
      return 'https://assets.echomtg.com/magic/symbols/expansions/' + set_code.toLowerCase() + '.png';
  }

  echomtg.getSetURL = (setCode, setName)  => {
      return "/mtg/set/" + setCode + '/' + echomtg.cleanSet(setName) + '/';
  }

  echomtg.cleanSet = (set) => {
    const toreplace = /[,_'\\\\/:.&()! ]/ig;
    return set.replace('--','-').toLowerCase().replace(toreplace,'-');
  }


  echomtg.md5 = (string) => {
    function RotateLeft(lValue, iShiftBits) {
      return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    }

    function AddUnsigned(lX,lY) {
      var lX4,lY4,lX8,lY8,lResult;
      lX8 = (lX & 0x80000000);
      lY8 = (lY & 0x80000000);
      lX4 = (lX & 0x40000000);
      lY4 = (lY & 0x40000000);
      lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
      if (lX4 & lY4) {
      return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
      }
      if (lX4 | lY4) {
      if (lResult & 0x40000000) {
      return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
      } else {
      return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
      }
      } else {
      return (lResult ^ lX8 ^ lY8);
      }
    }

    function F(x,y,z) { return (x & y) | ((~x) & z); }
    function G(x,y,z) { return (x & z) | (y & (~z)); }
    function H(x,y,z) { return (x ^ y ^ z); }
    function I(x,y,z) { return (y ^ (x | (~z))); }

    function FF(a,b,c,d,x,s,ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    }

    function GG(a,b,c,d,x,s,ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    }

    function HH(a,b,c,d,x,s,ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    }

    function II(a,b,c,d,x,s,ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    }

    function ConvertToWordArray(string) {
      var lWordCount;
      var lMessageLength = string.length;
      var lNumberOfWords_temp1=lMessageLength + 8;
      var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
      var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
      var lWordArray=Array(lNumberOfWords-1);
      var lBytePosition = 0;
      var lByteCount = 0;
      while ( lByteCount < lMessageLength ) {
      lWordCount = (lByteCount-(lByteCount % 4))/4;
      lBytePosition = (lByteCount % 4)*8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
      lByteCount++;
      }
      lWordCount = (lByteCount-(lByteCount % 4))/4;
      lBytePosition = (lByteCount % 4)*8;
      lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
      lWordArray[lNumberOfWords-2] = lMessageLength<<3;
      lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
      return lWordArray;
      }

      function WordToHex(lValue) {
      var WordToHexValue='',WordToHexValue_temp='',lByte,lCount;
      for (lCount = 0;lCount<=3;lCount++) {
      lByte = (lValue>>>(lCount*8)) & 255;
      WordToHexValue_temp = '0' + lByte.toString(16);
      WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
      }
      return WordToHexValue;
      }

      function Utf8Encode(string) {
      string = string.replace(/\r\n/g,'\n');
      var utftext = '';

      for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);

      if (c < 128) {
      utftext += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048)) {
      utftext += String.fromCharCode((c >> 6) | 192);
      utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
      utftext += String.fromCharCode((c >> 12) | 224);
      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
      utftext += String.fromCharCode((c & 63) | 128);
      }
      }

      return utftext;
    }

    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;

    string = Utf8Encode(string);

    x = ConvertToWordArray(string);

    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

    for (k=0;k<x.length;k+=16) {
    AA=a; BB=b; CC=c; DD=d;
    a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
    d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
    c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
    b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
    a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
    d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
    c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
    b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
    a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
    d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
    c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
    b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
    a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
    d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
    c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
    b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
    a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
    d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
    c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
    b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
    a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
    d=GG(d,a,b,c,x[k+10],S22,0x2441453);
    c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
    b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
    a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
    d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
    c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
    b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
    a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
    d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
    c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
    b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
    a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
    d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
    c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
    b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
    a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
    d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
    c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
    b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
    a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
    d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
    c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
    b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
    a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
    d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
    c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
    b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
    a=II(a,b,c,d,x[k+0], S41,0xF4292244);
    d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
    c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
    b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
    a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
    d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
    c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
    b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
    a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
    d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
    c=II(c,d,a,b,x[k+6], S43,0xA3014314);
    b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
    a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
    d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
    c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
    b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
    a=AddUnsigned(a,AA);
    b=AddUnsigned(b,BB);
    c=AddUnsigned(c,CC);
    d=AddUnsigned(d,DD);
    }

    var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

    return temp.toLowerCase();
   }


  inject('echomtg', echomtg)


}
