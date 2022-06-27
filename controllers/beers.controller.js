const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

module.exports.index = (req, res) => {
    res.render('index');
};

module.exports.list = (req, res) => {
    punkAPI
        .getBeers()
        .then(beers => res.render('beers', { beers }))
        .catch(error => console.log(error));
};


module.exports.random = (req, res) => {
    punkAPI
        .getRandom()
        .then(beer => res.render('random-beer', {beer: beer[0]}))
        .catch(error => console.log(error));
};

module.exports.beer = (req, res) => {
    punkAPI
        .getBeer(req.params.id)
        .then(beer => res.render('random-beer', {beer: beer[0]}))
        .catch(error => console.log(error));
}