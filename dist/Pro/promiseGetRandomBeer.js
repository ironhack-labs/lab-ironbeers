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
/*
* Proceso para obtener random beer
* **/
function promiseGetRandomBeer() {
    return __awaiter(this, void 0, void 0, function* () {
        const p = punkAPI.getRandom()
            .then((lista) => {
            return lista[0];
        })
            .catch((error) => {
            console.log(error);
            throw error;
        });
        return p;
    });
}
exports.default = promiseGetRandomBeer;
//# sourceMappingURL=promiseGetRandomBeer.js.map