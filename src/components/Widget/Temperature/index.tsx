/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react';
import './style.scss';

function WidgetTemperature({ temp }: { temp: number }) {
  const [val, setVal] = useState(temp || 0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>(undefined);

  const handleMouseEnter = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
    }
    const id = setInterval(() => {
      setVal((prevVal) => (prevVal < 30 ? prevVal + 1 : prevVal));
    }, 10);
    setIntervalId(id);
  };

  const handleMouseLeave = () => {
    clearInterval(intervalId);
    const id = setInterval(() => {
      setVal((prevVal) => (prevVal > 5 ? prevVal - 1 : prevVal));
    }, 10);
    setIntervalId(id);
  };

  useEffect(() => () => clearInterval(intervalId), [intervalId]);

  return (
    <div>
      <h1>Temperature Widget</h1>
      <div className="widgetTemp" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="gauge-color" />
        {/** Jauge adaptative dynamique */}
        <div className="gauge-value" />
        <div className="gauge-content" />
        <div className="gauge-data">
          <h1 id="percent">{`${val}°C`}</h1>
        </div>
      </div>
    </div>
  );
}

export {
  WidgetTemperature,
};
