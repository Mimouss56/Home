import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
import axiosInstance from '../../utils/axios';

function Cv() {
  const [searchParams] = useSearchParams();
  const filterJob = searchParams.get('fj') || '';
  const [jobs, setJobs] = useState([]);
  const user = sessionStorage.getItem('user');

  axiosInstance.get('/job').then((res) => {
  });

  return (
    <>
      <div id="left" className="col-9">
        <HeaderCv />
        <Dev />
        <Xp content={emplois} titre="Autres Expériences" filter={filterJob} />
        <Xp content={etudes} titre="Formations" filter="" />
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
