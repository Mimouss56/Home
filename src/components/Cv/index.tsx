<<<<<<< HEAD
import { useSearchParams } from 'react-router-dom';
=======
>>>>>>> 07764e19d3de1573d3072b5886d889345b9347fe
import HeaderCv from './Header/header';
import Xp from './Main/xp';
import './style.scss';

import Contact from './Info/contact';
import Skills from './Info/skills';
import Lang from './Info/lang';
import Dev from './Main/dev';
import Hobbies from './Info/hobbies';

import emplois from '../../../data/emploi.json';
import etudes from '../../../data/formation.json';

function Cv() {
<<<<<<< HEAD
  const [searchParams] = useSearchParams();
  const filterJob = searchParams.get('fj') || '';

=======
>>>>>>> 07764e19d3de1573d3072b5886d889345b9347fe
  return (
    <>
      <div id="left" className="col-9">
        <HeaderCv />
        <Dev />
<<<<<<< HEAD
        <Xp content={emplois} titre="Autres Expériences" filter={filterJob} />
        <Xp content={etudes} titre="Formations" filter="" />
=======
        <Xp content={emplois} titre="Autres Expériences" filter="Maintenance" />
        <Xp content={etudes} titre="Formations" filter="Formation" />
>>>>>>> 07764e19d3de1573d3072b5886d889345b9347fe
      </div>
      <div id="right" className="col-3">
        <Contact />
        <Skills />
        <Lang />
        <Hobbies />
      </div>
    </>
  );
}

export default Cv;
