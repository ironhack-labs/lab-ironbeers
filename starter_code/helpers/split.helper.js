const hbs = require('hbs');

hbs.registerHelper('splitText', function(list) {
    let array = list.map(el => {
      return el.split(",");
    });
    let li = '';
    for(let i = 0; i< array.length; i++){
      li += '<li>' + array[i] + '</li>';
    }  
    return li;
});