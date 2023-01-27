const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

module.exports.randomBeer = (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('randomBeer', { beer: responseFromAPI[0] });
    })
    .catch(error => console.log(error));
};
