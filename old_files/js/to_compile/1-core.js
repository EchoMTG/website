// global function

var api_base_url = (window.location.hostname == 'dev.echomtg.com') ? 'https://dev.echomtg.com/api/' : 'https://www.echomtg.com/api/';


	function convertSymbols(str){
		if(str == null) return ''
		let pattern =  /\{\{(.*?)\}\}/gi;
		let matches = str.match(pattern);

		// symbols
		if(matches.length > 0){
			matches.forEach(match => {
				let splitLetters = match.replace(/(\{\{)|(\}\})/g,'');
				match = match.toLowerCase()
				switch(match){
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
	function reloadInventory(){
		var url ='/data/ajax.temp.inventory.filter.php';
		
		$.get(url,function(response){
			$('#inventory-list').html(response);
			//consolidateLikeEntries();
		});
		
		reloadInventoryStats();
		
		
	}
	function clearInventorySearch(){
		$('.inventory-search').val('');

	}	
	
	function consolidateLikeEntries(){
		// turning off consolidation
		return true;
		//collapse like row
		if(readCookie('consolidation') == 'false'){
			return true;	
		}

		$inventoryrows = $('#inventory-list td.card-inventory-display-name');
		var $countindex = 0;
		var $parent, $cloned;
		var $total_acquired;
		var $total_value = 0;
		var $card_name = '';
		var $current_value = 0;
		var $money_sign = '';		
		var $last_percentage = '';
		var $symbol = '';
		
		$inventoryrows.each(function(index) {
			
			$parent = $(this).parent(); 
			$next = $parent.next();
			$prev = $parent.prev();

			
			if ($(this).text() == $next.find('td.card-inventory-display-name').text() ){
				
				$card_name = $(this).find('.list-item').text();
				
				$countindex = $countindex + 1;
				
				$card_name_class = $(this).text().replace(/-|'|,|\$|\.|\/| |\(|\)|\[|\]|:|"/g,'-');
				
				
				$parent.addClass('collapsed');
				//$parent.addClass('has-background-black');
				$parent.addClass('has-border-left-black');
				$parent.addClass($card_name_class);
				//console.log($parent.children('.price.price_low').text().replace(/\$(\d+?\.\d\d)(.*?)/,'$2'));
				var split_arr = $parent.find('.price.price_low').text().split(" ");
				//console.log(split_arr);
				
				$last_percentage = $parent.find('td').eq(3).find('a').text();
				$symbol = $parent.find('td').eq(0).html();
				
				$current_value = split_arr[0].substring(1, 9);
				$money_sign = split_arr[0].substring(0, 1);

				
				$total_value += parseFloat($current_value);
				

			} else {
				
				//insert collapsed row
				if($countindex > 0){
					
					// if its part of the set above
					if($(this).text() == $prev.find('td.card-inventory-display-name').text() && $card_name != ''){
						$parent.addClass('collapsed');
						$parent.addClass('has-border-left-black');
						//$parent.addClass('has-border-bottom-black');
						$parent.addClass('is-last-expanded');
						//$parent.addClass('has-background-black');
						$countindex = $countindex + 1;
						//$card_name_class = $(this).text().replace(/-|'|,|\$|\.|\/| /g,'-');
						$total_value += parseFloat($current_value);
						
						$parent.addClass($card_name_class);
						
						var foiled = ($parent.attr('data-foil') == 1) ? 'foiled' : '';
						//$total_value += parseFloat($current_value);
						var $the_list = $next.prevAll('tr.'+$card_name_class);
						
						// create new row with combined information
						var position = $the_list.length - $countindex - 1;
						
						$the_list.eq(position).before(function() {
						  return "<tr class=\"expand "+foiled+"\" data-total=\""+$countindex+"\" data-attached-class=\""+$card_name_class+"\"><td colspan='3'><b class=\"multiplier\"><span class=\"fa fa-angle-down\"> Collapse</span><span class=\"fa fa-angle-right\"> Expand</span></b></td><td><b class=\"multiplier\">" + $countindex + "x</b> "+$last_percentage+"</td><td ><span class=\"price price_low\">"+$money_sign+$total_value.toFixed(2)+'</span> <small>: '+$money_sign+$current_value + "</small></td><td><center><small><span class=\"fa fa-angle-right\"> Expand</span><span class=\"fa fa-angle-down\"> Collapse</span></small></center></td><td></td><td><center><small><span class=\"fa fa-angle-right\"> Expand</span><span class=\"fa fa-angle-down\"> Collapse</span></small></center></td><td colspan='3'></td></tr>";
						});
						
					}
					
					// get previous row
					//$prev = $parent.prev();
					
					
					
					$the_list = '';
					$countindex = 0;
					$total_value = 0;
					$card_name = '';
				}
				$countindex = 0;
				$total_value = 0;
				$card_name = '';
				//var $parent = $(this).parent();
			}
			
		});
		
	}

	function reloadInventoryStats(){
		// reload stats
		var url ='/api/inventory/quickstats/';

		$.getJSON(url,function(data){
			//console.log(data);
			$('#total-cards').html(data.stats.total_cards);
			$('#total-cards-top').html(data.stats.total_cards);
			$('#current-value').html(data.stats.current_value);
			$('#current-high-value-value').html(data.stats.current_high_value_value);
			$('#current-value-low').html(data.stats.current_value_low);
			$('#current-value-top').html(data.stats.current_value);
			$('#acquired-value').html(data.stats.acquired_value);
			$('#total-profit').html(data.stats.total_profit);
			$('#percentage-html').html(data.stats.percentage_html);
			$('#foil-count').html(data.stats.total_foils);
			$('#mythic-count').html(data.stats.total_mythic);
			$('#rare-count').html(data.stats.total_rare);
			$('#uncommon-count').html(data.stats.total_uncommon);
			$('#common-count').html(data.stats.total_common);
			$('#sealed-count').html(data.stats.total_sealed);
			$('.totalItems').html(data.stats.total_items);
			$('.currentValue').html(data.stats.current_value);
			$('.totalStorageUsed').html(data.stats.user_items_cap_percentage_used + '%');

		});
		consolidateLikeEntries();
	}
	
