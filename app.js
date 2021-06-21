const express = require('express');

const app = express();

//load Configurations
require('./config/hbs.config')

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));

app.use((req,res,next) => {
    res.locals.path = req.path;
    next()
})

const router = require('./config/routes.config');
app.use('/', router)

app.listen(3000, () => console.log('🏃‍ on port 3000'));
