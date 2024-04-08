import { useEffect } from 'react';
import { IHard } from '../../../@types/Home/hardSkill';
import Tags from '../../../components/Tag';
import useFetchData from '../../../hook/useFetchData';
import './style.scss';

function CarouselTest() {
  const [dataSkill] = useFetchData('/api/home/hardskill');
  const skills = dataSkill as IHard[];

  const cellHeight = 200;
  const cellSize = cellHeight;
  const cellCount = skills.length;

  const radius = Math.round((cellSize / 2) / Math.tan(Math.PI / cellCount));
  const theta = 360 / cellCount;

  const selectedIndex = 0;

  useEffect(() => {
    const carousel = document.querySelector('.carousel__list') as HTMLElement;
    const cells = carousel.querySelectorAll('.carousel__cell') as NodeListOf<HTMLElement>;
    for (let i = 0; i < cells.length; i += 1) {
      const cell = cells[i];
      const cellAngle = theta * i;
      cell.style.transform = `rotateX(${-cellAngle}deg) translateZ(${radius}px)`;
    }

    const angle = theta * selectedIndex * -1;
    carousel.style.transform = `translateZ(${-radius}px) rotateX(${-angle}deg)`;

    const cellIndex = selectedIndex < 0
      ? (cellCount - ((selectedIndex * -1) % cellCount)) : (selectedIndex % cellCount);
    cells.forEach((cell, index) => {
      if (cellIndex === index) {
        if (!cell.classList.contains('selected')) cell.classList.add('selected');
      } else if (cell.classList.contains('selected')) {
        cell.classList.remove('selected');
      }
    });
  }, [radius, selectedIndex, theta, cellCount]);

  return (
    <div className="d-flex justify-content-center ">
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
