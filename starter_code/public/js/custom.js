let pathName = document.location.pathname;
let navButton = document.getElementsByClassName('nav-item');
let navLink = document.getElementsByClassName('nav-link');

for (let i = 0; i < navLink.length; i++) {
    let navIndex = navLink[i].getAttribute('href');
    
    if (navIndex === pathName) navButton[i].className += ' active'; 
}




