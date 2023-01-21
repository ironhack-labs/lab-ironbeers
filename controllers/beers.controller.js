const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper()

module.exports.beers = (req, res) => {
    punkAPI
        .getBeers()
        .then(beersFromApi => {
            res.render("beers", {beersFromApi});
        })
    .catch(error => console.log(error));
    
}

module.exports.randomBeer = (req, res) => {
    punkAPI
        .getRandom()
        .then(responseFromAPI => {
        console.log(responseFromAPI)
        res.render("random-beer", {beer: responseFromAPI[0]})
    })
    .catch(error => console.log(error));
}