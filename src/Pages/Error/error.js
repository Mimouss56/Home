document.addEventListener('DOMContentLoaded', () => {
  const errorCode = document.getElementById('error-code');
  const digit1Container = document.getElementById('digit1-container');
  const digit2Container = document.getElementById('digit2-container');
  const digit3Container = document.getElementById('digit3-container');

  errorCode.classList.add('fall');

  setTimeout(() => {
    errorCode.style.visibility = 'visible';
    digit1Container.classList.add('bounce');
    setTimeout(() => {
      digit2Container.classList.add('bounce');
      setTimeout(() => {
        digit3Container.classList.add('bounce');
      }, 800);
    }, 800);
  }, 0);
});
