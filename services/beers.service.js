const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

module.exports.list = () => punkAPI.getBeers();

module.exports.get = (id) => {
    const beerPromise = (id === 'random') ? punkAPI.getRandom() : punkAPI.getBeer(id)
    return beerPromise
      .then((beers) => (beers.length > 0) ? beers[0] : undefined);
  }

