import { Routes, Route } from 'react-router-dom';
import Setting from './Setting';
import Job from './Job';
import { Job as IJob } from '../../@types/emploi';
import { Role, User as IUser } from '../../@types/user';
import NotFound from '../notFound';

const initUser: IUser = {
  id: 0,
  username: '',
  role: {} as Role,
  school: [] as IJob[],
  email: '',
  job: [] as IJob[],
};

function UserMain() {
  const userInfos = sessionStorage.getItem('user') as unknown as IUser || initUser;
  const jobs = userInfos.job || [];
  const school = userInfos.school || [];

  return (
    <Routes>
      <Route path="/" element={<div><h1>User</h1></div>} />
      <Route path="setting" element={<Setting />} />
      <Route path="jobs" element={<Job jobs={jobs} />} />
      <Route path="school" element={<Job jobs={school} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default UserMain;
