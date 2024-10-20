export default function AccueilPage() {
  const project = [
    {
      name: 'Deluge BT',
      description: 'client BitTorrent Deluge WebUI',
      port: 8112,
    },
    {
      name: 'Domoticz',
      description: 'Domoticz Home Automation System',
      port: 8081,
    },
    {
      name: 'NginxUI',
      description: 'Nginx WebUI',
      port: 9000,
    },
    {
      name: 'PM2',
      description: 'PM2 WebUI',
      port: 4343,
    },
    {
      name: 'Mimouss Home',
      description: 'Mimouss Home Website',
      port: 4343,
    },
    {
      name: 'Dev Mode',
      description: 'Dev Mode Website',
      port: 5173,
    },

  ];
  return (
    <div>
      <h1>Accueil</h1>
    </div>
  );
}
