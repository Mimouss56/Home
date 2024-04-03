import { useEffect } from 'react';

export default function useScrollSection(idName: string) {
  useEffect(() => {
    const scrollFunction = () => {
      const allSections = document.querySelectorAll('section') as NodeListOf<HTMLElement>;
      // on find l'index de la section qui a l'id skill dans la liste de toutes les sections)))
      const index = Array.from(allSections).findIndex((section) => section.id === idName);
      // on récupère la section qui suit la section skill
      const skillSection = allSections[index];
      const nextSection = allSections[index + 1] || allSections[index];
      const sectionElement = document.querySelector(`#${idName}`) as HTMLElement;
      const sticky = skillSection.offsetTop;
      const nextSticky = nextSection.offsetTop;
      const header = document.querySelector(`#${idName}-header`) as HTMLElement;
      if (window.scrollY > sticky - 61) {
        header.classList.add('fixed-top');
        header.style.top = '60px';
        sectionElement.style.marginTop = '60px';
      }
      if (window.scrollY < sticky - 61 || window.scrollY >= nextSticky - 1) {
        header.classList.remove('fixed-top');
        header.style.top = '0';
        sectionElement.style.marginTop = '0';
      }
    };

    window.addEventListener('scroll', scrollFunction);
    return () => {
      window.removeEventListener('scroll', () => { });
    };
  }, [idName]);
}
