const express = require("express");
const path = require("path");
const mainRoutes = require("./routes/routes");
const hbs = require("hbs");
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
const app = express();
app.use(mainRoutes);
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000, () => {
    console.log("running");
})