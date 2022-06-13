function createGrowl(message,icon,color="grey"){
	// get growl box
	var $growlbox = $('#growl-box');
	var timestamp = new Date().getUTCMilliseconds();
	// unique id
	var uid = 'g'+timestamp;
	// time to live is 3 seconds
	var ttl = 3000;
	
	$( "<div></div>", {
	  "class": "growl",
	  "id": uid,
		"style": `border-color: ${color}`,
	  "html": '<i class="fa fa-'+icon+'"></i>'+message,
	  on: {
	    click: function( event ) {
		    
		    $(this).fadeOut(300, function(){ 
	            $(this).remove(); 
	        });
	    }
	  }
	}).appendTo( "#growl-box" );
	
		
	setTimeout(function(){
		var $uniquegrowl = $('#'+uid);
		$uniquegrowl.fadeOut(300, function(){ 
            $uniquegrowl.remove(); 
        });
	},ttl);
	
	return $('#'+uid); 
}


function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}


$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};




$( document ).on('change','.change-currency',function(){
	
	$this = $(this);
	
	var url = '/api/user/change_currency/';
	$.post(url,{'currency_code':$this.val()},function(){
		location.reload();
		
	});
	
	
	
});


$( document ).on('click', '.toggle-off', function(event){
	$this = $(this);
	
	
	var classname = $this.attr('data-toggle');
	
	$('.'+classname).toggleClass('hide');
	$this.toggleClass('hide');
});

		
	/// voting control
	$( document ).on("click", ".voting",function( event) {
	
		$this = $(this);
			
		$.post( "/ajax.vote.php", { id: $(this).attr('data-id'), value: $(this).attr('data-value'), kickback: document.URL }, function( data ) {
	   	 	// for completeion test
	   	 	if(data.success == 'true'){
	   	 		$this.parent().html('<strong>'+data.message+'</strong>');
	   	 		
	   	 	} else {
		   	 	window.location = data.redirect;
		   	 	
	   	 	}
	
	   	 }, "json");
				
	});
	
	$(document).on('click','.price_update', function(e){
		$this = $(this);
		var set_name 		= $this.attr('data-set').replace('&','@');
		var card_name 		= encodeURIComponent($this.attr('data-card').replace('//','||'));
		var card_id 		= encodeURIComponent($this.attr('data-id'));

		var url = "/api/data/price_update/card=" + card_name + '&set=' + set_name;
	
		$.ajax(url,{ 
			dataType: 'json',
			success: function(data){

				if(data.status == 'success'){
					createGrowl(data.message);
					
				} else {
					//console.log(data);
					var newsetname = prompt("The set or expansion name may be incorrect, check the name of the expansion in TCG player and paste it in below to try again.");
					if (newsetname != null) {
					    var url = "/api/data/set_and_price_update/id="+card_id+'&set='+newsetname;
					    $.ajax(url,{ 
					    	dataType: 'json',
							success: function(data2){
								
								if(data2.status == 'success'){
									createGrowl(data2.message);
									
								} else {
									createGrowl(data2.message);
								}
							}
					    });
					}
										
				}
				
			   	 
			}
		});

		
	});

	$(document).on('submit','.generic-form',function(el){
		el.preventDefault();
		var $this = $(this);
		var endpoint = $this.attr('action');
		var data = $this.serializeObject();


		if($this.attr('method') == 'post'){
			$.post(endpoint,data).done(function(data){
				createGrowl(data.message);

				if(data.status == 'success'){
					if($this.attr('data-refresh')){
						location.reload();
					}
				} 
			})

		}

		if($this.attr('data-modal')){
			$('#' + $this.attr('data-modal')).modal('toggle');
		}




	})
	
	// smooth scroll to for api page
	$(document).on('click','a.scrollto', function(e){
		
		var target = $(this).attr('data-to');
	    $target = $(target);
		
		$('html, body').stop().animate({
	        'scrollTop': $target.offset().top - 90
	    }, 900, 'swing', function () {
	        //window.location.hash = target;
	    });
	});
	
	// text high light for api page
	
	$(document).on('click','.api textarea',function(e){
		$(this).focus();
		$(this).select();
	});
	
	
	/// date
	
	$(document).on('focus','.datepicker',function(e){
	
		$(this).datepicker();
		$(this).datepicker('show');
	});
	
	
	/////////////////////////////////////
	// UPDATE Ajusted prices and dates //
	/////////////////////////////////////
	
	$(document).on("change",".adjust-box",function(e){
		var url = "/api/"+$(this).attr('data-call')+"id="+$(this).closest('tr,li,div,article').attr('data-id')+'&value='+$(this).val().replace(/\//g,'-');
		$.ajax(url);
	});
	
	$(document).on("click",".adjust-click",function(e){
		var url = "/api/"+$(this).attr('data-call')+"id="+$(this).closest('tr,li,div,article').attr('data-id')+'&value='+$(this).attr('data-value').replace(/\//g,'-');
		$.ajax(url);
		$(this).remove();
		consolidateLikeEntries();
	});	
	
	
	
	
	
	//////////////////////
	// ADD TO watchlist //
	//////////////////////
	
	$( document ).on("click", ".watchlist-add",function(event) {
		$this = $(this);		
		var url = "/api/watchlist/add/mid="+$(this).attr('data-id');
	
		$.ajax(url,{
			dataType: 'json',
			success: function(data){

				createGrowl(data.message);

				if(data.status == 'success' && data.card){
		   	 		
		   	 		$this.html('Added to watch list!');
		   	 		
		   	 		ga('send', 'event', 'WatchList Button', 'click', 'Add');

		   	 		
		   	 		
		   	 	} else if(data.status == 'success') {
					$this.html('Already on watch list!');
					//window.location = '/tools/watchlist/';
				
				} else {	   	 	
		   	 		//console.log(data);
			   	 	window.location = '/user/';
			   	 	
		   	 	}
				
			}
		});
						
	});
	
	$( document ).on("change", ".watchlist-adjust-threshold",function(event) {
		$this = $(this);
		
		var url = "/api/watchlist/threshold/id="+$this.attr('data-id')+'&value='+$this.val();
		$.ajax(url,{
			dataType: 'json',
			success: function(data){
				if(data.status == 'success'){
		   	 		
		   	 		alert('Adjusted alert threshold to '+$this.val()+'%!');
		   	 		
		   	 	}
				
			}
		});
						
	});	

	$( document ).on("click", ".remove-alter",function( event) {
	
		var url = "/api/alters/remove/alter_id="+$(this).attr('alter-id');
		
		var answer = confirm ("Are you sure you want to delete? It's permanant.")
		if (answer){
			
	
			$.get( url, function( data ) {
		   	 	// for completeion test
		
		   	 	
		   	 	if(data.status == 'success'){
		   	 		$('#my-alters').load('/data/ajax.temp.myalters.php');
		   	 		
		   	 	} else {
			   	 	alert(data.message);
		   	 	}
		   	 	
		
		   	 }, "json");
		
		}

		 		
				

	});	
	
	
	Dropzone.options.myAwesomeDropzone = {
	success: function(file, done) {
		$('#my-alters').load('/data/ajax.temp.myalters.php');
	  }
	};
	
	$( document ).on("click", ".watchlist-remove",function( event) {
		
		//event.stopPropagation();
		$this = $(this);
		var url = "/api/watchlist/remove/id="+$(this).attr('data-id');
	
		$.get( url, function( data ) {
	   	 	// for completeion test
	
	   	 	
	   	 	if(data.status == 'success'){
	   	 		$this.closest('tr').remove();
	   	 		
	   	 	} else {
		   	 	alert(data.message);
	   	 	}
	   	 	
	
	   	 }, "json");
		
	});
	

	
	// alter modifier
	$(document).on('change','.alter-modifier',function(e){
		var url ='/data/ajax.temp.alter.filter.php';
		$this = $(this);
		var objs = {};

		objs[$this.attr('data-name')] = $this.val();
		
		//ary.push(objs);
		
		
		$.get(url,objs,function(response){
				$('#alter-search-content').html(response);
		});
		
	});
	
	
	// alter search
	$(document).on('keyup','#alter_card_search',function(e){
		$(".alter-modifier").val($(".alter-modifier option:first").val());
		
		var url ='/data/ajax.temp.alter.filter.php';
		$this = $(this);
		$.get(url,{
				'search' : $this.val(),
				'type'	 : '',
				'color'  : ''
			},function(response){
			$('#alter-search-content').html(response);
		});
		
	});
	
		
	$( document ).on("click", ".remove-earnings",function( event) {
		
		//event.stopPropagation();
		$this = $(this);
		var url = "/api/earnings/remove/id="+$(this).attr('data-id');
		//console.log(url);
	
		$.getJSON( url, function( data ) {
	   	 	// for completeion test
	
	   	 	
	   	 	if(data.status == 'success'){
	   	 		$this.closest('tr').remove();
	   	 		
	   	 	} else {
		   	 	alert(data.message);
	   	 	}
	   	 	
	
	   	 });
		
	});



	/////////////////////
	// ADD TO EARNINGS //
	/////////////////////
	var checkContinue = [];
	
	$( document ).on("click", ".earnings-add",function(event) {
		
		var $this = $(this);
		var wrapping_tr = $this.closest('tr');	
		var acquired_price = $this.closest('tr').find('.adjust-box').val();
		var inventory_id = $this.attr('data-iid');
		var mid = $this.attr('data-id'); // multi id		
		//console.log(inventory_id);
		var url = "/api/earnings/add/mid="+mid+"&acquired_price="+acquired_price+"&foil="+$this.attr('data-foil');
		//console.log(url);
		
		$.getJSON( url, function( data ) {
			//console.log(data);
			if(data.status == 'success'){
				//console.log('here');

				createGrowl(data.message,'plus');
				
				$this.closest('tr').attr('data-id',data.earnings_id);
				$this.closest('tr').html('<td colspan="8" class="padding">Sold/Traded '+data.card.card_name+'. Enter the value you got for the card: <input class="adjust-box" data-call="earnings/adjust_sold/" value="'+acquired_price+'" type="text" /> &nbsp; <button class="button small undo-button"><span class="fa fa-undo"></span> Undo <em id="count'+data.earnings_id+'">6</em></button></td>');
				
				
				checkContinue[data.earnings_id] = true;
				var seconds;
				var temp;
				
				function countdown() {
					seconds = document.getElementById('count'+data.earnings_id).innerHTML;
					seconds = parseInt(seconds, 10);
					
					if (seconds == 1) {
						temp = document.getElementById('count'+data.earnings_id);
						if(checkContinue[data.earnings_id]){
						
							var url = "/api/inventory/remove/inventory_id="+inventory_id;
							//console.log(url);
							$.get(url);	
							wrapping_tr.find('.undo-button').remove();
							//console.log('inventory removed');
							
						} 
						return;
					}
					
					seconds--;
					temp = document.getElementById('count'+data.earnings_id);
					temp.innerHTML = seconds;
					timeoutMyOswego = setTimeout(countdown, 1000);
				} 
				
				countdown();
				
			} else {
				createGrowl(data.message,'warning');

				var r = confirm(data.message+' \n\nClick ok to explore upgrading, or cancel to continue.');
				if (r == true) {
				    window.location = '/plans/';
				} else {
				   
				}

			}
		 
		});
		
						
	});
	
	$( document ).on('change', '.update-sold-price',function(event){
		$this = $(this);
		
	});
	
	/// set links
	$( document ).on("click", ".set li",function(event) {
		
		//$(this).children('a:first').trigger( "click" );
		if($(this).children('a').attr('href')){
			window.location = $(this).children('a').attr('href');
		}
	
	});
	
	$( document ).on("click", ".destroy-qiadd",function( event) {
		$(this).parent().animate({ height: 0, opacity: 0, padding: 0 }, 'slow');
	});
	
	/// inventory add from set page
	$( document ).on("click", ".qiadd",function( event) {
		
		//event.stopPropagation();
		$this = $(this);
		
		var url = "/api/inventory/add/";
		$.post(url,
			{mid:$this.attr('data-id'),quantity:$this.attr('data-quantity'),price:$this.attr('data-price'),foil:$this.attr('data-foil')});
		$this.fadeTo('fast', 0.8).fadeTo('fast', 1.0);
		$this.text('Add Another');


		
		
	});

	/// inventory add from card page
	$( document ).on("click", ".inventory-add",function( event) {
		
		//event.stopPropagation();
		$this = $(this);
		
		if( parseInt($this.attr('data-quantity')) >= 1){
			var url = "/api/inventory/add/mid="+$this.attr('data-id')+"&quantity="+$this.attr('data-quantity')+"&price="+$this.attr('data-price')+"&foil="+$this.attr('data-foil');
		} else {
			var url = "/api/inventory/remove/inventory_id="+$this.attr('data-iid');

		}
		
		
		$.getJSON( url, function( data ) {
	   	 	// for completeion test



	   	 	if(data.status == 'success'){
	   	 		var stored = $this.html();
	   	 		$this.html('<span class="fa fa-check"></span>');
				createGrowl(data.message,'plus');

	   	 		// settig infor back
	   	 		setTimeout(function(){
	   	 			$this.html(stored);
	   	 		}, 150);
	   	 		
	   	 		var newcount = 0;
	   	 		var price;
	   	 		var new_total;
	   	 		
	   	 		if($this.attr('data-foil') == 1){
		  			newcount = parseInt($('#foil-card-count').html()) +  parseInt($this.attr('data-quantity'));	 		
		  			
		  			price = $('.numbers.foil_price').html().trim();
		  			
		  			new_total = parseFloat( price.substr(1, 10) ) * parseInt(newcount);
		  			
		  			$('#foil-card-count').html(newcount+' = '+price.substr(0,1)+new_total.toFixed(2) );
	   	 		} else {
		   	 		newcount = parseInt($('#count').html()) +  parseInt($this.attr('data-quantity'));	 		
		  			price = $('.numbers.price_mid').html().trim();
		  			 
		  			new_total = parseFloat( price.substr(1, 10) ) * parseInt(newcount);

		  			
		  			$('#count').html(newcount+' = '+price.substr(0,1)+new_total.toFixed(2) );
	   	 		}
	   	 		
	   	 		
	   	 	} else {
				createGrowl(data.message,'plus');
	   	 		//console.log(data);
		   	 	window.location = '/user/';
		   	 	
	   	 	}
	   	 	
	   	 });
				
	});
	
	
	
	$(document).on("click",".fins", function(event){
		
		$('.navigation').toggleClass('open');
	});
	
	
	
	
	$(document).on('click','.list-tabs-earnings a', function(){
		
		$('.list-tabs-earnings a').removeClass('active');
		
		
		$(this).addClass('active');
		var tar = $(this).attr('data-id');
		
		var url ='/data/ajax.temp.earnings.filter.php';
		
		$.get(url,{
			'color': $(this).attr('data-color'),
			'search': '%'
		},function(response){
			$('#earnings-list').empty();
			$('#earnings-list').html(response);
			//clearInventorySearch();
		});
		
		
		$( '#'+ tar ).addClass('active');
	
	});
	
	
    $( document ).tooltip({
	      items: ".list-item,.card-reveal",
	      content: function() {
		      var element = $( this );
		      var foil = (element.attr('data-foil-price') > 0) ? '<strong class="foil pull-right">$'+element.attr('data-foil-price')+"</strong>" : '';
		      var reg = (element.attr('data-tcg-mid') > 0) ? '$'+element.attr('data-tcg-mid') : '';

		      return reg+foil+"<br><img width=\"100%\" src='"+element.attr('data-image')+"' />" ;
		  }
	 });

	
	//import
	
	$(document).on('click','.startImport',function(){
		$(this).hide();
		importCards();
		
	});
	
	function addToInventoryByEchoID(emid){
		var url = "/api/inventory/add/";


		$.post(url,{
				'emid': emid				
			}, function(data){
				if(data.status !== 'error'){
					createGrowl(data.message);	
				}
			}
		);
		
	}
		
	function addToInventory(emid){
		var url = "/api/inventory/add/";
		

		$.post(url,{
				'mid': emid				
			}, function(data){
				//console.log(data);
				if(data.status == 'error'){

					$("#inventory-list").prepend('<tr><td class="padded" colspan="7">'+data.message.replace('https://www.echomtg.com/plans/','<a href="/plans/">https://www.echomtg.com/plans/</a>')+'</td></tr>');
				} else {
					
					reloadInventoryStats();
				}
			}
		);
		
	}
	
	
	
	$(document).on("keyup.autocomplete", '.associated-image', function(){ 
	

		$(this).autocomplete({
			source: "/data/ajax.getsearchresults.php",
			select: function( event, ui ) {
				
				//console.log(ui.item.emid);		
				
				var url = '/api/alters/classify_alter/alter_id='+$(this).attr('alter-id')+'&card_id='+ui.item.emid;
				
				$.get( url, function( data ) {
			   	 	
			   	 	if(data.status == 'success'){
			   	 		$('#my-alters').load('/data/ajax.temp.myalters.php');
			   	 	}
			
			   	 }, "json");
				// ui.item.id;
			},
			html: true
		});
	
	});
	
	