const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

module.exports.index = (req, res) => {
  res.render('index');
}

module.exports.beer = (req, res) => {
  punkAPI.getBeers().then((beersFromApi) => 
      res.render("beers/beers", {beers: beersFromApi})
    )
    .catch(error => console.log(error));
}

module.exports.beerId = (req, res) => {
  const beerId = req.params.beerId;

  punkAPI.getBeer(beerId)
    .then((beer) => {
      res.render("random-beer", {beer: beer[0]});
    })
    .catch(error => console.log(error));
}

module.exports.randomBeer = (req, res) => {
  punkAPI.getRandom().then((responseFromAPI) => {
    const randomBeer = responseFromAPI;
    res.render("random-beer", {beer: randomBeer[0]});
  })
  .catch(error =>  console.log(error));
}
