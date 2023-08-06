import { useLocation } from 'react-router-dom';

function Setting() {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div>
      <h1>Setting</h1>

    </div>
  );
}

export default Setting;
