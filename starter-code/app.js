const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
hbs.registerPartials(path.join(__dirname, 'views/partials'))




const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
    
    punkAPI.getBeers()
    .then(beersFromApi => {
        console.log(beersFromApi)
        const apiBeers = beersFromApi
        res.render('beers', {beers : apiBeers })
    })
    .catch(err => console.log(`failed passing the beers to the beers endpoint with ${err}`))
    
});

app.get('/random-beers', (req, res) => {


    punkAPI.getRandom()
    .then(beersFromApi => {
        
        console.log(beersFromApi[0])

        res.render("random-beers", {randomBeer : beersFromApi[0]})
        
    })

})


// app.get(`/num`, (req, res) => {


//     punkAPI.getBeer(num)
//     .then(beersFromApi => {
        
//         console.log(beersFromApi)

//         res.render("random-beers", {randomBeer : beersFromApi})
        
//     })

// })




app.listen(3000, () => console.log('🏃‍ on port 3000'))
