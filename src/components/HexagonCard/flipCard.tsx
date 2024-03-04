import { useEffect, useState } from 'react';
import defaultImg from '../../assets/images/finish_website.jpeg';
import HexagonCard from './hexagonCard';
import { baseUrl } from '../../../config.json';

function FlipCard({ img }: { img: string }) {
  const [urlImgState, setUrlImgState] = useState('');

  const [isHovered, setIsHovered] = useState(false);
  const style = {
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

  useEffect(() => {
    if (img && img.includes('http')) {
      setUrlImgState(img);
    } else if (img) {
      setUrlImgState(`${baseUrl}/images/${img}`);
    } else {
      setUrlImgState(defaultImg);
    }
  }, [img]);

  return (
    <div
      className="pe-auto m-1"
      style={{
        width: '200px',
        height: '500px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="position-relative h-100 w-100 z-1 " style={style.hexaStyle}>
        <div className="position-absolute bg-transparent" style={style.hexaDivStyle}>
          <HexagonCard>
            <img
              src={urlImgState}
              alt="default"
              className="h-100 w-100 object-fit-cover"
            />
          </HexagonCard>

        </div>
        <div
          className="position-absolute bg-transparent h-100 w-100"
          style={style.backStyle}
        >
          <HexagonCard>
            <span
              className="bg-white d-flex justify-content-center align-items-center h-100 w-100 user-select-none pe-auto "
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
