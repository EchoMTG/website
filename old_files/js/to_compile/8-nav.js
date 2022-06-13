


/// navigation open collapse control
const allNavCollapsibleElements = document.querySelectorAll(".collapsable")
for(let i = 0 ; i < allNavCollapsibleElements.length ; i++) {
	allNavCollapsibleElements[i].addEventListener('click',function(event) {
		this.parentElement.classList.toggle('expanded');
	})
}

/// navigation open collapse control
const allNavElements = document.querySelectorAll(".navigation li a")
for(let i = 0 ; i < allNavElements.length ; i++) {
	allNavElements[i].addEventListener('click',function(event) {
		const allActiveNavElements = document.querySelectorAll(".navigation li a.is-active")
		for(let i = 0 ; i < allActiveNavElements.length ; i++) {
			allActiveNavElements[i].classList.remove('is-active');
		}
		if(/\//.test(this.getAttribute('href'))){
			document.querySelector('.navigation').classList.toggle('open')
		}
		this.classList.add('is-active')
	})
}

/// user nav open collapse control
$( document ).on("click", "#user-dropdown", function( event) {
	$('.drop-links').toggleClass('opened');
	$(this).toggleClass('active');		
});	
/// user nav force close
$( document ).on("click", ".drop-links li a", function( event) {
	$('.drop-links').removeClass('opened');
	$('#user-dropdown').removeClass('active');
});		
	
	
var mouse = {x: 0, y: 0};

document.addEventListener('mousemove', function(e){ 
    mouse.x = e.clientX || e.pageX; 
    mouse.y = e.clientY || e.pageY 
}, false);