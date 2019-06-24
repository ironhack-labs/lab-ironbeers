import {Application, Request, Response} from "express";
import HomeAction from "../HomeAction";
import BeerAction from "../BeerAction";
import RandomBeerAction from "../RandomBeerAction";

function routerBuilder(app : Application ){

   app.get("/debug", function (req: Request, res: Response) {
      res.send('yea baby');
   });


   app.get("/", function (req: Request, res: Response) {
      HomeAction.execute(req,res);
   });

   app.get("/home", function (req: Request, res: Response) {
      HomeAction.execute(req,res);
   });

   app.get("/beer", function (req: Request, res: Response) {
      BeerAction.execute(req,res);
   });

   app.get("/random-beer", function (req: Request, res: Response) {
      RandomBeerAction.execute(req,res);
   });
}


export default routerBuilder;
