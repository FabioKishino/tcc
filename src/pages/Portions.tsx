import React, { useEffect, useState } from 'react';
import { PortionSizeProps } from '../@types';

import Modal from 'react-modal'

import { HeaderComponent } from '../components/HeaderComponent';
import { PortionComponent } from '../components/PortionComponent';

import { PlusCircle, Trash } from 'phosphor-react'
import { customStyleModalPortionSize } from '../@types/customStyles';
import '../styles/pages/portions.css';
import api from '../services/api';
import { PopUpAlert } from '../components/PopUpAlert';

Modal.setAppElement('#root')

export function Portions() {

  const [newPortionSize, setNewPortionSize] = useState(false);
  const [portionSize, setPortionSize] = useState<PortionSizeProps>({} as PortionSizeProps);
  const [portionSizeList, setPortionSizeList] = useState<PortionSizeProps[]>([]);
  const [alertSuccessCreateNewPortionSizeIsOpen, setAlertSuccessCreateNewPortionSizeIsOpen] = useState(false);
  const [alertErrorCreateNewPortionSizeIsOpen, setAlertErrorCreateNewPortionSizeIsOpen] = useState(false);

  function showModalSuccessCreateNewPortionSize () {
    setAlertSuccessCreateNewPortionSizeIsOpen(true)
  }

  function showModalErrorCreateNewPortionSize () {
    setAlertErrorCreateNewPortionSizeIsOpen(true)
  }

  function handleNewPortionSizeAndSubmit() {
    setNewPortionSize(false);
    setPortionSizeList([...portionSizeList, portionSize]);

    const token = localStorage.getItem('@Auth:token');
    api.post('/portionsizes', portionSize, {
      headers: {
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      showModalSuccessCreateNewPortionSize();
      setPortionSizeList([...portionSizeList, response.data]);
    }).catch(error => {
      showModalErrorCreateNewPortionSize();
    })
  }

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const enteredName = event.target.value
    setPortionSize({ ...portionSize, name: enteredName })
  }

  useEffect(() => {
    const token = localStorage.getItem("@Auth:token");
    api.get('/portionsizes', {
      headers: {
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => setPortionSizeList(response.data.portion_sizes));
  }, [])

  return (
    <div id="portion-size-page">
      <HeaderComponent title="Porções" />

      <Modal
        isOpen={newPortionSize}
        onRequestClose={() => setNewPortionSize(false)}
        style={customStyleModalPortionSize}
      >
        <div className="portion-size-modal-content">
          <h2>Insira o novo tamanho de porção</h2>
          <input
            type="text"
            className="new-portion-size-input"
            placeholder="Ex: 1/2"
            // value={portionSize.name}
            onChange={inputHandler}
          />
        </div>

        <div className="form-buttons">
          <button onClick={() => setNewPortionSize(false)} className="data-cancel-btn">CANCELAR</button>
          <button onClick={handleNewPortionSizeAndSubmit} className="data-confirm-btn">CONFIRMAR</button>
        </div>
      </Modal>

      {portionSizeList.length == 0 &&
        <div className="no-portion-sizes">
          <p>Não há tamanho de porções cadastradas :(</p>
        </div>
      }

      {portionSizeList.map((item, index) => <PortionComponent key={index} id={item.id} name={item.name} />)}

      <button id="plus-icon-btn" className="plus-icon" onClick={() => setNewPortionSize(true)}>
        <PlusCircle size={100} weight="fill" />
      </button>

      <PopUpAlert status={"Tamanho de Porção Cadastrado"} isOpen={alertSuccessCreateNewPortionSizeIsOpen} setClosed={() => setAlertSuccessCreateNewPortionSizeIsOpen(false)} />
      <PopUpAlert status={"Houve um problema, tente novamente."} isOpen={alertErrorCreateNewPortionSizeIsOpen} setClosed={() => setAlertErrorCreateNewPortionSizeIsOpen(false)} />

    </div>
  )
}
