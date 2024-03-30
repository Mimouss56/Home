import './style.scss';

interface ITagProp {
  icon: string,
  name: string,
  color: 'yellow' | 'orange' | 'pink' | 'red' | 'purple' | 'teal' | 'blue' | 'blue-dark' | 'green' | 'green-dark' | 'silver' | 'gold'
}

function Tags({ icon, name, color }: ITagProp) {
  return (
    <div className={`${color} badgeTag position-relative d-inline-block start-0 mx-4 my-2 rounded-3`}>
      <div className="circleTag">
        <img src={icon} alt={name} className="m-auto" width={50} />
      </div>
      <div
        className="ribbon position-absolute rounded-pill text-white px-2 py-1 start-50 d-flex align-items-center justify-content-center fs-6 z-1 text-uppercase pe-none translate-middle-x"
      >
        {name}
      </div>
    </div>
  );
}

export default Tags;
