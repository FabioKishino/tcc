import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom'

import TakeLogo from '../images/TakeLogo.svg'
import '../styles/pages/signin.css';
import { PopUpAlert } from '../components/PopUpAlert';

export function SignIn() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext)
  const [alertErrorSignInIsOpen, setAlertErrorSignInIsOpen] = useState(false);

  async function handleSignIn(data: any) {  
    signIn(data).then(
      (response) => {window.location.href = '/home';}
    ).catch(
      (error) => {setAlertErrorSignInIsOpen(true)}
    );
  }


  return (
    <div id="page-signin">
      <div className="signin-container">
        <form onSubmit={(handleSubmit(handleSignIn))}>
          <img src={TakeLogo} alt="TakeLogo" />

          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            id="username"
            autoComplete="off"
            required
          />

          <input
            {...register('password')}
            type="password"
            placeholder="Senha"
            id="password"
            required
          />

          <div className="buttons">
            <Link to="/signup" className="signup-button">Cadastrar</Link>
            <button type="submit" className="login-button">Logar</button>
          </div>

          <Link to="/forgot-password" className="forget-password">Esqueceu sua senha?</Link>

        </form>

        <PopUpAlert status={"Email/senha incorretos"} isOpen={alertErrorSignInIsOpen} setClosed={() => setAlertErrorSignInIsOpen(false)}/>

      </div>
    </div>
  )
}
