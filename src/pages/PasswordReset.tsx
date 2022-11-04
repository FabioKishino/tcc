import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import '../styles/pages/passwordReset.css';

import api from '../services/api';

export function PasswordReset () {

  const {id_restaurant, token} = useParams();
  const [password, setPassword] = useState('');

  function handlePasswordReset () {

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
    }
    ).catch(error => {
      console.log(error)
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
        <input type="password" placeholder="Nova senha" min="8" required/>
        <input type="password" placeholder="Confirme sua nova senha" min="8" onChange={newPasswordInputHandler} />
        <button onClick={handlePasswordReset}>Confirmar</button>
      </div>
    </div>
  )
}
