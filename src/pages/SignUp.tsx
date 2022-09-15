import { ChangeEvent, useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import '../styles/pages/signup.css';
import api from '../services/api';

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

interface IBGEUFResponse {
  sigla: string;
  nome: string;
}

interface IBGECITYResponse {
  id: number;
  nome: string;
}

export function SignUp () {

  const [cityOptions, setCityOptions] = useState<IBGECITYResponse[]>([])
  const [UFs, setUFs] = useState<IBGEUFResponse[]>([])

  const [selectedUF, setSelectedUF] = useState('0')
  const [selectedCity, setSelectedCity] = useState('0')
  
  useEffect(() => {
    api.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
    .then(response => setUFs(response.data)
    );
  }, [])

  useEffect(() => {
    api.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`)
    .then(response => setCityOptions(response.data)
    );
  }, [selectedUF])

  function handleSelectUF (event: ChangeEvent<HTMLSelectElement>) {
    const UF = event.target.value;
    setSelectedUF(UF);
  }

  function handleSelectCity (event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSelectedCity(city);
  }

  return (
    <div id="page-signup">
      <div className="container">
        <form>
          <input type="email" placeholder="E-mail"/>
          <input type="text" placeholder="Username"/>
          <input type="password" placeholder="Password"/> 
          <input type="password" placeholder="Admin Password"/> 


          {/* Estilizar Select */}
          <select className="select-city" onChange={handleSelectUF}>
            <option value="0">Selecione um Estado</option>
            {UFs.map((uf) => (
              <option value={uf.sigla}>
                {uf.sigla}
              </option>
            ))}
          </select>

          <select className="select-city" onChange={handleSelectCity}>
            <option value="0">Selecione uma Cidade</option>
            {cityOptions.map((city) => (
              <option value={city.nome}>
                {city.nome}
              </option>
            ))}
          </select>

              
          <div className="buttons">
            <Link to="/" className="cancel-button">Cancel</Link>
            <Link to="/home" className="create-account-button">Create Account</Link>
          </div>          
        </form>
      </div>
    </div>
  )
}
