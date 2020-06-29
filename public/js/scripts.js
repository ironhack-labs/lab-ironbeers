// All boxes same height with JQ
const  boxHeight = (string) => {
  let highestBox = 0;
  const arrEle = [...document.querySelectorAll(string)]
  
  arrEle.forEach(ele => {
    if (highestBox < ele.clientHeight) {
      highestBox = ele.clientHeight
    }
  })
  arrEle.forEach(ele => {
    ele.style.height = `${highestBox}px`
  })
}


window.onload = () => {
  boxHeight('.card-content');
}
