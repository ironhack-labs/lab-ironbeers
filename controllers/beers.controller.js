const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

module.exports.beers = (req, res) => {
  (req, res) => {
    punkAPI
      .getBeers()
      .then(beersFromApi => {
        res.render('beers', { beersFromApi });
      })
      .catch(error => console.log(error));
  };
};
