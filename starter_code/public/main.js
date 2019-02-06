let button1 = document.getElementById("checkBeer");
let button2= document.getElementById("checkRandomBeer");

button1.addEventListener("click", function(){
    document.location.href= "/beers"
});

button2.addEventListener("click", function(){
    document.location.href= "/random-Beer"
});