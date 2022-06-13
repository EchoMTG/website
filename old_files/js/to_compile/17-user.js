function purgePrompt(){
	let sign = prompt("To confirm deletion of your account, type DELETE. This cannot be undone.");

	if (sign.toLowerCase() == "delete") {
		fetch('/api/user/delete/')
			.then(function() {
				alert("Deleting data now, you will received a confirmation email and be logged out. Have a nice day!");
				window.location.replace('/logout/');
			})
			.catch(function() {
				alert("Error Deleting your Account, please email teeg@echomtg.com with your account email and request deletion.");
			});

	}
} 