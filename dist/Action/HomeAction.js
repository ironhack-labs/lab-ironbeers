"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HomeAction = {
    execute: (req, res) => {
        const data = {
            title: "Home"
        };
        res.render('home', data);
    }
};
exports.default = HomeAction;
//# sourceMappingURL=HomeAction.js.map