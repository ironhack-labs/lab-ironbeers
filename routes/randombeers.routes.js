const express = require('express');

const { renderRandomBeers } = require("../controllers/randomBeers.controller");

const router = express.Router();

router.get('/randombeers', renderRandomBeers);

module.exports = router;