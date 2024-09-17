const express = requiere ('express');
const router = express.Router();
const beers = require('../controllers/beers.controller')

router.get('/', beers.home)

module.exports = router;