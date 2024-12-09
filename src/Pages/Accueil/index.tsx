import imgPM2 from '../../assets/images/snapshot/PM2 WebUI.png';
import imgNginxUI from '../../assets/images/snapshot/Dashboard Nginx UI.png';
import imgDeluge from '../../assets/images/snapshot/delugge webUi.jpg';
import imgDevMode from '../../assets/images/finishWebsite.png';
import imgDomoticz from '../../assets/images/snapshot/domoticzDash.png';
import imgWebmin from '../../assets/images/snapshot/imgWebmin.png';
import './style.scss';
import Bandeau from '../../components/Bandeau';

interface IProject {
  name: string;
  description: string;
  port?: number;
  img: string;
  url?: string;
}

export default function AccueilPage() {
  const project: IProject[] = [
    {
      name: 'Deluge BT',
      description: 'client BitTorrent Deluge WebUI',
      // port: 8112,
      img: imgDeluge,
      url: 'https://deluge.mimouss.fr',
    },
    {
      name: 'Domoticz',
      description: 'Domoticz Home Automation System',
      img: imgDomoticz,
      url: 'https://domoticz.mimouss.fr',
    },
    {
      name: 'NginxUI',
      description: 'Nginx WebUI',
      // port: 9000,
      img: imgNginxUI,
      url: 'https://nginx-ui.mimouss.fr',

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
            href={p.url || `http://192.168.1.210:${p.port}`}
            target="_blank"
            rel="noreferrer"
            className="text-decoration-none"
            key={p.name}

          >
            <figure
              className={`card m-4 position-relative bg-transparent overflow-hidden rounded-5 border-5 hover-effect border-${p.url ? 'danger' : 'white'}`}
              style={{ width: '300px', height: '200px' }}
            >
              {p.port && (<Bandeau>local</Bandeau>)}
              <img
                src={p.img}
                className="img-fluid img-thumbnail d-block rounded-5 "
                alt={p.description}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
              <figcaption className="figure-caption position-absolute text-white bg-dark opacity-100 top-50 start-0 end-0 p-1 text-center">{p.name}</figcaption>
            </figure>
          </a>
        ))}

    </div>

  );
}
