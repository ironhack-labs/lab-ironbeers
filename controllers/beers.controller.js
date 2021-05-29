const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

module.exports.list = (req, res, next) => {
  punkAPI.getBeers()
    .then(beers => res.render('beers/list', { beers }))
    .catch(error => next(error));
}
