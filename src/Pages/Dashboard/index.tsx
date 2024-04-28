import Password from '../../components/User/password';
import InfosUser from '../../components/User/general';
import Complement from '../../components/User/info';
import SectionLayout from '../../layout/SectionLayout';

export default function UserSettingsPage() {
  return (
    <SectionLayout idName="profil" title="Mon Profil" addButton={null}>
      <div className="row py-2">
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

    </SectionLayout>

  );
}
