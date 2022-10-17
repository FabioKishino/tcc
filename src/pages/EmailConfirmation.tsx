import { useState, useEffect } from 'react';

import '../styles/pages/emailConfirmation.css';
import { CircleWavyCheck } from 'phosphor-react';

export function EmailConfirmation () {
  useEffect(() => { timer() }, [])

  function timer() {
    setTimeout(() => { window.location.href = '/'; }, 3500)
  }

  return (
    <div id="email-confimation-page">
      <div className="email-confirmation-page-content">
        <p>Caso exista uma conta vinculada a esse endereço será enviado um link para o seu email</p>
        <CircleWavyCheck size={128} color="#0a9937"/>  
      </div> 
    </div>
  )
}
