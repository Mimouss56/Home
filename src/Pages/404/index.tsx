import Error404 from '../../assets/404.jpg';

function NotFound() {
  return (
    <img src={Error404} alt="404" className="m-auto" />
  );
}

export default NotFound;
