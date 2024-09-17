const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

exports.list = (req, res) => {
    punkAPI.getBeers()
      .then(beersFromApi => {
        res.render('beers', { beers: beersFromApi });
      })
      .catch(error => console.log(error));
  }
  exports.randomBeer = (req, res) => {
    punkAPI.getRandom()
    .then(responseFromAPI => {
      const randomBeer = responseFromAPI[0];
      res.render('random-beer', { beer: randomBeer }); 
    })
    .catch(error => console.log(error));

  };