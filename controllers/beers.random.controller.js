const punkAPI = require('../app');

module.exports = (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('random-beer', { randomBeer: responseFromAPI[0] });
    })
    .catch(error => console.log(error));
};
