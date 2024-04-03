import { IUser } from '../../../@types/Home/user';
import useFetchData from '../../../hook/useFetchData';
import './style.scss';
import { MoussID } from '../../../../config.json';

function Prez() {
  const [dataMouss, loading] = useFetchData(`/api/home/user/${MoussID}`);
  const Mouss = dataMouss.user as IUser;

  if (loading || !Mouss) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="vh-100 intro bg-dark"
      id="home"
      style={{
        background: `
      radial-gradient(circle at 0 0, rgba($dark, $alpha), rgba($light, 1 - $alpha)),
      radial-gradient(circle at 100% 0, rgba($dark, $alpha), rgba($light, 1 - $alpha))
      `,
      }}
    >
      <div className="circle" />
      <section id="landing-page" className="bg-dark vh-100 d-flex align-items-center ">
        <div className="w-75 h-50 m-auto row">
          <div className="col-md-6">
            <h1>{`${Mouss.last_name} ${Mouss.first_name}`}</h1>
            <p>{`${Mouss.prez}`}</p>
          </div>
          <div className="col-md-6">
            <img src="https://www.mimouss.fr/images/2024/4/1/log_mimouss.png" alt="Mimouss Home" className=" img-fluid img-thumbnail " />
          </div>

        </div>
      </section>
    </div>
  );
}

export default Prez;
