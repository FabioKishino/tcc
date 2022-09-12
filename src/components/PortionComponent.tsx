import { useState } from 'react'

import Modal from 'react-modal'

import '../styles/components/portionComponent.css';
import { PortionSizeProps } from '../@types'
import { Trash } from 'phosphor-react';
import { customStyleModalPortionSize } from '../@types/customStyles';


Modal.setAppElement('#root')

export function PortionComponent ({ portionSize }: PortionSizeProps) {

  const [deletePortion, setDeletePortion] = useState(false);

  function handleOpenDeletePortionSize () {
    setDeletePortion(true);
  }

  function handleCloseDeletePortionSize () {
    setDeletePortion(false);
  }

  function handleCloseDeletePortionSizeAndSubmit () {
    setDeletePortion(false);
    
    // Delete portion size from database.
  }
  
  return (
    <div className="portion-size-component">
      <div className="portion-size-content">
        <div className="portion-size-name">
          <p>{portionSize}</p>
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