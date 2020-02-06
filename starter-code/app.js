const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

let beersArray = [];

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// add the routes here:
app.get('/', (req, res) => res.render('index'));
app.get("/beers", (req, res, next) => {
    punkAPI
    .getBeers()
    .then(beersFromApi => {
            const data = {
                beers: beersFromApi
            }
            res.render("beers", data);
        })
    .catch(error => console.log(error));
});

app.get("/random-beer", (req, res, next) => {
    punkAPI
    .getRandom()
    .then(responseFromApi => {
            console.log(responseFromApi);
            res.render("random-beer", responseFromApi[0]);
        })
    .catch(error => console.log(error));
});

app.get('/beers/:beerId',(req, res)=>{
    // console.log(req.params); gives beerId: '6'
    // console.log(req.params.beerId); gives '6'

    const beerId = req.params.beerId;
    punkAPI
    .getBeer(beerId)
    .then(getOneValue =>{
        console.log(getOneValue);
        const data = {
            singleBeer = getOneValue[0]
        }
    })
    .catch(error => console.log(error));

})
app.listen(3000, () => console.log('🏃‍ on port 3000'));
