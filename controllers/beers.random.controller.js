const punkAPI = require('../app');

module.exports = (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      const randomBeer = responseFromAPI
      res.render('random-beer', { randomBeer: randomBeer });
    })
    .catch(error => console.log(error));
};
