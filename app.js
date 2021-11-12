const express = require("express")

const hbs = require("hbs")
const path = require("path")
const PunkAPIWrapper = require("punkapi-javascript-wrapper")

const app = express()
const punkAPI = new PunkAPIWrapper()

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, "public")))

// Register the location for handlebars partials here:

// ...
hbs.registerPartials(__dirname + "/views/partials")

// Add the route handlers here:

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/beers", (req, res) => {
    punkAPI
        .getBeers()
        .then(beersFromApi => res.render("beers", { allBeers: beersFromApi }))
        .catch(error => console.log(error))
})

app.get("/random-beer", (req, res) => {
    // res.render("random-beer")
    punkAPI
        .getRandom()
        .then(randomBeer => res.render("random-beer", { randomBeer }))
        .catch(error => console.log(error))
})

app.get("/beers/:id", (req, res) => {
    // const filteredBeer = punkAPI.getBeer(beer => {
    //     return beer.id === req.params.id
    // })

    // res.render("beer", { filteredBeer })
    punkAPI
        .getBeer(req.params.id)
        .then(beer => res.render("beer", { beer }))
        .catch(err => console.log(err))
})

app.listen(3000, () => console.log("🏃‍ on port 3000"))
