const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

module.exports.index = (req, res, next) => {
  res.render('index');
};

module.exports.beers = (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', {
        beersFromApi
      });
      console.log('Beers from the database: ', beersFromApi);
    })
    .catch(error => console.log(error));
};

module.exports.randombeers = (req, res, next) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('randombeers', {
        responseFromAPI
      });
    })
    .catch(error => console.log(error));
};