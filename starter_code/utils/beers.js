const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

const beers = ( cb ) => {
    
    punkAPI.getBeers()
        .then( beers => {
            const result = beers.map( beer => ({
                name: beer.name, 
                tagline: beer.tagline, 
                description: beer.description,
                image_url: beer.image_url
            }));
            return cb( undefined, result );
        })
        .catch( err => cb( err, undefined ));
}

module.exports = beers;