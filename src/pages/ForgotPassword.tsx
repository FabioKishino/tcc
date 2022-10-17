import '../styles/pages/forgotPassword.css';

import api from '../services/api';
import { useState } from 'react';



export function ForgotPassword () {
  const [email, setEmail] = useState({email: ''});

  function sendForgotPasswordEmail () {
    const token = localStorage.getItem("@Auth:token");
  
    api.post('/forgot-password', email, {
      headers: {
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      window.location.href = '/email-confirmation';
      console.log(response);
    }).catch(error => {
      alert(error);
      console.log(error);
    })
  }

  const passwordInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const typedEmail = event.target.value
    setEmail({email: typedEmail});
  }

  function backToSignInPage () {
    window.location.href = '/';
  }
  
  return (
    <div id="forgot-password-page">
      <div className="forgot-password-page-content">
        <h2>Esqueceu sua senha? </h2>
        <span>Caso exista um cadastro com o seu e-mail, enviaremos um email com o link para o reset da senha.</span>
        
        <div className="forgot-password-input">
          <label>Digite o e-mail da sua conta</label>
          <input
            type="email"
            placeholder="E-mail"
            onChange={passwordInputHandler}
            required
          />
        </div>
        
        <div className="forgot-password-form-buttons">
          <button className="forgot-password-cancel-btn" onClick={backToSignInPage}>Cancelar</button>
          <button className="forgot-password-confirm-btn" onClick={sendForgotPasswordEmail}>Enviar</button>
        </div>
      </div>
    </div>
  )
}
