'use strict';

import {Application, Request, Response} from "express";

import HomeAction from "./Action/HomeAction";
import homeAction from "./Action/HomeAction";
import BeerAction from "./Action/BeerAction";
import RandomBeerAction from "./Action/RandomBeerAction";


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


app.get("/", function (req: Request, res: Response) {
   HomeAction.execute(req,res);
});

app.get("/beer", function (req: Request, res: Response) {
   BeerAction.execute(req,res);
});

app.get("/random-beer", function (req: Request, res: Response) {
   RandomBeerAction.execute(req,res);
});



const port: number = 3006;
app.listen(port, () => console.log(`app on port ${port}!`));
