export default (context, inject) => {
  const echomtg = {}

  echomtg.log = (...params) => {
    console.log(params);
  }

  echomtg.createGrowl = (message,icon,color="grey") => {
    alert(message + icon + color)
  }

  echomtg.inventoryQuickAdd = async (emid,foil=0) => {

    let url = `${context.env.API_DOMAIN}inventory/add/emid=${emid}&foil=${foil}`;
    console.log(url, 'adding inventory', context.app.$cookies.get('token'));
    const res = await fetch(url, {
      headers: {
        'Authorization' : 'Bearer ' + context.app.$cookies.get('token')
      }
    });
    let data = await res.json();

    alert(data.message); //createGrowl(response.message);
  }

  echomtg.replaceSymbols = (str) => {

    if(str == null) return ''
		let pattern =  /\{\{(.*?)\}\}/gi;
		let matches = str.match(pattern);

		// symbols
		if(matches.length > 0){
			matches.forEach(match => {
				let splitLetters = match.toLowerCase().replace(/(\{\{)|(\}\})/g,'');

				switch(match.toLowerCase()){
					case '{{g}}':
					case '{{G}}':
					case '{{u}}':
					case '{{U}}':
					case '{{w}}':
					case '{{W}}':
					case '{{b}}':
					case '{{B}}':
					case '{{r}}':
					case '{{R}}':
					case '{{X}}':
					case '{{x}}':
					case '{{t}}':
					case '{{T}}':
					case '{{n}}':
					case '{{N}}':
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


  inject('echomtg', echomtg)


}
