import { useEffect } from 'react';

export default function useScrollSection(idName: string) {
  useEffect(() => {
    const scrollFunction = () => {
      const allSections = document.querySelectorAll('section') as NodeListOf<HTMLElement>;

      const index = Array.from(allSections).findIndex((section) => section.id === idName);
      const mainSection = allSections[index];
      const nextSection = allSections[index + 1] || allSections[index];
      const sticky = mainSection.offsetTop;

      const nextSticky = nextSection.offsetTop;
      const header = document.querySelector(`#${idName}-header`) as HTMLElement;
      const nextElementSibling = header.nextElementSibling as HTMLElement;

      if (window.scrollY >= sticky - 61) {
        header.classList.add('fixed-top');
        header.classList.remove('mb-5');
        header.style.top = '60px';
        nextElementSibling.style.paddingTop = '122px';
      }
      if (window.scrollY < sticky - 61 || window.scrollY > nextSticky - 1) {
        header.classList.remove('fixed-top');
        header.style.top = '0';
        nextElementSibling.style.paddingTop = '0';
      }
    };

    window.addEventListener('scroll', scrollFunction);
    return () => {
      window.removeEventListener('scroll', scrollFunction);
    };
  }, [idName]);
}
