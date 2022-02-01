
// 1. IMPORTACIONES
const express		 = require("express")
const router		 = express.Router()
const PunkAPIWrapper = require("punkapi-javascript-wrapper")

// 2. RUTEO

router.get("/", (req, res) => {
	res.render("index")
})


/*
router.get("/beers", (req, res) => {
	res.render("beers")
})
*/

router.get("/beers", async (req, res) => {

    const punkAPI = new PunkAPIWrapper()
    const allBeers = await punkAPI.getBeers()

	res.render("beers", {
        allBeers: allBeers
    })
})

router.get("/random-beers", async (req, res) => {
    const punkAPI = new PunkAPIWrapper()
    const randomBeer = await punkAPI.getRandom()

	res.render("random-beers", {
        randomBeer: randomBeer
    })
})

// 3. EXPORTACIÓN
module.exports = router