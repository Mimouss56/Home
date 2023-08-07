import { useState } from 'react';
import './style.scss';

interface INotifToastProps {
  text: string;
  color: string;
  onCharge?: void;
}

function Toast(content: INotifToastProps) {
  const { text, color } = content;
  const [NotifToast, setNotifToast] = useState('');
  function handleOncharge() {
    setNotifToast('');
  }
  return (
    <div className={`alert alert-${color} alert-dismissible fade show`} role="alert">
      {text}
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={handleOncharge} />
    </div>

  );
}

export default Toast;
