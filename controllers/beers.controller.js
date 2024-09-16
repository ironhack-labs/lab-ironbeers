const beersService = require('../services/beers.service');


module.exports.list = (req, res, next) => {
  beersService.list()
    .then((beers) => res.render('beers/list', { beers }))
    .catch((error) => next(error));
}

module.exports.detail = (req, res, next) => {
  const { id } = req.params;
  beersService.get(id)
    .then((beer) => {
      console.debug(beer);
      res.render('beers/detail', { beer })
    }).catch((error) => next(error));
}