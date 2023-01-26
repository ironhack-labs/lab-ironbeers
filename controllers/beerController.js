const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

module.exports.beer = (req, res) => {
    punkAPI.get(req.params.id)
      .then((Alex) => {
        res.render('beer', { Alex });
      })
      .catch((error) => {
        console.log(`${error}`);
      })
  };