import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'

import '../styles/pages/signup.css';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext';


interface IBGEUFResponse {
  sigla: string;
  nome: string;
}

interface IBGECITYResponse {
  id: number;
  nome: string;
}

const initialValues = {
  name: "",
  email: "",
  password: "",
  state: "",
  city: "",
  admin_password: ""
}


export function SignUp() {

  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext)

  const [cityOptions, setCityOptions] = useState<IBGECITYResponse[]>([])
  const [UFs, setUFs] = useState<IBGEUFResponse[]>([])
  const [selectedUF, setSelectedUF] = useState('0')
  const [selectedCity, setSelectedCity] = useState('0')
  const [newRestaurant, setNewRestaurant] = useState(initialValues)

  useEffect(() => {
    api.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
      .then(response => setUFs(response.data)
      );
  }, [])

  useEffect(() => {
    api.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`)
      .then(response => setCityOptions(response.data)
      );
  }, [selectedUF])

  function handleSelectUF(event: ChangeEvent<HTMLSelectElement>) {
    const UF = event.target.value;
    setSelectedUF(UF);

    const { name, value } = event.target;
    setNewRestaurant({
      ...newRestaurant,
      [name]: value,
    });
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSelectedCity(city);

    const { name, value } = event.target;
    setNewRestaurant({
      ...newRestaurant,
      [name]: value,
    });
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setNewRestaurant({
      ...newRestaurant,
      [name]: value,
    });
  }

  async function handleSignUp() {

    if (newRestaurant.password.length < 8) {
      alert("A senha deve ter no mínimo 8 caracteres")
      return
    } else {
      try {
        const response = await api.post('/restaurants', newRestaurant)
        navigate('/home');
        alert("Cadastro realizado com sucesso!")
        signIn(newRestaurant);

      } catch (Error) {
        alert("Cadastro inválido");
        throw Error;
      }
    }
  }

  return (
    <div id="page-signup">
      <div className="container">
        <form className="sign-up-form">
          <h2>Crie sua conta</h2>
          <input name="email" value={newRestaurant.email} onChange={handleInputChange} type="email" placeholder="E-mail" required />
          <input name="name" value={newRestaurant.name} onChange={handleInputChange} type="text" placeholder="Username" required />
          <input name="password" value={newRestaurant.password} onChange={handleInputChange} id="password-input" type="password" placeholder="Password" required />

          <select name="state" value={newRestaurant.state} onChange={handleSelectUF}>
            <option value="0">State</option>
            {UFs.map((uf) => (
              <option value={uf.sigla}>
                {uf.sigla}
              </option>
            ))}
          </select>

          <select name="city" value={newRestaurant.city} onChange={handleSelectCity}>
            <option value="0">City</option>
            {cityOptions.map((city) => (
              <option value={city.nome}>
                {city.nome}
              </option>
            ))}
          </select>

          <div className="buttons">
            <Link to="/" className="cancel-button">Cancel</Link>
            <button type="button" onClick={handleSignUp} className="create-account-button">Create Account</button>
          </div>
        </form>
      </div>
    </div>
  )
}