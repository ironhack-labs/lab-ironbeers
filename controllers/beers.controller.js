const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

module.exports.list = (req, res, next) => {
  punkAPI.getBeers()
    .then(beers => res.render('beers/list', { beers }))
    .catch(error => next(error));
}

module.exports.random = (req, res, next) => {
  punkAPI.getRandom()
    .then(beers => res.render('beers/detail', { beer: beers[0] }))
    .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
  punkAPI.getBeer(req.params.id)
    .then(beers => res.render('beers/detail', { beer: beers[0] }))
    .catch(error => next(error));
}
