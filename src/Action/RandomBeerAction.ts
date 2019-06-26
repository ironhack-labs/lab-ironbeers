"use strict";

import {Application, Request, Response} from "express";
import promiseGetRandomBeer = require("../Pro/promiseGetRandomBeer");



const RandomBeerAction = {
    execute: async (req: Request, res: Response) => {

        let promise = promiseGetRandomBeer.default();

        let randomBeer = await promise;

        let jsonRandomBeer : string = JSON.stringify(randomBeer);
        const data = {

            jsonRandomBeer,
            id_page:2,
            title: "Random Beer"
        };

        res.render('beer_random', data);

    }
};


export default RandomBeerAction;
