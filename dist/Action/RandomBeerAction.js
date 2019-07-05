"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const promiseGetRandomBeer = require("../Pro/promiseGetRandomBeer");
const RandomBeerAction = {
    execute: (req, res) => __awaiter(this, void 0, void 0, function* () {
        let promise = promiseGetRandomBeer.default();
        let randomBeer = yield promise;
        let jsonRandomBeer = JSON.stringify(randomBeer);
        const data = {
            jsonRandomBeer,
            title: "Random Beer"
        };
        res.render('beer_random', data);
    })
};
exports.default = RandomBeerAction;
//# sourceMappingURL=RandomBeerAction.js.map