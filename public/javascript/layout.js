let currentATag = document.querySelector(`[href="${window.location.pathname}"]`)
console.log(currentATag);
currentATag.style.fontWeight = 'bold';
currentATag.style.textDecoration = 'none';
currentATag.style.color = 'black';
currentATag.style.cursor = 'auto';