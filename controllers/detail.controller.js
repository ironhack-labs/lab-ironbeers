const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

module.exports.detail = (req, res) => {
  punkAPI
    .getBeer(req.params.id)
    .then((randomBeerFromApi) => { 
      res.render('random-beer', {
        beer: randomBeerFromApi[0]
      })
    })
    .catch(error => console.log(error));
};
