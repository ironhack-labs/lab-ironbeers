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
const promiseGetBeers = require("../Pro/promiseGetBeers");
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
const BeersAction = {
    execute: (req, res) => __awaiter(this, void 0, void 0, function* () {
        let promise = promiseGetBeers.default();
        let beers = yield promise;
        const data = {
            jsonBeers: JSON.stringify(beers),
            numRecords: beers.length,
            title: "Beers"
        };
        res.render('beers', data);
    })
};
exports.default = BeersAction;
//# sourceMappingURL=BeersAction.js.map