import { Link } from 'react-router-dom'

import TakeLogo from '../images/TakeLogo.svg'
import '../styles/pages/signup.css';

import Select from 'react-select'


const cityOptions = [
  { value: '1', label: 'Curitiba' },
  { value: '2', label: 'SJP' },
]

export function SignUp () {
  return (
    <div id="page-signup">
      <div className="container">
        <form>
          <img src={TakeLogo} alt="TakeLogo"/>

          <input type="email" placeholder="E-mail"/>
          <input type="text" placeholder="Username"/>
          <input type="password" placeholder="Password"/> 
          <input type="password" placeholder="Admin Password"/> 
          <input type="text" placeholder="State"/>
          <input type="text" placeholder="City"/>
          
          <Select
            className="select-city"
            placeholder="City"
            options={cityOptions}
          />

          <div className="buttons">
            <Link to="/" className="cancel-button">Cancel</Link>
            <Link to="/home" className="create-account-button">Create Account</Link>
          </div>          
        </form>
      </div>
    </div>
  )
}
