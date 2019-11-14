const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();


exports.beersarray = async (req, res) => {
const beerscol = await punkAPI.getBeers()
    res.render("beers", {beerscol})
}

exports.randombeer = async (req, res) => {
    const rbeer = await punkAPI.getRandom()
        res.render("random", rbeer)
    }