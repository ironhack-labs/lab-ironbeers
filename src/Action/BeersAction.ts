"use strict";

import {Application, Request, Response} from "express";


const BeersAction = {
   execute: (req: Request, res: Response) => {
      const data = {
         title:"Beers"
      };

      res.render('beers', data);
   }
};


export default BeersAction;
