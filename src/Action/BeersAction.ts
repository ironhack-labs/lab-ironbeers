"use strict";

import {Application, Request, Response} from "express";

import promiseGetBeers = require("../Pro/promiseGetBeers");

const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();


const BeersAction = {
   execute: async (req: Request, res: Response) => {

      let promise = promiseGetBeers.default();

      let beers = await promise;

      const data = {
         jsonBeers: JSON.stringify(beers),
         numRecords: beers.length,
         title: "Beers"
      };

      res.render('beers', data);

   }
};

export default BeersAction;
