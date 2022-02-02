//importaciones
const express        = require("express")
const router         = express.Router()
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
//ruteo

router.get("/", (req, res) => {
	res.render("index")
})

router.get("/beers", async (req, res) => {

	const allBeers = await punkAPI.getBeers()

	
	res.render("beers", {
		allBeers: allBeers,
	})
})

// router.get("/random-beer", (req, res) => {
// 	res.render("random-beer")
// })

router.get("/random-beer", async (req, res) => {

	const randomBeer = await punkAPI.getRandom()

	
	res.render("random-beer", {
		randomBeer: randomBeer,
	})
})


//exportacion

module.exports = router