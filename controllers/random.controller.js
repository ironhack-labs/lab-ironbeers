const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();


module.exports.random = (req, res) => {
    punkAPI
      .getRandom()
      .then((responseFromAPI) => {
        res.render('random-beer', { beer: responseFromAPI[0]})
      })
      .catch(error => console.log(error));
    }

