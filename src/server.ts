'use strict';

import {Application, Request, Response} from "express";


const express = require('express');
const app: Application = express();


const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.get("/debug", function (req: Request, res: Response) {
   res.send('yea baby');
});

const port: number = 3006;
app.listen(port, () => console.log(`app  on port ${port}!`));
