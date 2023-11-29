import HeaderCv from './PDF/Header/header';
import Hobbies from './PDF/Info/hobbies';
import Contact from './PDF/Info/contact';
import Skills from './PDF/Info/skills';
import Lang from './PDF/Info/lang';
import Xp from './PDF/Main/xp';
import Dev from './PDF/Main/dev';
import { IEmploi } from '../../@types/Home/emploi';

interface Props { listJob: IEmploi[], listSchool: IEmploi[] }

export default function Cv({ listJob, listSchool }: Props) {
  const style = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between',
    marginTop: '16px',
    marginBottom: '16px',
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
  };
  const styleLeft = {
    border: '1px solid #ccc',
    backgroundColor: '#ffffff',
    borderStartStartRadius: '45px',
    borderEndStartRadius: '45px',
    width: '70%',
    maxWidth: '70%',
  };
  const styleRight = {
    border: '1px solid #ce6b01',
    backgroundColor: '#ce6b01',
    borderStartEndRadius: '45px',
    borderEndEndRadius: '45px',
    width: '30%',
    maxWidth: '30%',
  };

  return (
    <div style={style}>
      <div style={styleLeft}>
        <HeaderCv />
        <Dev />
        <Xp content={listJob} titre="Autres Expériences" />
        <Xp content={listSchool} titre="Formations" />
      </div>
      <div style={styleRight}>

        <Contact />
        <Skills />
        <Lang />
        <Hobbies />
      </div>
    </div>
  );
}
