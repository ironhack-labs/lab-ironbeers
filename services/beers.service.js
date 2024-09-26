

const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

module.exports.list = () => punkAPI.getBeers()

/*
module.exports.list = (req, res, next) => {
    app.get('/beers', (req, res)=> {
        punkAPI.getBeers()
        .then(beers => {
          res.render('beers', { beers: beers });
        })
        .catch(error => console.log(error))
      })
}
*/

module.exports.get = (id) => {
  const beerPromise = id === 'random' ? punkAPI.getRandom() : punkAPI.getBeer(id)
  return beerPromise
    .then((beers) => {
      if (beers.length > 0) {
        return beers[0]
      } else {
        return undefined
      }
    })
}