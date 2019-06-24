"use strict";

import {Application, Request, Response} from "express";


const HomeAction = {
   execute: (req: Request, res: Response) => {

      const data = {
         title:"Home"
      };

      res.render('index', data);
   }
};


export default HomeAction;
