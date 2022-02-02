// ./routes/index.js

// 1. IMPORTACIONES
const express		= require("express")
const async = require("hbs/lib/async")
const router		= express.Router()
const PunkAPIWrapper = require("punkapi-javascript-wrapper")


// 2. RUTEO
router.get("/", (req, res) => {
	res.render("index")
})

router.get("/beers", async (req, res) => {
    const punkAPI = new PunkAPIWrapper()
    const allBeers = await punkAPI.getBeers()
    
	res.render("beers", {
        allBeers: allBeers
    })
})

router.get("/beers/:id", async (req, res) => {
    const id =req.params.id
    const punkAPI = new PunkAPIWrapper()
    const selectedProduct = await punkAPI.getBeer(id)
    
	res.render("beers", {
        allBeers: selectedProduct
    })
})

router.get("/random-beer", async(req, res) => {
    const punkAPI = new PunkAPIWrapper()
    const randomBeer = await punkAPI.getRandom()
    
	res.render("random-beer",{
        randomBeer: randomBeer
    })
})



// 3. EXPORTACIÓN
module.exports = router