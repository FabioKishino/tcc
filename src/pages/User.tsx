import { Link } from 'react-router-dom'

import { HeaderComponent } from '../components/HeaderComponent';
import Select from 'react-select'

import '../styles/pages/user.css';

const userInfo = {
  email: 'user@example',
  username: 'user',
  password: 'password',
  adminPassword: 'password',
  state: 'state',
  cityOptions: [
    { value: '1', label: 'São Paulo' },
    { value: '2', label: 'Rio de Janeiro' },
  ]
}

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

function handleUserEdit() {
  console.log('handleUserEdit')
}


export function User() {
  return (
    <div id="page-user">
      <HeaderComponent title="Editar Restaurante" handleInfo={() => null} />
      <div className="container">
        <form>
          <label>E-mail</label>
          <input type="email" placeholder={userInfo.email} />
          <label>Username</label>
          <input type="text" placeholder={userInfo.username} />
          <label>Password</label>
          <input type="password" placeholder={userInfo.password} />
          <label>Admin Password</label>
          <input type="password" placeholder={userInfo.adminPassword} />
          <label>State</label>
          <input type="text" placeholder={userInfo.state} />
          <label>City</label>
          <Select
            styles={customStyles}
            className="select-city"
            options={userInfo.cityOptions}
          />

          <div className="buttons">
            <Link to="/home" className="cancel-button">Cancelar</Link>
            <Link to="/home" onClick={handleUserEdit} className="confirm-button">Confirmar</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
