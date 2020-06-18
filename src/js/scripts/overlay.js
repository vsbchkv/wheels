const overlay = document.getElementsByClassName('overlay')[0];
const intro = document.getElementsByClassName('intro')[0];
const menuBtn = document.querySelectorAll('.menu-btn');
const body = document.getElementsByTagName('body')[0];

menuBtn.forEach((el) => {
  el.addEventListener('click', overlayToggler);
});

document.addEventListener('keyup', (event) => {
  if (event.keyCode == 27) {
    closeOverlay()
  };
});

function overlayToggler() { 
  const isActive = document.body.contains(document.querySelector('.menu-btn--active'));
  isActive ? closeOverlay() : openOverlay();
};

function openOverlay() {
  overlay.classList.add('overlay--active');
  overlay.classList.remove('overlay--disabled');
  intro.classList.add('intro--disabled');
  body.style.overflowY = 'hidden';
  menuBtn.forEach((el) => {
    el.classList.add('menu-btn--active');
  });
};

function closeOverlay() {
  overlay.classList.remove('overlay--active');
  intro.classList.remove('intro--disabled');
  body.removeAttribute('style');
  menuBtn.forEach((el) => {
    el.classList.remove('menu-btn--active');
  });
  setTimeout(() => {
    overlay.classList.add('overlay--disabled');
  }, 300);
};
