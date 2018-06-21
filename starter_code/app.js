const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials')

app.get('/', (req, res, next) => {
    res.render('index');
});


app.get('/beers', (req, res, next) => {

    punkAPI.getBeers()


    .then(beers => {


            res.locals.myBeers = beers;

            res.render('beers.hbs');
        })
        .catch(error => {
            console.log(error);
        })


});



// app.get('/random-beers', (req, res, next) => {
//     const theRandomBeers = Math.floor(Math.random() * punkAPI.length);

//     const.data = {

//         featured: punkAPI[theRandomBeers]
//     };


//     res.render('/randomBeers.hbs', data);
// });



app.listen(3000, () => {

    console.log("Server Started");
});