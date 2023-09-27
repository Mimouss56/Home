import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import HeaderCv from './Header/header';
import './style.scss';
import { MoussID } from '../../../config.json';

import Xp from './Main/xp';
import Contact from './Info/contact';
import Skills from './Info/skills';
import Lang from './Info/lang';
import Dev from './Main/dev';
import Hobbies from './Info/hobbies';
import Selected from './Select';

import { Role, User } from '../../@types/user';
import { Job } from '../../@types/emploi';
import axiosInstance from '../../utils/axios';

const initUser: User = {
  id: 0,
  username: '',
  role: {} as Role,
  school: [] as Job[],
  email: '',
  job: [] as Job[],
  child: false,
  sanction: [],

};

function Cv() {
  const [searchParams] = useSearchParams();
  const filterJob = searchParams.get('fj') || '';
  const filterschool = searchParams.get('fs') || '';
  const [filteredJob, setFilteredJob] = useState(filterJob);
  const [filteredSchool, setFilteredSchool] = useState(filterschool);
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
    if (targetJob === 'schoolSkill') {
      textSearch = 'fs';
      setFilteredSchool(valueSelected);
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
    setListSchool(response.data.school);
    setListJob(response.data.job);
    console.log(response);
  };
  useEffect(() => {
    fetchDataSkills();
    fetchDataJobMouss();
    setFilteredJob(filterJob);
  }, [filterJob]);

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
