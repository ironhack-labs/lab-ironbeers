const PunkApi = require('../config/punk.config');

module.exports.list = (req, res, next) => {
  PunkApi.getBeers()
    .then(beers => {
      beers = beers.map(beer => {
        beer.short_description = beer.description.substring(0, 100);
        return beer;
      })
      res.render('beers/list', { beers })
    })
    .catch(error => next(error));
}
