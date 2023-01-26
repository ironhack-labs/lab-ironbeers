const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

module.exports.random = (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeerFromApi => {
      res.render('random-beer', {
        beer: randomBeerFromApi[0]
      })
    })
    .catch(error => console.log(error));
};

