window.onload = function() {
  const randomBeerButton = document.getElementById("randomBeerButton")
  const beerButton = document.getElementById("beerButton")


beerButton.onclick = function(){
  window.location.href = "/beers"
}

randomBeerButton.onclick = function(){
  window.location.href = "/random-beer"
}

}