import { IUser } from '../../../@types/Home/user';
import useFetchData from '../../../hook/useFetchData';
import './textNeon.scss';
import './animateCircle.scss';
import './borderNeon.scss';
import '../../../scss/styles.scss';
import { MoussID } from '../../../../config.json';
import CarouselSkill from '../skill/carousel';
// import { IHard } from '../../../@types/Home/hardSkill';

const idName = 'landing-page';

const width = 300;
function Prez() {
  const [dataMouss] = useFetchData(`/api/home/user/${MoussID}`);
  const Mouss = dataMouss.user as IUser;

  const [dataHardSkill] = useFetchData('/api/home/hardskill');

  if (!Mouss) {
    return <div>Loading...</div>;
  }

  return (
    <section
      id={idName}
      className="vh-100 d-flex align-items-center position-relative overflow-hidden"
    >
      <div
        id={`${idName}-content`}
        className="h-lg-50 m-md-auto row my-sm-0 h-sm-100"
      >
        <div className="col-md-6 my-auto px-5">
          <h1 id="prezName" className="neonText">
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
          <CarouselSkill skills={dataHardSkill} />
        </div>
        <div className="col-md-6 d-flex justify-content-center my-auto mw-100">
          <div
            className="box position-relative "
            style={{
              width,
              height: width,
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <span key={i} className="position-absolute top-0 h-100" />
            ))}
            <img
              src="https://www.mimouss.fr/images/2024/4/1/log_mimouss.png"
              alt="Mouss"
              width={width - 100}
              height={width - 100}
              className="position-absolute top-50 start-50 translate-middle rounded-circle "
            />

          </div>
        </div>

      </div>
    </section>

  );
}

export default Prez;
