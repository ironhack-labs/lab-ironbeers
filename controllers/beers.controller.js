const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

module.exports.beers = (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      //console.log('Beers from the database:', beersFromApi)
      res.render('beers', { beersFromApi });
    })
    .catch(error => console.log(error));
};