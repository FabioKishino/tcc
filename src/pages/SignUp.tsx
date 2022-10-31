import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'

import '../styles/pages/signup.css';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import { PopUpAlert } from '../components/PopUpAlert';


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

  const [alertSuccessSignUpIsOpen, setAlertSuccessSignUpIsOpen] = useState(false);
  const [alertInvalidPasswordIsOpen, setAlertInvalidPasswordIsOpen] = useState(false);
  const [alertErrorEmailAlreadyExistIsOpen , setAlertErrorEmailAlreadyExistIsOpen] = useState(false);
  const [alertErrorSignUpIsOpen, setAlertErrorSignUpIsOpen] = useState(false);

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

  function handleOpenAlertSuccessSignUp () {
    setAlertSuccessSignUpIsOpen(true);
  }

  function handleOpenAlertInvalidPassword () {
    setAlertInvalidPasswordIsOpen(true);
  }

  function handleOpenAlertErrorEmailAlreadyExist() {
    setAlertErrorEmailAlreadyExistIsOpen(true);
  }

  function handleOpenAlertErrorSignUp() {
    setAlertErrorSignUpIsOpen(true);
  }

  async function handleSignUp() {

    if (newRestaurant.email.length == 0 || newRestaurant.name.length == 0 || newRestaurant.password.length == 0 || newRestaurant.state.length == 0 || newRestaurant.city.length == 0) {
      handleOpenAlertErrorSignUp();
      return
    } else if (newRestaurant.password.length < 8) {
      handleOpenAlertInvalidPassword();
      return
    } else {
      try {
        const response = await api.post('/restaurants', newRestaurant)
        
        handleOpenAlertSuccessSignUp();
        setTimeout(() => {
          navigate('/home');
          signIn(newRestaurant);
        }, 5000)
      
      } catch (Error) {
        handleOpenAlertErrorEmailAlreadyExist();
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
          <input name="password" value={newRestaurant.password} onChange={handleInputChange} id="password-input" type="password" placeholder="Senha" required />

          <select name="state" value={newRestaurant.state} onChange={handleSelectUF}>
            <option value="0">Estado</option>
            {UFs.map((uf) => (
              <option value={uf.sigla}>
                {uf.sigla}
              </option>
            ))}
          </select>

          <select name="city" value={newRestaurant.city} onChange={handleSelectCity}>
            <option value="0">Cidade</option>
            {cityOptions.map((city) => (
              <option value={city.nome}>
                {city.nome}
              </option>
            ))}
          </select>

          <div className="buttons">
            <Link to="/" className="cancel-button">Cancelar</Link>
            <button type="button" onClick={handleSignUp} className="create-account-button">Cadastrar</button>
          </div>
        </form>
      </div>

      <PopUpAlert status={"Cadastrado realizado com sucesso"} isOpen={alertSuccessSignUpIsOpen} setClosed={() => setAlertSuccessSignUpIsOpen(false)}/>
      <PopUpAlert status={"A senha deve ter no mínimo 8 caracteres"} isOpen={alertInvalidPasswordIsOpen} setClosed={() => setAlertInvalidPasswordIsOpen(false)}/>
      <PopUpAlert status={"Email ja cadastrado!"} isOpen={alertErrorEmailAlreadyExistIsOpen} setClosed={() => setAlertErrorEmailAlreadyExistIsOpen(false)}/>
      <PopUpAlert status={"Todos os campos são obrigatórios, tente novamente!"} isOpen={alertErrorSignUpIsOpen} setClosed={() => setAlertErrorSignUpIsOpen(false)}/>


    
    </div>
  )
}