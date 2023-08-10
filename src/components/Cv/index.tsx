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

import { Role, User } from '../../@types/user';
import { Job } from '../../@types/emploi';

const initUser: User = {
  id: 0,
  username: '',
  role: {} as Role,
  school: [] as Job[],
  email: '',
  job: [] as Job[],
};

function Cv() {
  const [searchParams] = useSearchParams();
  const filterJob = searchParams.get('fj') || '';
  const userInfos = sessionStorage.getItem('user') as unknown as User || initUser;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [jobs, setJobs] = useState(userInfos.job || [] as Job[]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [school, setSchool] = useState(userInfos.school || [] as Job[]);

  return (
    <>
      <div id="left" className="col-9">
        <HeaderCv />
        <Dev />
        <Xp content={jobs} titre="Autres Expériences" filter={filterJob} />
        <Xp content={school} titre="Formations" filter="" />
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
