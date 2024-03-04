import './hexagon.scss';
import { useEffect } from 'react';
import defaultImg from '../../assets/images/finish_website.jpeg';

type HexagonCardProps = {
  img?: string;
};

function HexagonCard({ img }: HexagonCardProps) {
  useEffect(() => {
    const hexagonIn2 = document.querySelector('.hexagon-in2') as HTMLElement;
    hexagonIn2.style.backgroundImage = `url(${img})`;

    // Sélectionnez les éléments spécifiques pour cette carte
    const card = hexagonIn2.closest('.hexagon') as HTMLElement;

    card.addEventListener('mouseover', () => {
      hexagonIn2.style.transform = 'rotateX(180deg)';
    });

    card.addEventListener('mouseout', () => {
      hexagonIn2.style.transform = 'rotateX(-60deg)';
    });
  }, [img]);

  return (
    <div className="hexagon">
      <div className="hexagon-in1">
        <div className="hexagon-in2">
          Lorem ipsum dolor sit amet.
        </div>
      </div>
    </div>
  );
}

HexagonCard.defaultProps = {
  img: defaultImg,
};
export default HexagonCard;
