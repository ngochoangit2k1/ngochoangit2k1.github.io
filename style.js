// navigaton bar
var headers = document.getElementById('header');

var mobileBar = document.querySelector('.mobile-bar');

var overView = document.getElementById('overview');

var flexMenu = document.querySelector('.flex4-menu');
var container = document.querySelector('.container4');
mobileBar.onclick = function(){
    var isClose = headers.clientHeight === 60;
    if (isClose){
        headers.style.height = '250px';
        flexMenu.style.opacity = '1';
    }else{
        headers.style.height = '60px';
        flexMenu.style.opacity = '0';
    }
}
overView.onclick = function(){
    headers.style.height = '60px';
}
container.onclick = function(){
    headers.style.height = '60px';
}
//map weather
var slideIndex = 1;
 showSlides(slideIndex);
function plusSlides(n) {
   showSlides(slideIndex += n);
 }
function currentSlide(n) {
   showSlides(slideIndex = n);
 }
function showSlides(n) {
   var i;
   var slides = document.getElementsByClassName("mySlides");
   var dots = document.getElementsByClassName("dot");
   if (n > slides.length) {slideIndex = 1}
   if (n < 1) {slideIndex = slides.length}
   for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";
   }
   for (i = 0; i < dots.length; i++) {
       dots[i].className = dots[i].className.replace(" active", "");
   }
   slides[slideIndex-1].style.display = "block";
   dots[slideIndex-1].className += " active";
 }
// weather news


 // api
//  fetch("https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "5b088930d4msh434c8fb98e985ddp18645ajsnf5e13d2e9f6b",
// 		"x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });