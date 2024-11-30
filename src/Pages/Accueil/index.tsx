import imgPM2 from '../../assets/images/snapshot/PM2 WebUI.png';
import imgNginxUI from '../../assets/images/snapshot/Dashboard Nginx UI.png';
import imgDeluge from '../../assets/images/snapshot/delugge webUi.jpg';
import imgDevMode from '../../assets/images/finishWebsite.png';
import imgDomoticz from '../../assets/images/snapshot/domoticzDash.png';
import imgWebmin from '../../assets/images/snapshot/imgWebmin.png';
import './style.scss';

export default function AccueilPage() {
  const project = [
    {
      name: 'Deluge BT',
      description: 'client BitTorrent Deluge WebUI',
      port: 8112,
      img: imgDeluge,
    },
    {
      name: 'Domoticz',
      description: 'Domoticz Home Automation System',
      port: 8081,
      img: imgDomoticz,
    },
    {
      name: 'NginxUI',
      description: 'Nginx WebUI',
      port: 9000,
      img: imgNginxUI,
    },
    {
      name: 'PM2',
      description: 'PM2 WebUI',
      port: 4343,
      img: imgPM2,
    },

    {
      name: 'Dev Mode',
      description: 'Dev Mode Website',
      port: 5173,
      img: imgDevMode,
    },
    {
      name: 'Webmin',
      description: 'Webmin WebUI',
      port: 10000,
      img: imgWebmin,
    },

  ];
  return (
    <div className="d-flex flex-wrap justify-content-around h-auto my-5">
      {project
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((p) => (
          <a
            href={`http://192.168.1.210:${p.port}`}
            target="_blank"
            rel="noreferrer"
            className="text-decoration-none"
            key={p.name}

          >
            <figure
              className="card m-4 position-relative bg-transparent border-0 hover-effect"
              style={{ width: '300px', height: '200px' }}
            >
              <img
                src={p.img}
                className="img-fluid img-thumbnail d-block rounded-5 "
                alt={p.description}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'fill',
                }}
              />
              <figcaption className="figure-caption position-absolute text-white bg-dark opacity-100 top-50 start-0 end-0 p-1 text-center">{p.name}</figcaption>
            </figure>
          </a>
        ))}

    </div>

  );
}
