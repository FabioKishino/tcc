import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom'

import TakeLogo from '../images/TakeLogo.svg'
import '../styles/pages/signin.css';

export function SignIn () {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext)
  
  async function handleSignIn(data: any) {
    await signIn(data)
    navigate('/home');
  }
  

  return (
    <div id="page-signin">
      <div className="signin-container">
        <form onSubmit={handleSubmit(handleSignIn)}>
          <img src={TakeLogo} alt="TakeLogo"/>

          <input
            {...register('email')}
            type="email"
            placeholder="Username"
            id="username"
            autoComplete="off"
            required
          />
          
          <input 
            {...register('password')}
            type="password" 
            placeholder="Password"
            id="password"
            required
          />

          <div className="buttons">
            <Link to="/signup" className="signup-button">Sign Up</Link>
            <button type="submit" className="login-button">Sign In</button>
          </div>
          
          <Link to="/" className="forget-password">Forget your password?</Link>
          
        </form>
      </div>
    </div>
  )
}
