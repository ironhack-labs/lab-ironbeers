const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

module.exports.home = (req, res) => {
    res.render('index');
}

module.exports.list = (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers/list', {beersFromApi});  
      })
    .catch(error => console.log(error));
  }

module.exports.randombeer = (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('beers/rambonbeer', {beer: responseFromAPI[0]})
    })
    .catch(error => console.log(error)); 
  }