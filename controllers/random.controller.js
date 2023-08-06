const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

module.exports.random = (req, res) => {
    punkAPI.getRandom()
    .then((beers) => {
     //console.log(beers);//
        res.render("random-beer", {beers})
    })
    .catch((err) => {
        console.error(err);
    })
  };