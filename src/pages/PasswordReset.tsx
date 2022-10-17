import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import '../styles/pages/passwordReset.css';

import api from '../services/api';

export function PasswordReset () {

  function handlePasswordReset () {
    console.log('Password reset');
  }
  
  const {id} = useParams();
  
  return (
    <div id="password-reset-page">
      <div className="password-reset-page-content">
        <p>Digite sua nova senha.</p>
        <input type="password" placeholder="Nova senha" min="8" required/>
        <input type="password" placeholder="Confirme sua nova senha" min="8" required/>
        <button onClick={handlePasswordReset}>Confirmar</button>
      </div>
    </div>
  )
}
