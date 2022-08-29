import { Link } from 'react-router-dom'

import TakeLogo from '../images/TakeLogo.svg'
import '../styles/pages/signin.css';

export function SignIn () {
  return (
    <div id="page-signin">
      <div className="signin-container">
        <form>
          <img src={TakeLogo} alt="TakeLogo"/>

          <input type="text" placeholder="Username"/>
          <input type="password" placeholder="Password"/> 

          <div className="buttons">
            <Link to="/home" className="login-button">Log In</Link>
            <Link to="/signup" className="signup-button">Sign Up</Link>
          </div>
          
          <Link to="/" className="forget-password">Forget your password?</Link>
          
        </form>
      </div>
    </div>
  )
}
