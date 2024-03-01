const express = require('express')
const misc = require('../controllers/misc.controller')
const beers = require('../controllers/beers.controller')
const router = express.Router()

router.get('/', misc.home)
router.get('/beers', beers.list)
router.get('/beers/random', beers.list)
router.get('/beers/:id', beers.detail)

module.exports = router