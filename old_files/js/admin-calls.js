	
/// voting control
$( document ).on("change", ".plan-change",function( event) {

	$this = $(this);
		
	$.post( "/api/admin/change_subscription/", { mod_user_id: $(this).attr('data-id'), plan: $(this).val() }, function( data ) {
   	 	console.log(data);
   	 	// for completeion test
   	 	if(data.status == 'success'){
   	 		console.log('updated');	
   	 	} else {
   	 		console.log('failed');	   	 	
	   	 	
   	 	}

   	 }, "json");
			
});


/// voting control
$( document ).on("click", ".toggle-email-preference",function( event) {

	$this = $(this);
		
	$.post( "/api/admin/toggle_email_preference/", { mod_user_id: $(this).attr('data-id'), preference: $(this).attr('data-preference') }, function( data ) {
   	 	console.log(data);
   	 	// for completeion test
   	 	if(data.status == 'success'){
   	 		console.log('updated');	
   	 	} else {
   	 		console.log('failed');	   	 	
	   	 	
   	 	}

   	 }, "json");
			
});
