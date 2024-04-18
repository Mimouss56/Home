import { useEffect, useRef, useState } from 'react';
import { IHard } from '../../../@types/Home/hardSkill';
import Tags from '../../../components/Tag';

function CarouselSkill({ skills }: { skills: IHard[] }) {
  const [elementDisplayed, setElementDisplayed] = useState(5);
  const animationDuration = `${skills.length * 3}s`;

  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Calculer dynamiquement le nombre d'éléments affichés (elementDisplayed) en fonction de la largeur de défilement (marqueeWidth)
    if (marqueeRef.current) {
      const parentWidth = marqueeRef.current.clientWidth;
      const itemWidth = 50; // Largeur de chaque élément (en %)
      const totalWidth = itemWidth * skills.length;
      const displayedElements = Math.floor(parentWidth / (totalWidth / skills.length));
      setElementDisplayed(displayedElements);
    }
  }, [skills]);

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
                icon={skill.urlIcon}
                name={skill.label}
                color={skill.color}
              />
            </li>
          ))}
        </ul>
        <div
          id="marqueeBefore"
          className="position-absolute top-0 h-100 z-1 start-0"
          style={{
            width: '10rem',
            content: '',
            background: 'linear-gradient(to right, #111 0%, transparent 100%)',
          }}
        />
        <div
          id="marqueeAfter"
          className="position-absolute top-0 h-100 z-1 end-0"
          style={{
            width: '10rem',
            content: '',
            background: 'linear-gradient(to left, #111 0%, transparent 100%)',
          }}
        />
      </div>
    </div>
  );
}

export default CarouselSkill;
