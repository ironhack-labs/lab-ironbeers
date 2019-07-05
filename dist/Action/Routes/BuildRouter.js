"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HomeAction_1 = __importDefault(require("../HomeAction"));
const BeersAction_1 = __importDefault(require("../BeersAction"));
const RandomBeerAction_1 = __importDefault(require("../RandomBeerAction"));
function routerBuilder(app) {
    app.get("/debug", function (req, res) {
        res.send('yea baby');
    });
    app.get("/", function (req, res) {
        HomeAction_1.default.execute(req, res);
    });
    app.get("/home", function (req, res) {
        HomeAction_1.default.execute(req, res);
    });
    app.get("/beers", function (req, res) {
        BeersAction_1.default.execute(req, res);
    });
    app.get("/random-beer", function (req, res) {
        RandomBeerAction_1.default.execute(req, res);
    });
}
exports.default = routerBuilder;
//# sourceMappingURL=BuildRouter.js.map