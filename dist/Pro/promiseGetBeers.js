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
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
let listaBeers;
/*
* Proceso para obtener las lista de beers del serviciio, se utiliza cache para solo hacer un request
* **/
function promiseGetBeers() {
    return __awaiter(this, void 0, void 0, function* () {
        let p;
        if (listaBeers) {
            p = Promise.resolve(listaBeers);
        }
        else {
            //obtener la lista y crear cache
            p = punkAPI.getBeers()
                .then((beers) => {
                listaBeers = beers;
                return listaBeers;
            })
                .catch((error) => {
                console.log(error);
                throw error;
            });
        }
        return p;
    });
}
exports.default = promiseGetBeers;
//# sourceMappingURL=promiseGetBeers.js.map