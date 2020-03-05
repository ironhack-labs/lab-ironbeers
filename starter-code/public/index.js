const beersButton = document.getElementById("beers");
const randomBeerButton = document.getElementById("random-beer");

beersButton.addEventListener('click', () => {
    punkAPI.getBeers()
})