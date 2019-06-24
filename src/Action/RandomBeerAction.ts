"use strict";

import {Application, Request, Response} from "express";


const RandomBeerAction = {
   execute: (req: Request, res: Response) => {
      res.send('Random');
   }
};


export default RandomBeerAction;
