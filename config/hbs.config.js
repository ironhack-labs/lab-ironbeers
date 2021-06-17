const hbs = require('hbs');
const path = require('path');


hbs.registerPartials(path.join(__dirname, '../views/partials'))

hbs.registerHelper('dotted', (content,length) => {
    return content.length > length ? `${content.substring(0, length)}...`: content;

})

hbs.registerHelper('active',(options) => {
    const { path, match } = options.hash;
    return path === match ? 'active' : '' ;
})