"use strict";

import {Application, Request, Response} from "express";


const RandomBeerAction = {
   execute: (req: Request, res: Response) => {

      const data = {
         title:"Random Beer"
      };

      res.render('beer_random', data);

   }
};


export default RandomBeerAction;
