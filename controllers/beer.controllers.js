const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

module.exports.home = (req, res, next) => {
    res.render('index');
};

module.exports.list = (req, res, next) => {
    punkAPI
    .getBeers()
    .then(beersFromApi => {
        res.render('beers/list', { beers:beersFromApi });
    })
    .catch(error => {
        console.log(error);
    });
};

module.exports.random = (req, res, next) => {
    punkAPI
  .getRandom()
  .then(responseFromAPI => {
    res.render('random-beer', { beer: responseFromAPI[0] })
  })
  .catch(error => console.log(error));
}



