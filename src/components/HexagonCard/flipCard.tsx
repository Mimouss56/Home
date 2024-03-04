import './flipCard.scss';
import { useState } from 'react';
import defaultImg from '../../assets/images/finish_website.jpeg';
import HexagonCard from '.';

function FlipCard() {
  const [isHovered, setIsHovered] = useState(false);
  const style = {
    parentStyle: {
      width: '300px',
      height: '150px',
    },
    hexaStyle: {
      transformStyle: 'preserve-3d' as const,
      WebkitTransitionStyle: 'preserve-3d' as const,
      transition: 'all 1s',
      WebkitTransition: 'all 1s',
      transform: isHovered ? 'rotateX(180deg)' : 'none',
      WebkitTransform: isHovered ? 'rotateX(180deg)' : 'none',
    },
    hexaDivStyle: {
      height: '100%',
      width: '100%',
      backfaceVisibility: 'hidden' as const,
      WebkitBackfaceVisibility: 'hidden' as const,
    },
    backStyle: {
      WebkitTransform: 'rotateX(180deg)',
      transform: 'rotateX(180deg)',
      backfaceVisibility: 'hidden' as const,
      WebkitBackfaceVisibility: 'hidden' as const,
    },

  };
  return (
    <div
      className="pe-auto my-1"
      style={style.parentStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="hexa position-relative h-100 w-100 z-1 " style={style.hexaStyle}>
        <div className="position-absolute bg-transparent" style={style.hexaDivStyle}>
          <HexagonCard>
            <img
              src={defaultImg}
              alt="default"
              className="h-100 w-100 object-fit-cover"
            />
          </HexagonCard>

        </div>
        <div className="position-absolute bg-transparent h-100 w-100" style={style.backStyle}>
          <HexagonCard>
            <span
              className="bg-white d-flex justify-content-center align-items-center h-100 w-100"
            >
              voir plus ...
            </span>

          </HexagonCard>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
