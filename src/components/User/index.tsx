import { useLocation } from 'react-router-dom';
import Setting from './Setting';
import Job from './Job';
import emplois from '../../../data/emploi.json';
import formation from '../../../data/formation.json';

function User() {
  const location = useLocation();
  if (location.pathname === '/user/setting') {
    return (
      <Setting />
    );
  }
  if (location.pathname === '/job') {
    return (
      <Job jobs={emplois} />
    );
  }
  if (location.pathname === '/user/school') {
    return (
      <Job jobs={formation} />
    );
  }
  if (location.pathname === '/user/sanction') {
    return (
      <div>
        <h1>Sanction</h1>
      </div>
    );
  }
  // sinon return <User />
  return (
    <div>
      <h1>User</h1>
    </div>
  );
}

export default User;
