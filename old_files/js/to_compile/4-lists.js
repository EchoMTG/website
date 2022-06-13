//global

var current_list = '';
var $listlist;
var last_list_view = 'deck_build';
	//////////////////////////////
	//////////////////////////////
	//////////////////////////////
	/// Lists
	//////////////////////////////
	//////////////////////////////

	function loadList(list_id){
		var url = '/api/lists/get/view=true&list='+list_id;

		$.getJSON(url, function(data){
			current_list = data.list;
			$('#list').html('');
			//console.log(last_list_view);
			$('#list').html(data.list.view);				
			
			switch(last_list_view){
				case 'listlist':
					
					loadListList();
					break;
				case 'deckedit':
				default:
					// laods default html view for now
					loadDeckEdit();
					break;
			}


			$('.export-list').attr('data-id',data.list.id);

			$('.cardKingdomExportURL').val('https://www.echomtg.com/api/lists/cardkingdom_sell/list='+data.list.id);
			$('.deactivate-list').attr('data-id',data.list.id);
			$('.export-bar').show();
		});	
		
	}
	
	
	function loadLists(){
		var url = '/api/lists/all/';
		
		$.getJSON( url, function( data ) {
			 $.each(data.lists, function(i, item) {
			    $('#lists').append('<li>'+data.lists[i].name+'</li>');
			    

			});
		
		});
		
	}
	function clearListTabs(){
		$('.deck-tab-buttons a').removeClass('active');
		$('.deck-tabs').hide();

		
	}
	function loadDeckEdit(){
		last_list_view = 'deckedit';
		clearListTabs();
		$('#deckedit').show();
		$('.deck-view-tab').addClass('active');
	}
	
	function loadListList(){
		
		
		clearListTabs();
		
		$('.list-view-tab').addClass('active');
		
		$listlist = $('#listlist');
		$listlist.show();
		last_list_view = 'listlist';
		
		var $ul = $("<ul>",{'class':'slats'});
	
		
		$.each( current_list.card_list , function( key, value ) {
			// setup foil checks
			var foil_toggle = (value.foil == 0) ? 1 : 0;	
			var foil_class = (value.foil == 0) ? '' : 'foiled';	
			// row	
			var $li = $("<li>", {'data-id': value.id,'data-card-id': value.card_id, 'class': "",'html': value.name});
			// foil set symbol
			var $foil_button = $("<a>", {'data-id': value.id, 'class':'ss ss-grad ss18 ss-'+value.rarity.toLowerCase()+' ss-'+value.set_code.toLowerCase()+' ignore toggle_list_foil '+foil_class, 'data-foil':foil_toggle,'href':'javascript:void(0)','data-list': current_list.id});
			$li.prepend($foil_button);
			// prices
			if(value.foil == 0){
				var $price = $("<strong>", {'class':'list_price price_low','html':current_list.currency_symbol+value.tcg_mid+' / '+current_list.currency_symbol+value.tcg_low});

			} else {
				var $price = $("<strong>", {'class':'list_price foil','html':current_list.currency_symbol+value.foil_price});
			}
			$li.append($price)
			
			// remove button
			var $remove_button = $("<a>", {'data-id': value.id ,'class':'ignore remove-from-list button small black pull-right', 'data-foil':foil_toggle,'href':'javascript:void(0)','data-list': current_list.id,'html':'<span class="fa fa-times"></span> <i class="hide-mobile">remove</i>'});
			$li.append($remove_button);
			
			//add-to-list " data-list="'.$this->list_id.'" data-id="'.$card->card_id.'"  href="javascript:void(0);
			var $add_button = $("<a>", {'data-id': value.emid ,'class':'ignore add-to-list button small pull-right', 'data-foil':foil_toggle,'href':'javascript:void(0)','data-list': current_list.id,'html':'<span class="fa fa-plus-circle"></span> add <i class="hide-mobile"> another</i>'});
			$li.append($add_button);
			
			// add li to list
			$ul.append($li);  
		});
	
		$listlist.append($ul);  
		
		
	}
	
	$(document).on("click",".remove-from-list",function(e){
		$this = $(this);
		var url = "/api/lists/remove/list="+$this.attr('data-list')+"&id="+$this.attr('data-id');
		var $this = $(this);

		$.getJSON(url, function(data){
			
			$this.closest('tr').remove();
			loadList($this.attr('data-list'));
		});
		
	});
	
	$(document).on("click",".private",function(e){
		var conf = confirm("Make this list public? This cannot be reversed.");
		if (conf == true) {
			var endpoint = '/api/lists/toggle_public/';
			var list_id = $(this).attr('data-list');
			$.post(endpoint,{'public':1,'list':list_id},function(){
				loadList(list_id);
			});
			
		}
	});
	
	$(document).on("click",".add-to-list",function(e){
		
		$this = $(this);
		addToList($this.attr('data-list'),$this.attr('data-id'));
		loadList( $this.attr('data-list') );
		
	});
	function addToList(list_id,emid){
		
		var url = "/api/lists/add/list="+ list_id+'&echomtg_id='+emid;
					
		$.ajax(url,{
			dataType: 'json',
			success: function(data){
				
				if(data.status == 'error'){
					alert(data.message);
				} else {
					createGrowl(data.message,'plus');
				}						
			}
			
		});	
		
	}
	
	
	$(document).on("click",".create-list",function(e){
		var newlist = prompt("Please name your list (Powered Cube, Legacy Deck, Etc.)", "");
		if (newlist != null) {
			var url = "/api/lists/create/name="+newlist;
			//console.log(url);
			$.getJSON(url,function(data){
				if(data.status == 'success'){
					//console.log(data);
					loadList(data.data.id);
					//location.reload();
				} else {
					alert(data.message);
				}
				
			});
			
		}
		
		
		
		
		return false;
	});
	
	$(document).on('change', '#lists', function(e){
		loadList( $(this).val() );
	});

	$(document).on('click','.export-list',function(){
		
		window.open( $(this).attr('data-ref')+$(this).attr('data-id') );
	});
	
	$(document).on('click','.loadList', function(e){
		
		loadList( $(this).attr('data-id') );
		
	
	});
	
	$(document).on("click",".deactivate-list",function(e){
		var deletePrompt = prompt("Type DELETE to confirm.", "");
		if (deletePrompt.toUpperCase() == 'DELETE') {
			var url = "/api/lists/toggle_status/status="+$(this).attr('data-status')+"&list="+$(this).attr('data-id');
			$.ajax(url);
			location.reload();
		}
	});
	
	
		
	$( document ).on("click", ".toggle_list_foil",function( event) {
		
		//event.stopPropagation();
		$this = $(this);
		var url = "/api/lists/toggle_foil/id="+$this.attr('data-id')+'&foil='+$this.attr('data-foil')+'&list_id='+$this.attr('data-list');
		$this.toggleClass('foiled');
		
		$.get( url, function( data ) {
	   	 	
	   	 	if(data.status == 'success'){
	   	 		loadList( $this.attr('data-list') );
	   	 	}
	
	   	 }, "json");
				
	});	
	
	$( document ).on("click", ".toggle_sideboard",function( event) {
		
		//event.stopPropagation();
		$this = $(this);
		var url = "/api/lists/toggle_sideboard/id="+$this.attr('data-id')+'&sb='+$this.attr('data-sb')+'&list_id='+$this.attr('data-list');
		
		$.get( url, function( data ) {
	   	 	
	   	 	if(data.status == 'success'){
	   	 		loadList( $this.attr('data-list') );
	   	 	}
	
	   	 }, "json");
				
	});
			
	
	$( document ).on("click", ".inventory_add_from_list",function(event) {
		
		$this = $(this);		
		var url = "/api/inventory/add/mid="+$this.attr('data-id');
	
		$.ajax(url,{
			dataType: 'json',
			success: function(data){

				
				loadList( $this.attr('data-list') );
				
			}
		});
						
	});	
	

	$( document ) .on("click",".submitToCardKingdom",function(event){
        $('#cardKingdomSell').submit();

	});
