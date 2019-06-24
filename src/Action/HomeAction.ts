"use strict";

import {Application, Request, Response} from "express";


const HomeAction = {
   execute: (req: Request, res: Response) => {
      res.send('Home');
   }
};


export default HomeAction;
