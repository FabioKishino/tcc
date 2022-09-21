import { useState } from 'react'

import Modal from 'react-modal'

import '../styles/components/portionComponent.css';
import { PortionSizeProps } from '../@types'
import { Trash } from 'phosphor-react';
import { customStyleModalPortionSize } from '../@types/customStyles';
import api from '../services/api';


Modal.setAppElement('#root')

export function PortionComponent ({ id, name }: PortionSizeProps) {

  const [deletePortion, setDeletePortion] = useState(false);

  function handleOpenDeletePortionSize () {
    setDeletePortion(true);
  }

  function handleCloseDeletePortionSize () {
    setDeletePortion(false);
  }

  function handleCloseDeletePortionSizeAndSubmit () {
    setDeletePortion(false);

    const token = localStorage.getItem('@Auth:token');
    api.delete(`/portionsizes/${id}`, {
      headers: {
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      alert('Portion size deleted successfully!');
      window.location.reload()
    }).catch(error => {
      alert("Error deleting portion size! Try again later.");
      console.log(error);
    })
  }
  
  return (
    <div className="portion-size-component">
      <div className="portion-size-content">
        <div className="portion-size-name">
          <p>{name}</p>
        </div>
      </div>

      <div className="delete-portion-size-btn">
        <button onClick={handleOpenDeletePortionSize}>
          <Trash size={75} weight="fill" />
        </button>
      </div>

      <Modal
        isOpen={deletePortion}
        onRequestClose={handleCloseDeletePortionSize}
        style={customStyleModalPortionSize}
      >
        <div className="delete-portion-size-modal-content">
          <h1>Você tem certeza que deseja excluir a porção cadastrada?</h1>
        </div>
      
        <div className="form-buttons"> 
          <button onClick={handleCloseDeletePortionSize} className="cancel-btn">CANCELAR</button>
          <button onClick={handleCloseDeletePortionSizeAndSubmit} className="confirm-btn">CONFIRMAR</button>
        </div>
      </Modal>
    </div>
  )
}