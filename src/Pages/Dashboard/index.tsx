import Password from '../../components/User/password';
import InfosUser from '../../components/User/general';
import Complement from '../../components/User/info';

export default function UserSettingsPage() {
  return (
    <div className="row">
      <div className="col-md-6 mb-3">
        <InfosUser />
      </div>
      <div className="col-md-6 mb-3">
        <Complement />
      </div>
      <div className="col-md-6 mb-3">
        <Password />
      </div>

    </div>
  );
}
