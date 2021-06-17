const express = require('express');

const path = require('path');

const app = express();


require('./config/hbs.config')

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
    res.locals.path =req.path;
    next()
});

app.use(express.static(path.join(__dirname, 'public')));



// Add the route handlers here:
const router = require('./config/routes.config')

app.use('/', router)

app.listen(3000, () => console.log('🏃‍ on port 3000'));
