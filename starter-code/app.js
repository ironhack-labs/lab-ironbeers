const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

hbs.registerPartials(path.join(__dirname, "views/partials"));

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res)=>{
   punkAPI
    .getBeers()
    .then((apiRes)=>{
        console.log(apiRes)
        res.render("beers.hbs", {
            beers: apiRes
        })
    })
    .catch((apiErr)=>{console.log(apiErr)})
})



app.get("/random-beer", (req, res)=>{
    punkAPI
        .getRandom()
        .then((apiRes)=>{
            res.render("random-beer.hbs",{
           beer:  apiRes[0]
            })       
        })
        .catch((apiErr)=>{
            console.log(apiErr)
        })
})

app.get("/beers/:id", (req, res) => {
    const id = req.params.id;
    punkAPI
        .getBeer(id)
        .then((apiRes) => {
            res.render("random-beer.hbs", {beer: apiRes[0]})
                  })
                .catch((err) => {console.log(err)})
      
    });




app.listen(3000, () => console.log('🏃‍ on port 3000'));
