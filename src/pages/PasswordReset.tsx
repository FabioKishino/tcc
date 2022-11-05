import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import '../styles/pages/passwordReset.css';

import api from '../services/api';
import { PopUpAlert } from '../components/PopUpAlert';

export function PasswordReset() {

  const { id_restaurant, token } = useParams();
  const [password, setPassword] = useState('');
  const [alertSuccessIsOpen, setAlertSuccessIsOpen] = useState(false);
  const [alertErrorIsOpen, setAlertErrorIsOpen] = useState(false);

  function handleOpenAlertSuccess() {
    setAlertSuccessIsOpen(true);
  }

  function handleOpenAlertError() {
    setAlertErrorIsOpen(true);
  }

  function handlePasswordReset() {

    const data = {
      id_restaurant: id_restaurant,
      newPassword: password,
    }

    api.patch(`/reset-password`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      console.log(response.data)
      handleOpenAlertSuccess()
    }
    ).catch(error => {
      console.log(error)
      handleOpenAlertError();
    })
  }

  const newPasswordInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const typedPassword = event.target.value
    setPassword(typedPassword);
  }

  return (
    <div id="password-reset-page">
      <div className="password-reset-page-content">
        <p>Digite sua nova senha.</p>
        <input type="password" placeholder="Nova senha" min="8" required />
        <input type="password" placeholder="Confirme sua nova senha" min="8" onChange={newPasswordInputHandler} />
        <button style={{ cursor: "pointer" }} type='submit' onClick={handlePasswordReset}>Confirmar</button>
      </div>

      <PopUpAlert status={"Senha Alterada Com Sucesso"} isOpen={alertSuccessIsOpen} setClosed={() => setAlertSuccessIsOpen(false)} />
      <PopUpAlert status={"Houve um problema, tente novamente"} isOpen={alertErrorIsOpen} setClosed={() => setAlertErrorIsOpen(false)} />

    </div>
  )
}
