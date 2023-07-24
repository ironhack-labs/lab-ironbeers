const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

module.exports.home = (req, res) => {
  res.render('index', {});
};

module.exports.list = (req, res) => {
  punkAPI
    .getBeers()
    .then(beers => {
      res.render('beers/list', { beers });
    })
    .catch(err => {
      console.error(err);
    });
};

module.exports.random = (req, res) => {
  punkAPI
    .getRandom()
    .then(beers => {
      res.render('beers/detail', { beer: beers[0] });
    })
    .catch(err => {
      console.error(err);
    });
};
