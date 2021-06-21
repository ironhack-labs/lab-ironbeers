const hbs = require('hbs');

hbs.registerPartials(`${__dirname}/../views/partials`);

//HELPERS
hbs.registerHelper('dotted', (content) => {
    const maxLength = 100;
    return content.length > maxLength ? `${content.substring(0, maxLength)}...` : content;
})

hbs.registerHelper('active', (options) => {
    const { path, match } = options.hash;
    return path === match ? 'active' : '';

    //const parameters = options.hash;
    //return parameters.path = parameters.match ? 'active' : '';
})