import { useEffect } from 'react';
import { IHard } from '../../../@types/Home/hardSkill';
import Tags from '../../../components/Tag';
import useFetchData from '../../../hook/useFetchData';
import './style.scss';

function CarouselTest() {
  const [dataSkill] = useFetchData('/api/home/hardskill');
  const skills = dataSkill as IHard[];

  const root = document.documentElement;
  const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue('--marquee-elements-displayed');
  const marqueeContent = document.querySelector('ul.marquee-content') as HTMLElement;

  // root.style.setProperty('--marquee-elements', marqueeContent.children.length);

  for (let i = 0; i < marqueeElementsDisplayed.length; i += 1) {
    marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
  }

  return (
    <div className="d-flex justify-content-center vh-100">
      <div className="marquee">
        <ul className="marquee-content">
          {skills && skills.map((skill) => (
            <li
              key={skill.id}
              className="carousel__cell"
            >
              <Tags
                key={skill.id}
                icon={skill.urlIcon}
                name={skill.label}
                color={skill.color}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="carousel__scene">
        <ol className="carousel__list">
          {dataSkill && dataSkill.map((skill: IHard) => (
            <li
              key={skill.id}
              className="carousel__cell"
            >
              <Tags
                key={skill.id}
                icon={skill.urlIcon}
                name={skill.label}
                color={skill.color}
              />
            </li>
          ))}

        </ol>
      </div>
    </div>
  );
}

export default CarouselTest;
