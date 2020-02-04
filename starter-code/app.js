const express = require('express');
const PORT = 3000;

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("./public")); // rock solid syntax
app.set("views", "./views");
app.set("view engine", "hbs"); 

app.use(express.urlencoded({extended: false}));
app.use(express.json())
// add the partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get("/beer/:id", (req, res ) => {            
    const data = {
        montruc : "Franck Treboit - atomisation.net - images",
        css: ["beer.css"] ,
        js: ["beer.js"] ,
    };   
    punkAPI
      .getBeer(Number(req.params.id))
      .then(oneBeerRet => {
        res.render("onebeer", {
            beersFromApi: oneBeerRet, myPart : "myPart.hbs", data : data
        });
    })
       
    .catch(dbErr => {
      console.log("OH NO ! Database error", dbErr);
    });
});

app.get("/beers", (req, res ) => {
    const data = {
        montruc : "Franck Treboit - atomisation.net - images",
        css: ["beers.css"] ,
        js: ["beers.js"] ,
    };       
    punkAPI
      .getBeers()
      .then(dbResults => {
        console.log("OH yes database", dbResults);
        res.render("beers", {
            beersFromApi: dbResults, myPart : "myPart.hbs", data : data
        });
    })
    .catch(dbErr => {
      console.log("OH NO ! Database error", dbErr);
    });
});


app.get("/randombeers", (req, res ) => {     
    const data = {
        montruc : "Franck Treboit - atomisation.net - images",
        css: ["random.css"] ,
        js: ["random.js"] ,
    };     
    punkAPI
      .getRandom()
      .then(dbResults => {
        console.log("OH yes database", dbResults);
        res.render("random", {
            beersFromApi: dbResults, myPart : "myPart.hbs", data : data
        });
    })
    .catch(dbErr => {
      console.log("OH NO ! Database error", dbErr);
    });

});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
