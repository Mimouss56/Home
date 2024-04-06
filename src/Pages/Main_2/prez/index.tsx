import { IUser } from '../../../@types/Home/user';
import useFetchData from '../../../hook/useFetchData';
import './textNeon.scss';
// import './landingPage.scss';
import './animateCircle.scss';
import './borderNeon.scss';
import '../../../scss/styles.scss';
import { MoussID } from '../../../../config.json';

const width = 300;
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
      {/* <div className="circle" /> */}
      <section id="landing-page" className="bg-dark vh-100 d-flex align-items-center mb-5 position-relative overflow-hidden">
        <div className="w-lg-75 h-50 m-md-auto row my-sm-0">
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
          <div className="col-md-6 d-flex justify-content-center my-auto">
            <div
              className="box"
              style={{
                width,
                height: width,
              }}
            >
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <div className="object-fit-fill">
                <img
                  src="https://www.mimouss.fr/images/2024/4/1/log_mimouss.png"
                  alt="Mouss"
                  className="d-inline-block "
                  width={250}
                  height={250}
                />
              </div>

            </div>
            {/* <img
              src="https://www.mimouss.fr/images/2024/4/1/log_mimouss.png"
              alt="Mouss"
              className="rounded border-4"
            /> */}
          </div>

        </div>
      </section>
    </div>
  );
}

export default Prez;
