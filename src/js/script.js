const openMenuBtn = document.querySelector('.main-item')
const closeMenuBtn = document.querySelector('.close-btn')
const menu = document.querySelector('.sub-menu')

function disableScrolling(){
  let x = window.scrollX;
  let y = window.scrollY;
  window.onscroll = function(){window.scrollTo(x, y);};
}

function enableScrolling(){
  window.onscroll = function(){};
}


openMenuBtn.addEventListener('click', () => {
  menu.classList.add('menu--active')
  disableScrolling();
})

closeMenuBtn.addEventListener('click', () => {
  menu.classList.remove('menu--active')
  enableScrolling();
})