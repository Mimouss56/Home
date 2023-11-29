import { useEffect, useState } from 'react';
import { getOption } from '../../../utils/main';
import { IOption } from '../../../@types/Home/option';

function TideWidget() {
  const [tideOption, setTideOption] = useState<IOption>(
    {
      id: 0,
      active: false,
      name: '',
      value: '',
    },
  );

  const fetchOption = async () => {
    const tideOptionValue = await getOption('TideWidget') as IOption;

    setTideOption(tideOptionValue);
  };
  useEffect(
    () => {
      fetchOption();
    },
    [],
  );
  return (

    tideOption?.active && (
      <div className="mx-auto p-2">
        <iframe
          src={`https://horloge.maree.frbateaux.net/ws${tideOption.value}`}
          height="217"
          title="Calendrier des marées"
        />
      </div>
    )
  );
}

export default TideWidget;
