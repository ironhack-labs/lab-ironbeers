const express		= require("express")
const router		= express.Router()

const PunkAPIWrapper = require("punkapi-javascript-wrapper")

router.get("/", (req, res) => {
	res.render("index")
})

router.get("/beers", async (req, res) => {

	const punkAPI = new PunkAPIWrapper()
		const allBeers 		= await punkAPI.getBeers()
		
		res.render("beers", {
		allBeers: allBeers
	})
})


router.get("/random-beer", async (req, res) => {
  
	const punkAPI = new PunkAPIWrapper()
    const randomBeer 	= await punkAPI.getRandom()
		
		res.render("random-beer", {
        randomBeer: randomBeer,
	})
})




module.exports = router