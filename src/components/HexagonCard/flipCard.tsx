import { useEffect, useState } from 'react';
import defaultImg from '../../assets/images/finishWebsite.png';

interface FlipCardProps {
  img: string;
  widthHexa: number;
  title: string;
}

const baseUrl = import.meta.env.VITE_BASE_URL;

function FlipCard({ img, widthHexa, title }: FlipCardProps) {
  const [urlImgState, setUrlImgState] = useState('step1');

  const style = {
    hexaStyle: {
      transformStyle: 'preserve-3d' as const,
      WebkitTransitionStyle: 'preserve-3d' as const,
      transition: 'all 1s',
      WebkitTransition: 'all 1s',
      width: `${widthHexa}px`,
      // calcul pour avoir un hexagone parfait
      height: `${(widthHexa / Math.sqrt(3)) * 2}px`,

    },
    frontStyle: {
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
      className="position-relative z-1 pe-auto"
      style={style.hexaStyle}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'rotateX(180deg)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
    >
      <div className="position-absolute h-100" style={style.frontStyle}>
        <div
          className="overflow-hidden h-100 invisible "
          style={{ transform: 'rotate(120deg)' }}
        >
          <div
            className="overflow-hidden h-100"
            style={{ transform: 'rotate(-60deg)' }}
          >
            <div
              className="visible h-100"
              style={{ transform: 'rotate(-60deg)' }}
            >
              <img src={urlImgState} alt={title} className="h-100 w-100 object-fit-cover " />
            </div>
          </div>
        </div>

      </div>
      <div className="position-absolute h-100 w-100 " style={style.backStyle}>
        <div
          className="overflow-hidden h-100 invisible "
          style={{ transform: 'rotate(120deg)' }}
        >
          <div
            className="overflow-hidden h-100"
            style={{ transform: 'rotate(-60deg)' }}
          >
            <div
              className="visible h-100"
              style={{ transform: 'rotate(-60deg)' }}
            >
              <p
                className="bg-gradient bg-secondary d-flex justify-content-center align-items-center h-100 user-select-none fw-bolder"
              >
                {title}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default FlipCard;
