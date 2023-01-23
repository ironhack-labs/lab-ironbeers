const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();


module.exports.detail = (req, res) => {
    punkAPI
        .getBeer(req.params.id)
        .then((responseFromAPI) => {
        res.render('random-beer', {beer: responseFromAPI[0]})
        })
        .catch(error => console.log(error));
    }