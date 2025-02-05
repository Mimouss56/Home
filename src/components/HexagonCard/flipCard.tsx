import { useEffect, useState } from "react";

import defaultImg from "../../assets/images/finishWebsite.png";
import RectoFace from "./recto";
import VersoFace from "./verso";

interface FlipCardProps {
  img: string;
  widthHexa: number;
  title: string;
}

const baseUrl = import.meta.env.VITE_BASE_URL;

function FlipCard({ img, widthHexa, title }: FlipCardProps) {
  const [urlImgState, setUrlImgState] = useState("step1");

  const style = {
    hexaStyle: {
      transformStyle: "preserve-3d" as const,
      WebkitTransitionStyle: "preserve-3d" as const,
      transition: "all 1s",
      WebkitTransition: "all 1s",
      width: `${widthHexa}px`,
      // calcul pour avoir un hexagone parfait
      height: `${(widthHexa / Math.sqrt(3)) * 2}px`,
    },
    backStyle: {
      WebkitTransform: "rotateX(180deg)",
      transform: "rotateX(180deg)",
      backfaceVisibility: "hidden" as const,
      WebkitBackfaceVisibility: "hidden" as const,
    },
  };

  useEffect(() => {
    if (img.includes("http")) {
      setUrlImgState(img);
    } else if (img) {
      setUrlImgState(`${baseUrl}/images/${img}`);
    } else {
      setUrlImgState(defaultImg);
    }
  }, [img]);

  return (
    // skipcq: JS-0765
    <div
      className="position-relative z-1 pe-auto"
      style={style.hexaStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "rotateX(180deg)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
      }}>
      <RectoFace urlImgState={urlImgState} title={title} />
      <div className="position-absolute h-100 w-100 " style={style.backStyle}>
        <VersoFace title={title} />
      </div>
    </div>
  );
}

export default FlipCard;
