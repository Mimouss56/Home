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
import { IEmploi } from '../../@types/Home/emploi';
import './style.scss';

function Cv() {
  const [searchParams] = useSearchParams();

  const [listJob, setListJob] = useState([]);
  const [listSchool, setListSchool] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(searchParams.get('fj') || '');

  const exportPDF = () => {
  };
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSkill(e.target.value);
    // on filtre les jobs avec les competences qui sont en fonction de la valeur du select
    const filteredJob = listJob.filter(
      (job: IEmploi) => job.competences.includes(e.target.value),
    );

    setListJob(filteredJob);
    searchParams.set('fj', e.target.value);
    window.history.replaceState(null, '', `?${searchParams.toString()}`);
  };
  // Chargement des Skills pour le select
  const fetchDataSkills = async () => {
    const response = await axiosInstance.get('/home/skill');
    setSkills(response.data);
  };

  const fetchDataJobMouss = async (skilled: string | null = null) => {
    const response = await axiosInstance.get(`/home/user/${MoussID}`);
    if (!skilled) setListJob(response.data.user.job);
    else {
      response.data.user.job.filter(
        (job: IEmploi) => job.competences.includes(skilled),
      );
    }
    setListSchool(response.data.user.school);
  };

  useEffect(() => {
    fetchDataJobMouss(selectedSkill);
    fetchDataSkills();
  }, [selectedSkill]);

  return (
    <div className="d-flex flex-column ">
      <button type="button" onClick={exportPDF}>Export to PDF</button>
      {
        !searchParams.get('fj') && (
          <Selected skills={skills} onHandleSelect={(handleChange)} />
        )
      }
      <div className="d-flex flex-row mb-5">
        <div
          id="left"
          className="col-9 border-1 border"
          style={{
            backgroundColor: '#ffffff',
            borderStartStartRadius: '45px',
            borderEndStartRadius: '45px',
          }}
        >
          <HeaderCv />
          <Dev />
          <Xp content={listJob} titre="Autres Expériences" />
          <Xp content={listSchool} titre="Formations" />
        </div>
        <div
          id="right"
          className="col-3 border-1 border "
          style={{
            backgroundColor: '#ce6b01',
            borderStartEndRadius: '45px',
            borderEndEndRadius: '45px',
          }}
        >
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
