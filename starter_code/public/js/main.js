window.onload = function(){

    if(document.getElementById('button-beers')) document.getElementById('button-beers').addEventListener('click', function(){
        console.log('beers');
        parent.location='/beers';
    });
    if(document.getElementById('button-random-beers')) document.getElementById('button-random-beers').addEventListener('click', function(){
        console.log('random-beers');
        parent.location='/random-beer';
    });
}