"use strict";

import {Application, Request, Response} from "express";


const BeerAction = {
   execute: (req: Request, res: Response) => {
      const data = {
         title:"Beer"
      };

      res.render('beer', data);
   }
};


export default BeerAction;
