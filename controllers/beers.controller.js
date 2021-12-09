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

module.exports.random = (req, res, next) => {
  PunkApi. getRandom()
    .then(([beer]) => res.render('beers/detail', { beer }))
    .catch(error => next(error));
}

module.exports.detail = (req, res, next) => {
  const { id } = req.params;
  PunkApi.getBeer(id)
  .then((beers) => {
    if (beers && beers.length > 0) {
      res.render('beers/detail', { beer: beers[0] })
    } else {
      res.redirect('/beers');
    }
  })
  .catch(error => next(error));
}
