const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();


module.exports.list = (req, res, next) => {
    punkAPI.getBeers()
    .then(beers => res.render('beers/list', { beers, title: 'List of Beers' }))
    .catch(error => next(error));
}

module.exports.detail = (req,res,next) => {
    punkAPI.getBeer(req.params.id)
    .then( beers => { 
        const beer = beers[0];
        
        res.render('beers/detail', { beer, title: beer.name })
    })
    .catch(error => next(error))
}

/*  si se que llega array de un elemento
module.exports.detail = (req,res,next) => {
    punkAPI.getBeer(req.params.id)
    .then( ([beer]) => {
        res.render('beers/detail', { beer, title: beer.name })
    })
    .catch(error => next(error)) 
} */

module.exports.random = (req,res,next) => {
    punkAPI.getRandom()
    .then( beers => {
        const beer = beers[0];
        res.render('beers/detail', { beer, title: beer.name })
    })
    .catch(error => next(error))
}