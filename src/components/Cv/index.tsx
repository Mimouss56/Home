import HeaderCv from './Header/header';
import './style.scss';
import Xp from './Main/xp';
import Study from './Main/study';
import emplois from '../../../data/emploi.json';
import etudes from '../../../data/formation.json';
import Contact from './Info/contact';
import Skills from './Info/skills';
import Lang from './Info/lang';
import Dev from './Main/dev';
import Hobbies from './Info/hobbies';

function Cv() {
  return (
    <>
      <div id="left" className="col-8">
        <HeaderCv />
        <Dev />
        <Xp content={emplois} titre="Autres Expériences" filter="Maintenance" />
        <Xp content={etudes} titre="Formations" filter="Formation" />
      </div>
      <div id="right" className="col-4 text-white">
        <Contact />
        <Skills />
        <Lang />
        <Hobbies />
      </div>
    </>
  );
}

export default Cv;
