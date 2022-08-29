import { Link } from 'react-router-dom'
import '../styles/pages/signup.css';
import Select from 'react-select'

const cityOptions = [
  { value: '1', label: 'Curitiba' },
  { value: '2', label: 'SJP' },
]

const customStyles = {
  menuList: () => ({
    backgroundColor: '#DCDCDC',
    color: 'black',
    padding: 20,
  }),
  control: (styles: any) => ({
    ...styles,
    backgroundColor: '#DCDCDC',
    border: '0px',
  }),
  dropdownIndicator: () => ({
    color: 'black',
  })
}


export function SignUp () {
  return (
    <div id="page-signup">
      <div className="container">
        <form>
          {/* <img src={TakeLogo} alt="TakeLogo"/> */}

          <input type="email" placeholder="E-mail"/>
          <input type="text" placeholder="Username"/>
          <input type="password" placeholder="Password"/> 
          
          <input type="password" placeholder="Admin Password"/> 
          <input type="text" placeholder="State"/>
          
          <Select
            styles={customStyles}
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
