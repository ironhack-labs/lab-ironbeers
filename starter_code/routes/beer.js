const express = require('express');
const router = express.Router();
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();



/*get beer page*/

router.get('/', (req, res, next) => {

    punkAPI.getBeers()
        .then(beers => {
            const data = {
                beers
            }
            res.render('beers', data);
        })
        .catch(error => {
            console.log(error)
        })    
})

module.exports = router;