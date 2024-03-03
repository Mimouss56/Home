import { useState } from 'react';

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;

const useCheckPassword = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');

  const checkPassword = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      setError(true);
      setErrorMessage('Les mots de passe ne correspondent pas');
      // regex pour vérifier la complexité du mot de passe
    } else {
      if (!regex.test(password)) {
        setError(true);
        setErrorMessage('Minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial');
        return;
      }

      setError(false);
      setErrorMessage('');
    }
  };
  return {
    error,
    errorMessage,
    checkPassword,
    // password,
    // confirmPassword,
    // setPassword,
    // setConfirmPassword,
    setError,
    setErrorMessage,
  };
};

export default useCheckPassword;
