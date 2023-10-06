import { useEffect } from 'react';
import TideWidget from '../TideWidget';

function WindguruWidget() {
  const loader = () => {
    const arg = [
      's=48480', 'm=100', 'uid=wg_fwdg_48480_100_1696623687774',
      'wj=knots', 'tj=c', 'waj=m', 'tij=cm', 'odh=10', 'doh=19',
      'fhours=48', 'hrsm=1', 'vt=forecasts', 'lng=fr', 'idbs=1',
      'p=WINDSPD,GUST,SMER,TMPE,FLHGT,CDC,APCP1s,RH,RATING',
    ];
    const script = document.createElement('script');
    script.id = 'wg_fwdg_48480_100_1696623687774';
    script.src = `https://www.windguru.cz/js/widget.php?${arg.join('&')}`;
    document.body.appendChild(script);
  };

  useEffect(() => {
    loader();
  }, []);

  return (
    <div
      className="card m-auto shadow-sm p-3 mb-2 bg-white rounded d-flex flex-column align-items-center justify-content-center"
      style={{ width: '100%' }}
    >
      <div id="wg_fwdg_48480_100_1696623687774" className="col col-8" />
      <TideWidget port={99} />
    </div>
  );
}

export default WindguruWidget;
