import { useEffect } from 'react';
import { IHard } from '../../../@types/Home/hardSkill';
import Tags from '../../../components/Tag';
// import './style.scss';

const marqueeWidth = 50;
const marqueeHeight = 10;
const displayedElements = 5;

function CarouselSkill({ skills }: { skills: IHard[] }) {
  // animation keyframes
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `@keyframes scrolling {
      0% { transform: translateX(0); }
      100% { transform: translateX(${-1 * (marqueeWidth / displayedElements) * skills.length}vw); }
    }`;
    document.head.appendChild(style);
  }, [skills]);

  if (!skills) return null;

  return (
    <div className="d-flex justify-content-center">
      <div
        id="marquee"
        className="text-white bg-transparent overflow-hidden position-relative"
        style={{
          // minInlineSize: '100%',
          width: `${marqueeWidth}vw`,
          height: `${marqueeHeight}vh`,
        }}
      >
        <div
          id="marquee__before"
          className="position-absolute top-0 h-100 z-1 start-0 "
          style={{
            // background: 'linear-gradient(to right, #111 0%, transparent 100%)',
            content: '',
            width: '10rem',
          }}
        />
        <ul
          id="marquee-content"
          onMouseEnter={(e) => { e.currentTarget.style.animationPlayState = 'paused'; }}
          onMouseLeave={(e) => { e.currentTarget.style.animationPlayState = 'running'; }}
          className="list-unstyled h-100 d-flex my-auto align-items-center justify-content-center"
          style={{
            animation: `scrolling ${skills.length * 3}s linear infinite`,
          }}
        >
          {skills && skills.filter((skill) => skill.stack === 'back').map((skill) => (
            <li
              key={skill.id}
              style={{ width: `${marqueeWidth / displayedElements}vw` }}
              className="d-flex justify-content-center align-items-center flex-shrink-0 mh-100 text-nowrap"
              id={skill.label}
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
        <div
          id="marquee__after"
          className="position-absolute top-0 h-100 z-1 end-0 "
          style={{
            // background: 'linear-gradient(to left, #111 0%, transparent 100%)',
            content: '',
            width: '10rem',
          }}
        />
      </div>
    </div>
  );
}

export default CarouselSkill;
