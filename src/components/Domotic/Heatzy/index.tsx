import { useState, useEffect } from 'react';

function Heatzy() {
  const [heatzy, setHeatzy] = useState(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchHeatzy = async () => {
      try {
        const response = await fetch('/api/heatzy');
        const data = await response.json();
        setHeatzy(data);
      } catch (e: any) {
        setError(e.message);
      }
    };

    fetchHeatzy();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!heatzy) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>Heatzy</div>
      <div>{heatzy.temperature}</div>
    </div>
  );
}
