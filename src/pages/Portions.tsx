import { useEffect, useState } from 'react';

import Modal from 'react-modal'

import { HeaderComponent } from '../components/HeaderComponent';

import { PlusCircle } from 'phosphor-react'
import '../styles/pages/portions.css';

import { customStyleModalPortionSize } from '../@types/customStyles';

Modal.setAppElement('#root')

export function Portions () {

  const [newPortionSize, setNewPortionSize] = useState(false);

  function handleOpenNewPortionSize () {
    setNewPortionSize(true);
  }

  function handleCloseNewPortionSize () {
    setNewPortionSize(false);
  }
  
  function handleNewPortionSizeAndSubmit () {
    // This function should send the new portion size to the database and close the modal
    console.log('PENDING: New portion size sent to the database');
    setNewPortionSize(false);
  }

  // Everytime this page is loaded, the list of all portions in the database has to be loaded
  useEffect(() => {
    console.log('Portions page loaded');
  }, [])
  

  return (
    <div id="recipe-page">
      <HeaderComponent title="Porções"/>
      

      <Modal
        isOpen={newPortionSize}
        onRequestClose={handleCloseNewPortionSize}
        style={customStyleModalPortionSize}
      >
        <div className="portion-size-modal-content">
          <h2>Insira o novo tamanho de porção</h2>
          <input type="text" className="new-portion-size-input"/>
        </div>
        
        <div className="form-buttons">
          <button onClick={handleCloseNewPortionSize} className="data-cancel-btn">CANCELAR</button>
          <button onClick={handleNewPortionSizeAndSubmit} className="data-confirm-btn">CONFIRMAR</button>
        </div>
      </Modal>
      
      
      <button id="plus-icon-btn" className="plus-icon" onClick={handleOpenNewPortionSize}>
        <PlusCircle size={100} weight="fill"/>
      </button>
    </div> 
  )
}
