import './style.scss';

interface ITagProp {
  icon: string,
  name: string,
  color: 'yellow' | 'orange' | 'pink' | 'red' | 'purple' | 'teal' | 'blue' | 'blue-dark' | 'green' | 'green-dark' | 'silver' | 'gold'
}

function Tags({ icon, name, color }: ITagProp) {
  return (
    <div
      className={`${color} badgeTag position-relative d-inline-block start-0 mx-4 my-2 rounded-3 `}
      style={{
        width: '4em',
        height: '6.2em',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.top = '-4px'; }}
      onMouseLeave={(e) => { e.currentTarget.style.top = '0px'; }}
    >
      <div
        className="position-absolute bg-white z-2 rounded-circle m-auto top-0 start-0 bottom-0 end-0 "
        style={{
          width: 50,
          height: 50,
        }}
      >
        <img
          src={icon}
          alt={name}
          className="m-auto"
          width={50}
          onMouseEnter={
            (e) => {
              e.currentTarget.style.transform = 'scale(1.5)';
              e.currentTarget.style.transition = 'all 0.4s ease';
            }
          }
          onMouseLeave={
            (e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.transition = 'all 0.4s ease';
            }
          }
        />
      </div>
      <div
        className="position-absolute rounded-pill text-white px-2 py-1 start-50 d-flex align-items-center justify-content-center fs-6 z-2 text-uppercase pe-none translate-middle-x"
        style={{
          width: '100px',
          height: '15px',
          bottom: '12px',
          background: 'linear-gradient(to bottom right, #555 0%, #333 100%)',

        }}
      >
        {name}
      </div>
    </div>
  );
}

export default Tags;
