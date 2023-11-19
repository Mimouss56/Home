import { useEffect, useState } from 'react';
import { IOption } from '../../../@types/Home/option';
import { getOption } from '../../../utils/main';

function WindguruWidget() {
  const [windguruOption, setWindguruOption] = useState<IOption>(
    {
      id: 0,
      active: false,
      name: '',
      value: '',
    },
  );

  const fetchOption = async () => {
    const OptionValue = await getOption('Windguru') as IOption;
    setWindguruOption(OptionValue);
  };

  const arg = [
    's=48480', 'm=100', `uid=${windguruOption.value}`,
    'wj=knots', 'tj=c', 'waj=m', 'tij=cm', 'odh=10', 'doh=19',
    'fhours=48', 'hrsm=1', 'vt=forecasts', 'lng=fr', 'idbs=1',
    'p=WINDSPD,GUST,SMER,TMPE,FLHGT,CDC,APCP1s,RH,RATING',
  ];
  const script = document.createElement('script');
  script.id = windguruOption.value;
  script.src = `https://www.windguru.cz/js/widget.php?${arg.join('&')}`;

  useEffect(() => {
    fetchOption();
  }, []);

  if (windguruOption.active) document.body.appendChild(script);

  return (
    windguruOption.active && (
      <div
        className="card shadow-sm p-3 mb-2 bg-white rounded d-flex flex-column align-items-center justify-content-center"
        style={{ width: '100vw' }}
      >
        <div id={windguruOption.value} className="col col-8" />
      </div>
    )
  );
}

export default WindguruWidget;
