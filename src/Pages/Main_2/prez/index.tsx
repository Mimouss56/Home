import { IUser } from '../../../@types/Home/user';
import './style.scss';

function Prez({ Mouss }: { Mouss: IUser }) {
  return (
    <div className="vh-100 intro bg-dark">
      <div className="circle" />
      <section id="landing-page" className="bg-dark vh-100 d-flex align-items-center ">
        <div className="w-75 h-50 m-auto row">
          <div className="col-md-6">
            <h1>{`${Mouss.last_name} ${Mouss.first_name}`}</h1>
            <p>{`${Mouss.prez}`}</p>
          </div>
          <div className="col-md-6">
            <img src="https://via.placeholder.com/500" alt="test" />
          </div>

        </div>
      </section>
    </div>
  );
}

export default Prez;
