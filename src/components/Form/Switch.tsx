import { useEffect, useState } from 'react';

interface SwitchButtonProps {
  name: string;
  checked: boolean;
  disable?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  title?: string;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
}

export default function SwitchButton({
  name, checked, onChange, id, title, color, disable,
}: SwitchButtonProps) {
  const [bgColor, setBgColor] = useState('');

  useEffect(() => {
    const isActive = checked ? ` bg-${color}` : '';
    setBgColor(isActive);
  }, [checked, color]);

  return (
    <div className="input-group mb-3">

      <div className="form-check form-switch">
        <input
          className={`form-check-input${bgColor}`}
          type="checkbox"
          role="switch"
          name={name}
          defaultChecked={checked}
          id={id}
          onChange={onChange}
          disabled={disable}
        // value={active.toString()}
        // checked={!!active}
        />
        {title && (
          <label className="form-check-label" htmlFor={id}>
            {title}
          </label>
        )}
      </div>
    </div>
  );
}

SwitchButton.defaultProps = {
  id: '',
  title: '',
  color: 'primary',
  disable: false,
};
