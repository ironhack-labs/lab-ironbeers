const punkAPI = require('../app');

module.exports.getRandom = (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      res.render('random-beer', { randomBeer });
    })
    .catch(error => console.log(error));
};

module.exports.getId = (req, res) => {
  const { id } = req.params;
  punkAPI
    .getBeer(id)
    .then(randomBeer => {
      res.render('random-beer', { randomBeer });
    })
    .catch(error => console.log(error));
};
