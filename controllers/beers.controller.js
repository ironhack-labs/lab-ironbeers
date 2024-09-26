
const beersService = require('../services/beers.service')


module.exports.list = (req, res, next) => {
  
  beersService.list()
    .then((beers) => res.render('beers/list', { beers }))
    .catch(error => next(error))

}

module.exports.detail = (req, res, next) => {
  const id = req.params.id
  beersService.get(id)
    .then((beer) => res.render('beer/list'))
    .catch(error => next(error))
}