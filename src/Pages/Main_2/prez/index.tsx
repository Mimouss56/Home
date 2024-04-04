import { IUser } from '../../../@types/Home/user';
import useFetchData from '../../../hook/useFetchData';
import './style.scss';
import { MoussID } from '../../../../config.json';

function Prez() {
  const [dataMouss] = useFetchData(`/api/home/user/${MoussID}`);
  const Mouss = dataMouss.user as IUser;

  if (!Mouss) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="vh-100 bg-dark"
      id="home"
    >
      <div className="circle" />
      <section id="landing-page" className="bg-dark vh-100 d-flex align-items-center mb-5 ">
        <div className="w-75 h-50 m-auto row">
          <div className="col-md-6 my-auto px-5">
            <h1 id="prez">
              l
              <span className="blinkText">e</span>
              {' '}
              pr
              <span className="blinkText">io</span>
              l
              {' '}
              m
              <span className="blinkText">a</span>
              tth
              <span className="blinkText">ieu</span>
            </h1>
            <p>{`${Mouss.prez}`}</p>
          </div>
          <img
            src="https://www.mimouss.fr/images/2024/4/1/log_mimouss.png"
            alt="Mimouss Home"
            className="rounded img-fluid img-thumbnail border-4 col-md-6"
          />

        </div>
      </section>
    </div>
  );
}

export default Prez;
