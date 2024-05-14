import { useEffect, useRef, useState } from 'react';
import { IHard } from '../../../@types/Home/hardSkill';
import Tags from '../../../components/Tag';
import useFetchData from '../../../hook/useFetchData';

function CarouselSkill() {
  const [dataHardSkills] = useFetchData('/api/home/hardskill');

  const skills = dataHardSkills as IHard[];
  const [elementDisplayed, setElementDisplayed] = useState(1);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const marqueeWidth = 50;
  const animationDuration = `${skills.length * 3}s`;

  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes scrolling {
      0% { transform: translateX(0); }
      100% { transform: translateX(${-1 * (marqueeWidth / elementDisplayed) * skills.length}vw); }
    }
  `;
  document.head.appendChild(style);

  useEffect(() => {
    if (marqueeRef.current) {
      const parentWidth = marqueeRef.current.clientWidth;

      const itemWidth = 100; // Largeur de chaque élément (en %)
      const displayedElements = Math.floor(parentWidth / itemWidth);
      setElementDisplayed(displayedElements);
    }
    const marqueeContent = document.querySelector('ul#marquee-content') as HTMLUListElement;

    if (marqueeContent && marqueeContent.children && marqueeContent.children.length > 0) {
      for (let i = 0; i < Number(elementDisplayed); i += 1) {
        marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
      }
    }
  }, [skills, elementDisplayed]);

  return (
    <div className="d-flex justify-content-center mb-5">
      <div
        className="overflow-hidden position-relative"
        id="marquee"
        style={{ width: '50vw' }}
        ref={marqueeRef}
      >
        <ul
          className="list-unstyled h-100 d-flex "
          id="marquee-content"
          style={{
            animationName: 'scrolling',
            animationDuration,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
          }}
        >
          {skills.map((skill) => (
            <li
              key={skill.id}
              id={skill.label}
              className="d-flex justify-content-center align-items-center flex-shrink-0 text-nowrap mh-100"
              style={{ width: `${100 / elementDisplayed}%` }}
            >
              <Tags
                icon={skill.urlIcon}
                name={skill.label}
                color={skill.color}
              />
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default CarouselSkill;
