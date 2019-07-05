'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BuildRouter_1 = __importDefault(require("./Action/Routes/BuildRouter"));
const express = require('express');
const app = express();
app.use(express.static('public'));
const path = require('path');
app.use(express.static(path.join(__dirname, '../public')));
const pathViews = path.join(__dirname, '../views');
app.set('views', pathViews);
app.set('view engine', 'hbs');
const hbs = require('hbs');
hbs.registerHelper('vue-js', function (options) {
    return options.fn();
});
BuildRouter_1.default(app);
const port = 3006;
app.listen(port, () => console.log(`app on port ${port}!`));
//# sourceMappingURL=server.js.map