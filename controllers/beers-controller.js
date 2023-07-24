const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

module.exports.home = (req, res) => {
  res.render("beers/index");
}

module.exports.list = (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    res.render("beers/list", {beers: beersFromApi})
  })
  .catch(error => console.log(error));
};

module.exports.randomBeer = (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    res.render('beers/randomBeer', {beers: responseFromAPI})
  })
  .catch(error => console.log(error));
  
};