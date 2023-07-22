const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

module.exports.beers = (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    console.log('Beers from the database: ', beersFromApi)
    res.render("beers", {beers: beersFromApi})
    
    
  })
  .catch(error => console.log(error));
};

module.exports.randomBeer = (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    res.render('randomBeer', {beers: responseFromAPI})
  })
  .catch(error => console.log(error));
  
};