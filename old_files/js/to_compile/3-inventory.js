	
$( document ).on('click', '.toggle-consolidation', function(event){
	
	$(this).find('.fa').toggleClass('hidden');
	
	if(readCookie('consolidation') == 'false'){
		eraseCookie('consolidation');
	} else {
		createCookie('consolidation','false',1000000);
	}
	
	reloadInventory();
	
});



$(document).on('click','.select-all-inventory',function(){
	
	var $this = $(this);
	var checkboxes = $('#inventory-list input[type=checkbox]');
	
	if($this.attr('data-state') == 'checked'){
		// uncheck them all
		checkboxes.each(function(index){
			$(this).prop('checked',false);
		});
		
		$this.attr('data-state','unchecked');
		
		
	} else {
		// check them all
		checkboxes.each(function(index){
			$(this).prop('checked',true);
		});
		$this.attr('data-state','checked');
	}
	
	$this.children('.fa').toggleClass('hidden');

	
	
});

$(document).on('click','.view-note',function() {
	var url = '/api/notes/note';
	var $this = $(this);
	$.get(url,{'id': $this.attr('data-note-id') }).done(function(response) {
		$('#noteView').addClass('is-active')
		$('#noteView .modal-card-body  .content').html(response.note.note)
		$('#noteView .delete-note').attr('data-note-id',$this.attr('data-note-id'))

	});

});

$(document).on('click','.add-note',function() {
	var $this = $(this);
	$this.addClass('temp-note-holder');
	$('#noteCreate').addClass('is-active');
	$('#noteCreate .inventory_id_for_note').val( $this.attr('data-inventory-id') )

});


$(document).on('click','.delete-note',function(e) {
	e.preventDefault();
	var $this = $(this);
	var url = '/api/notes/delete/';
	var note_id = $this.attr('data-note-id')

	$.post(url, {'id': note_id }, function(data) {
		$('a[data-note-id="'+note_id+'"]').find('span').removeClass('fa-file');
		$('a[data-note-id="'+note_id+'"]').find('span').addClass('fa-file-o');
		$('a[data-note-id="'+note_id+'"]').removeClass('view-note');
		$('a[data-note-id="'+note_id+'"]').addClass('add-note');
		document.getElementById('noteView').classList.remove('is-active')
		createGrowl(data.message);
	});

});
 
$(document).on('click','.tradable',function(el) {

	var $this = $(this);
	var url = '/api/inventory/toggle_tradable/';
	let tradeState = parseInt($this.attr('data-trade-state')) == 0 ? 1 : 0;
	let data =  {
		'tradable' : tradeState,
		'inventory_id' : $this.attr('data-iid')
	}

	$.post(url,data).done(function(data) {
		createGrowl(data.message,'handshake-o')
	})
})

$(document).on('submit','.create-note',function(el) {
	el.preventDefault();

	var $this = $(this);
	var url = '/api/notes/create/';

	var data = $this.serializeObject();


	$.post(url,data).done(function(data) {
		createGrowl(data.message);
		$('.temp-note-holder').find('span').removeClass('fa-file-o');
		$('.temp-note-holder').find('span').addClass('fa-file');
		$('.temp-note-holder').addClass('view-note');
		$('.temp-note-holder').removeClass('add-note');
		$('.temp-note-holder').attr('data-note-id',data.note_id);

		document.getElementById('noteCreate').classList.remove('is-active')
	});

});

// color filter on the inventory

	$(document).on('change','.select-filter', function(){
		

		$this = $(this);
		var tar = $this.attr('name');		
		var url ='/data/ajax.temp.inventory.filter.php';
		var jsonVariable = {};
		
		jsonVariable[tar + ''] = $this.val();        
		jsonVariable['search'] = 'false';        		  
	
	
		
		$.get(url,jsonVariable,function(response){
			$('#inventory-list').html(response);
			clearInventorySearch();
		});
		
		
		
	
	});
	


$(document).on("click",".undo-button",function(e){
		checkContinue[$(this).closest('tr').attr('data-id')] = false;
		//console.log(checkContinue[$(this).closest('tr').attr('data-id')]);
		
		var url = "/api/earnings/remove/id="+$(this).closest('tr').attr('data-id');
		$.get(url);	
		//console.log('canceled and removed from earnings');
		reloadInventory();
		
	});
	


	$(document).on('click','.expand',function(e){
		$(this).toggleClass('opened');
		var $list_to_expand = $(this).nextAll('tr.'+$(this).attr('data-attached-class'));
		var index = 0;
		var limit = parseInt($(this).attr('data-total'));
		
		$.each($list_to_expand, function(){
			$(this).toggleClass('opened');
			index++;
			if(limit == index) return false;
		});

	});
	
	var delay = (function(){
	  var timer = 0;
	  return function(callback, ms){
	    clearTimeout (timer);
	    timer = setTimeout(callback, ms);
	  };
	})();
	
	var oldSearchVal = '';
	
	$(document).on('keyup','.inventory-search',function(e){
		var url ='/data/ajax.temp.inventory.filter.php';
		$this = $(this);
		
		
		if(oldSearchVal != $this.val()) {
			delay(function(){
				$this.addClass('thinking');
				$('#inventory-list').html('');
				$.get(url,{'search' : $this.val() },function(response){
					$('#inventory-list').html(response);
					$this.removeClass('thinking');
					oldSearchVal = $this.val();
				});
				
		    }, 280 );		
		}
			
				
	});

	
	
	$(document).on('click','.filter-inventory',function(e){
		var url ='/data/ajax.temp.inventory.filter.php';
		$this = $(this);
		$direction = $this.attr('data-direction');

		eraseCookie('default_sort');
		createCookie('default_sort',$this.attr('data-filter')+' '+$direction, 90);
		
		$('.filter-inventory').find('.fa-angle-down').addClass('hidden');
		$('.filter-inventory').find('.fa-angle-up').addClass('hidden');
		
		if($direction == 'DESC') {
			$this.attr('data-direction','ASC');
			$this.find('.fa-angle-up').removeClass('hidden');			
		} else {
			$this.attr('data-direction','DESC');
			$this.find('.fa-angle-down').removeClass('hidden');

			
		}
		
		
		
		$.get(url,{
				'sort' : $this.attr('data-filter'),
				'direction' : $direction
				
			},function(response){
			$('#inventory-list').html(response);
		});
		
	});
	
	
	/////////////////////////
	// QUICK ADD INVENTORY //
	/////////////////////////
	
	$(document).on("focus","#quick-add-search",function(e) {
	    if ( !$(this).data("autocomplete") ) { // If the autocomplete wasn't called yet:
	        $(this).autocomplete({             //   call it
	            source: "/data/ajax.getsearchresults.php",
				select: function( event, ui ) {
					
					var qty = $('#quick-add-count').val();
					var foil = $('#quick-add-foil-option').attr('data-foil');
					var acquired_price = $('#quick-add-acquired').val().replace('$','');
					var acq = acquired_price > 0 ? '&acquired_price='+acquired_price : '';
					var url = "/api/inventory/add/mid="+ui.item.multiverseid+'&quantity='+qty+'&foil='+foil+acq;

					
					$.ajax(url,{
						dataType: 'json',
						success: function(data){
							//console.log(data);
							if(data.status == 'error'){
								$("#inventory-list").prepend('<tr><td  class="padded" colspan="7">'+data.message.replace('https://www.echomtg.com/plans/','<a href="/plans/">https://www.echomtg.com/plans/</a>')+'</td></tr>');
							} else {
								
								createGrowl(data.message,'plus');
								
								// reload inventory sorted by id
								var url ='/data/ajax.temp.inventory.filter.php';
						
								eraseCookie('default_sort');
								createCookie('default_sort','i.id DESC', 90);
								
								
								$.get(url,{
										'sort' : 'i.id',
										'direction' : 'DESC',
										'color': false,
										'search': false
										
									},function(response){
										$('.list-tabs a').removeClass('active');
										$('#inventory-list').html(response);
										reloadInventoryStats();										
								});
								

								
							}
						}
						
					});
	
				},
				html: true
	        });
	    }
	});
	
	//////////////////////
	// ADD TO INVENTORY //
	//////////////////////
	
	$( 'body' ).on("click", ".inventory .add",function(event) {
				
		var url = "/api/inventory/add/";
		
		var $thisParent = $(this).closest('tr');
		var $clone 		= $(this).closest('tr').clone();

		$.post(url,{
				'mid': $(this).attr('data-id'),
				'acquired_price': $(this).attr('data-value'),
				'acquired_date': $(this).attr('data-date'),
				'foil': $(this).attr('data-foil')				
			}, function(data){
				//console.log(data);
				if(data.status == 'error'){

					$("#inventory-list").prepend('<tr><td class="padded" colspan="7">'+data.message.replace('https://www.echomtg.com/plans/','<a href="/plans/">https://www.echomtg.com/plans/</a>')+'</td></tr>');
					createGrowl(data.message,'alert');
				} else {
					$clone.insertAfter($thisParent);
					reloadInventoryStats();
					createGrowl(data.message,'plus');
				}
			}
		);
						
	});

	
	/////////////////
	// TOGGLE FOIL //
	/////////////////
	
	$( document ).on("click", ".inventory .toggle_foil",function( event) {
		
		//event.stopPropagation();
		$this = $(this);
		var url = "/api/inventory/toggle_foil/inventory_id="+$(this).attr('data-id')+'&foil='+$(this).attr('data-foil');
		$this.toggleClass('foiled');
		$.post( url, { inventory_id: $(this).attr('data-id') }, function( data ) {
	   	 	
	   	 	if(data.status == 'success'){
	   	 		$this.parent('tr').find('.price_low').addClass('foil');
	   	 		reloadInventory();
	   	 		createGrowl(data.message,'circle');
	   	 	}
	
	   	 }, "json");
				
	});

	$(document).on('click','.bulk-action',function(event){
		$('#bulk-action-box').toggle();
	})
	
	$(document).on('click','#delete-selected-inventory',function(event){
		var elementsToDelete =  getSelectedInventory();

		$.each(elementsToDelete, function( index, value ) {
		  removeFromInventory(value.id,value.el);
		});
		
		$('#bulk-action-box').toggle();
	})
	
	$(document).on('click','#add-selected-inventory-to-list',function(event){
		var elementsToAdd =  getSelectedInventory();
		var $list_id = $('#list-to-add-to').val();

		$.each(elementsToAdd, function( index, value ) {
			addToList($list_id, value.emid);
		});
		
		$('#bulk-action-box').toggle();
	})	
	
	function getSelectedInventory(){
		var selectedItems = [];
		//$('#inventory-list input:checked');
		$('#inventory-list input:checked').each(function(index){
			var element = $(this).closest('tr');
			var iid = element.attr('data-id');
			var emid = element.attr('data-emid');
			selectedItems.push({el: element, id: iid, emid: emid});
		});
		
		return selectedItems;
	}
		
	

	//////////////////////
	// change condition //
	//////////////////////

	$( document ).on("change", ".change-condition",function( event) {
		
		$this = $(this);
		var url = "/api/inventory/change_condition/";

		$.post( url, { id: $(this).attr('data-iid'), value : $this.val() }, function( data ) {
	   	 	createGrowl(data.message,'pencil');
	   	 	
	   	 }, "json");
				
	});	


	//////////////////////
	// change language //
	//////////////////////

	$( document ).on("change", ".change-language",function( event) {
		
		$this = $(this);
		var url = "/api/inventory/change_language/";

		$.post( url, { id: $(this).attr('data-iid'), value : $this.val() }, function( data ) {
	   	 	createGrowl(data.message,'flag');
	   	 	
	   	 }, "json");
				
	});	



	
	////////////////////////////
	// REMOVE FROM INVENTORY  //
	////////////////////////////
	
	
	$( document ).on("click", ".inventory .remove",function( event) {
		
		//event.stopPropagation();
		$this = $(this);
		removeFromInventory( $(this).attr('data-id'), $this );
		
	});
	
	
	function removeFromInventory(inventory_id, el){
		var url = "/api/inventory/remove/";
		
		$.post( url, { inventory_id: inventory_id }, function( data ) {
	   	 	// for completeion test
	
	   	 	
	   	 	if(data.status == 'success'){
	   	 		reloadInventoryStats();
	   	 		el.closest('tr').remove();
	   	 		createGrowl(data.message,'times');
	   	 		
	   	 	} else {
		   	 	createGrowl(data.message,'warning');
	   	 	}
	   	 	
	
	   	 }, "json");
	}
	
	$(document).on('click','#inventory-list .pagination',function(e){
		var url ='/data/ajax.temp.inventory.filter.php';
		$this = $(this);
		$.get(url,{
				'start' : $this.attr('data-start'),
				'limit' : $this.attr('data-limit')
				
				
			},function(response){
			$('#inventory-list').html(response);
		});
		
	});
	