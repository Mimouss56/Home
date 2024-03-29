// Import our custom CSS
import '../scss/styles.scss';

const scrollCallBack = () => {
  const nav = document.querySelector('nav');
  const sticky = nav?.offsetTop;
  if (sticky !== null && window.scrollY > sticky) {
    nav?.classList.add('fixed-top');
  } else {
    nav?.classList.remove('fixed-top');
  }
};
window.addEventListener('scroll', scrollCallBack);
