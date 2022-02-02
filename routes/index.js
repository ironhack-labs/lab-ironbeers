//importaciones
const express        = require("express")
const router         = express.Router()
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
//ruteo

router.get("/", (req, res) => {
	res.render("index")
})

// router.get("/beers", (req, res) => {
// 	res.render("beers")
// })

router.get("/beers", async (req, res) => {

	const allBeers = await punkAPI.getBeers()

	
	res.render("beers", {
		allBeers: allBeers,
	})
})

router.get("/random-beer", (req, res) => {
	res.render("random-beer")
})

//exportacion

module.exports = router