import { useEffect, useRef, useState } from 'react';
import './style.scss';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';
import Tags from '../../components/Tag';
import { IHard } from '../../@types/Home/hardSkill';

function Test() {
  const [skills, setSkills] = useState<IHard[]>([]);
  const marqueeRef = useRef<HTMLDivElement>(document.querySelector('.marquee'));

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axiosInstance.get('/api/home/hardskill');
        setSkills(res.data);
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    if (skills.length !== 0 && marqueeRef.current) {
      const marquee = marqueeRef.current;
      const marqueeContent = marquee.children[2] as HTMLUListElement;
      const tagElem = marqueeContent.childNodes[0] as HTMLLIElement;

      const marqueeElementsDisplayed = Math.floor(
        marquee.clientWidth / tagElem.clientWidth,
      );
      const marqueeElemWidth = marquee.clientWidth / marqueeElementsDisplayed;

      const root = document.documentElement;

      root.style.setProperty('--marquee-elements', skills.length.toString());
      root.style.setProperty('--marquee-elements-displayed', marqueeElementsDisplayed.toString());
      root.style.setProperty('--marquee-element-width', `${marqueeElemWidth}px`);

      const translateXValue = -marqueeElemWidth * skills.length;

      for (let i = 0; i < marqueeElementsDisplayed; i += 1) {
        marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
      } // on crée le keyframe scrolling
      const style = document.createElement('style');
      style.innerHTML = `
      @keyframes scrolling {
        0% { transform: translateX(0); }
        100% { transform: translateX(calc(-1 * ${marqueeElemWidth}px * ${skills.length})); }
      }        // `;
      document.head.appendChild(style);
    }
  }, [skills]);
  if (skills.length === 0) return <h1>loading...</h1>;
  return (
    <div className="marquee" ref={marqueeRef}>
      <div
        className="before position-absolute top-0 z-1 h-100 start-0 w-25 "
        style={{
          content: '""',
          background: 'linear-gradient(to right, #111 0%, transparent 100%)',
        }}
      />
      <div
        className="after position-absolute top-0 z-1 h-100 end-0 w-25"
        style={{
          content: '""',
          background: 'linear-gradient(to left, #111 0%, transparent 100%)',

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

export default Test;
