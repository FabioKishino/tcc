import { Link } from 'react-router-dom'

import { HeaderComponent } from '../components/HeaderComponent';
import Select from 'react-select'

import '../styles/pages/user.css';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { UProfile } from '../@types';

const customStyles = {
  menuList: (provided: any) => ({
    ...provided,
    backgroundColor: '#DCDCDC',
    color: 'black',
    padding: 20,
    maxHeight: '25vh'
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

interface IBGEUF {
  sigla: string;
  nome: string;
  label: string;
  value: string;
}

interface IBGECITY {
  id: number;
  nome: string;
  label: string;
  value: string;
}

export function User() {

  const [user, setUser] = useState<UProfile>({ city: '', 'email': '', id: '', name: '', 'state': '' });
  const [UFs, setUFs] = useState<IBGEUF[]>([])
  const [selectedUF, setSelectedUF] = useState('PR')
  const [selectedCity, setSelectedCity] = useState('')
  const [cityOptions, setCityOptions] = useState<IBGECITY[]>([])

  useEffect(() => {

    api.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
      .then(res => {
        const ufs = [] as IBGEUF[];
        res.data.map((r: any, index: number) => {
          ufs.push({
            sigla: r.sigla,
            nome: r.nome,
            label: r.sigla,
            value: (index + 1).toString()
          })
        })
        setUFs(ufs)
      })
      .catch(err => console.log(err));

    const token = localStorage.getItem("@Auth:token");
    api.get('/restaurants',
      {
        headers: {
          'ContentType': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => setUser(res.data))
      .catch(err => alert(err.message));
  }, [])

  useEffect(() => {
    api.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`)
      .then(res => {
        const cities = [] as IBGECITY[];
        res.data.map((c: any, index: number) => {
          cities.push({
            id: c.id,
            nome: c.nome,
            label: c.nome,
            value: (index + 1).toString()
          })
        })
        setCityOptions(cities)
      }
      );

  }, [selectedUF])

  function handleUserEdit() {
    const token = localStorage.getItem("@Auth:token");
    api.put('/restaurants', user,
      {
        headers: {
          'ContentType': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => setUser(res.data))
      .catch(err => alert(err.message));
  }

  return (
    <div id="page-user">
      <HeaderComponent title="Editar Restaurante" />
      <div className="container">
        {user.id ?
          (
            <form>
              <label>E-mail</label>
              <input type="email" defaultValue={user.email} placeholder={'Digite seu email'} onChange={(e) => setUser({ ...user, email: e.target.value })} />
              <label>Nome</label>
              <input type="text" defaultValue={user.name} placeholder={'Digite o nome do restaurante'} onChange={(e) => setUser({ ...user, name: e.target.value })} />
              <label>Estado</label>
              <Select
                styles={customStyles}
                className="select-city"
                options={UFs}
                defaultValue={UFs.find((u) => u.sigla == user.state)}
                onChange={(e) => [setSelectedUF(e?.sigla as string), setUser({ ...user, state: e?.sigla as string })]}
              />
              <label>Cidade</label>
              <Select
                styles={customStyles}
                className="select-city"
                options={cityOptions}
                defaultValue={cityOptions.find((c) => c.nome == user.city)}
                onChange={(e) => [setSelectedCity(e?.nome as string), setUser({ ...user, city: e?.nome as string })]}
              />

              <div className="buttons">
                <Link to="/home" className="cancel-button">Cancelar</Link>
                <Link to="/home" onClick={handleUserEdit} className="confirm-button">Confirmar</Link>
              </div>
            </form>

          ) : null}
      </div>
    </div>
  )
}
