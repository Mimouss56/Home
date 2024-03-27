import { IUser } from '../../../@types/Home/user';

function Prez({ Mouss }: { Mouss: IUser }) {
  return (
    <section
      id="landing-page"
      className="bg-dark"
      style={{
        padding: '100px 0',
        height: '100vh',
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1>{`${Mouss.last_name} ${Mouss.first_name}`}</h1>
            <p>{`${Mouss.prez}`}</p>
          </div>
          <div className="col-md-6">
            <img src="https://via.placeholder.com/500" alt="test" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Prez;
