var express = require('express');
var router = express.Router();
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

router.get('/', function (req, res, next) {
    punkAPI.getRandom()
        .then(beer => {
            res.render('random-beers', {
                beer
            }); 
        })
        .catch(error => {
            console.log(error)
        })
});
module.exports = router;