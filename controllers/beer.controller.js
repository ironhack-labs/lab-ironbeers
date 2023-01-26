const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

module.exports.list = (req, res) => {
    punkAPI.getBeers()
        .then(beersFromApi => {
            res.render('beers', { beers: beersFromApi })
        })
        .catch(error => console.log(error));
}; 

module.exports.random = (req, res) => {
    punkAPI.getRandom()
        .then(responseFromAPI => {
            console.log('Random Beer: ', responseFromAPI);
            res.render('random-beer', { beer: responseFromAPI[0] })
        })
        .catch(error => console.log(error));
}

module.exports.specific = (req, res) => {
    punkAPI.getBeer(req.params.id)
        .then(responseFromAPI => {
            console.log('Beer: ', responseFromAPI);
            res.render('specific-beer', {beer: responseFromAPI[0]});
        })
        .catch(error => console.log(error));
}; 