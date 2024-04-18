import { useEffect, useRef, useState } from 'react';
import { IHard } from '../../../@types/Home/hardSkill';
import Tags from '../../../components/Tag';

function CarouselSkill({ skills }: { skills: IHard[] }) {
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

    for (let i = 0; i < Number(elementDisplayed); i += 1) {
      marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
    }
  }, [skills, elementDisplayed]);
  if (!skills) return null;

  return (
    <div className="d-flex justify-content-center">
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
                // key={skill.id}
                icon={skill.urlIcon}
                name={skill.label}
                color={skill.color}
              />
            </li>
          ))}
        </ul>
        {/* <div
          id="marqueeBefore"
          className="position-absolute top-0 h-100 z-1 start-0"
          style={{
            // width: '10rem',
            content: '',
            background: 'linear-gradient(to right, #203c4f 0%, transparent 100%)',
          }}
        />
        <div
          id="marqueeAfter"
          className="position-absolute top-0 h-100 z-1 end-0"
          style={{
            // width: '10rem',
            content: '',
            background: 'linear-gradient(to left, #253e52 0%, transparent 100%)',
          }}
        /> */}

      </div>
    </div>
  );
}

export default CarouselSkill;
