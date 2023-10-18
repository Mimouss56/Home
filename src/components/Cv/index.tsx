import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MoussID } from '../../../config.json';
import axiosInstance from '../../utils/axios';

import HeaderCv from './Header/header';
import Hobbies from './Info/hobbies';
import Contact from './Info/contact';
import Skills from './Info/skills';
import Lang from './Info/lang';
import Xp from './Main/xp';
import Dev from './Main/dev';
import Selected from './Select';
import './style.scss';

function Cv() {
  const [searchParams] = useSearchParams();
  const filterJob = searchParams.get('fj') || '';

  const [filteredJob, setFilteredJob] = useState(filterJob);
  const [listJob, setListJob] = useState([]);
  const [listSchool, setListSchool] = useState([]);
  const [skills, setSkills] = useState([]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetJob = e.target.id;
    let textSearch = '';
    const valueSelected = e.target.options[e.target.selectedIndex].value;

    if (targetJob === 'jobSkill') {
      textSearch = 'fj';
      setFilteredJob(valueSelected);
    }
    const url = new URL(window.location.href);
    url.searchParams.set(textSearch, valueSelected);
    window.history.pushState({}, '', url.toString());
  };
  // Chargement des Skills pour le select
  const fetchDataSkills = async () => {
    const response = await axiosInstance.get('/skill');
    setSkills(response.data);
  };
  const fetchDataJobMouss = async () => {
    const response = await axiosInstance.get(`/user/${MoussID}`);

    setListSchool(response.data.user.school);
    setListJob(response.data.user.job);
  };
  useEffect(() => {
    fetchDataJobMouss();
    fetchDataSkills();
    setFilteredJob(filterJob);
  }, [
    filterJob,
  ]);
  return (
    <div className="d-flex flex-column ">
      {
        !searchParams.get('fj') && (
          <Selected skills={skills} onHandleSelect={handleChange} />
        )
      }
      <div className="d-flex flex-row">
        <div id="left" className="col-9">
          <HeaderCv />
          <Dev />
          <Xp content={listJob} titre="Autres Expériences" filter={filteredJob} />
          <Xp content={listSchool} titre="Formations" filter="" />
        </div>
        <div id="right" className="col-3">
          <Contact />
          <Skills />
          <Lang />
          <Hobbies />
        </div>

      </div>
    </div>
  );
}

export default Cv;
