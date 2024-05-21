import { useEffect, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { IHard } from '../../../@types/Home/hardSkill';
import Tags from '../../../components/Tag';
import axiosInstance from '../../../utils/axios';

function CarouselSkill() {
  const [skills, setSkills] = useState<IHard[]>([]);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axiosInstance.get('/api/home/hardskill');
        setSkills(res.data);
      } catch (err: AxiosError | unknown) {
        const { message } = err as AxiosError;

        toast.error(message);
      }
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    if (skills.length !== 0 && marqueeRef.current) {
      const marquee = marqueeRef.current;
      const marqueeContent = marquee.querySelector('.marquee-content') as HTMLUListElement;
      const tagElem = marqueeContent.childNodes[0] as HTMLLIElement;

      const marqueeElementsDisplayed = Math.floor(marquee.clientWidth / tagElem.clientWidth);
      const totalElemWidth = marquee.clientWidth / marqueeElementsDisplayed;

      for (let i = 0; i < marqueeElementsDisplayed; i += 1) {
        marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
      }

      if (!styleRef.current) {
        const style = document.createElement('style');
        style.innerHTML = `
          @keyframes scrolling {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-${totalElemWidth}px * ${skills.length})); }
          }
        `;
        document.head.appendChild(style);
        styleRef.current = style;
      }
    }

    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, [skills]);

  if (skills.length === 0) return <h1>loading...</h1>;
  return (
    <div
      className="marquee overflow-hidden position-relative mx-auto"
      ref={marqueeRef}
      style={{
        width: '75vw',
      }}
    >
      <div
        className="before position-absolute top-0 z-1 h-100 start-0 w-25 "
        style={{
          content: '""',
          // background: 'linear-gradient(to right, #111 0%, transparent 100%)',
        }}
      />
      <div
        className="after position-absolute top-0 z-1 h-100 end-0 w-25"
        style={{
          content: '""',
          // background: 'linear-gradient(to left, #111 0%, transparent 100%)',

        }}
      />
      <ul
        className="marquee-content list-unstyled h-100 d-flex"
        style={{
          animation: `scrolling ${skills.length * 3}s linear infinite`,

        }}
      >
        {skills.map((skill) => (
          <li
            key={skill.id}
            id={skill.label}
            className="d-flex justify-content-center  align-content-center flex-shrink-0 mh-100"
            style={{
              whiteSpace: 'nowrap',
              // width: marqueeRef.current?.clientWidth / marqueeRef.current?.childNodes.length,
            }}
          >
            <Tags
              icon={skill.urlIcon}
              name={skill.label}
              color={skill.color}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CarouselSkill;
