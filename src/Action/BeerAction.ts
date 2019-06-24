"use strict";

import {Application, Request, Response} from "express";


const BeerAction = {
   execute: (req: Request, res: Response) => {
      res.send('Beer');
   }
};


export default BeerAction;
