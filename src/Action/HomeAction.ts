"use strict";

import {Application, Request, Response} from "express";


const HomeAction = {
   execute: (req: Request, res: Response) => {

      const data = {
         id_page:0,
         title:"Home"
      };

      res.render('home', data);
   }
};


export default HomeAction;
