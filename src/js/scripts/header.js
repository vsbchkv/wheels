const windowHeight = document.documentElement.clientHeight;
const isMobile = document.documentElement.clientWidth < 768;
const header = document.querySelector('.header');

if (!isMobile) {
let currentScroll = document.documentElement.scrollTop;
  window.onload = () => {
    scrollIconFade(currentScroll);
  };
  window.onscroll = () => {
    let currentScroll = document.documentElement.scrollTop;
    scrollIconFade(currentScroll);
    sickyHeader(currentScroll);
  };
};

function sickyHeader(currentScroll) {
  if (currentScroll >= windowHeight) {
    const headerHeight = header.clientHeight;
    header.classList.add('header--fixed');
    header.nextSibling.style.marginTop = `${headerHeight}px`;
  } else {
    header.classList.remove('header--fixed');
    header.nextSibling.removeAttribute('style');
  }
};

function scrollIconFade(currentScroll) {
  const scrollIcon = document.querySelector('.intro__scroll');
  const sсrolledProportion = 1 - (currentScroll * 2 / 100) * 0.1.toFixed(1);
  scrollIcon.style.opacity = sсrolledProportion;
}
