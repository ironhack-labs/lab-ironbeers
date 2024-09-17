const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

module.exports.beer = (req, res) => {
    punkAPI.getBeers()
    .then((beers) => {
     console.log(beers); // para ver las cervezas en consola//
     res.render("beers", {beers})
    })
    .catch((err) => {
        console.error(err);
    })
};