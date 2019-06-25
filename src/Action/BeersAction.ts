"use strict";

import {Application, Request, Response} from "express";

import promiseGetBeers = require("../Pro/promiseGetBeers");

const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();


const BeersAction = {
   execute: async (req: Request, res: Response) => {

      console.log('iniia');


      let promise = promiseGetBeers.default();

      let beers = await  promise;

      console.log(beers);


      const data = {
         beers,
         title: "Beers"
      };

      res.render('beers', data);

   }
};


export default BeersAction;
