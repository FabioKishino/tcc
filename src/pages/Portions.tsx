import React, { useEffect, useState } from 'react';
import { PortionSizeProps } from '../@types';

import Modal from 'react-modal'

import { HeaderComponent } from '../components/HeaderComponent';
import { PortionComponent } from '../components/PortionComponent';

import { PlusCircle, Trash } from 'phosphor-react'
import { customStyleModalPortionSize } from '../@types/customStyles';
import '../styles/pages/portions.css';

Modal.setAppElement('#root')

export function Portions () {

  const [newPortionSize, setNewPortionSize] = useState(false);
  const [portionSize, setPortionSize] = useState<PortionSizeProps>({} as PortionSizeProps);
  const [portionSizeList, setPortionSizeList] = useState<PortionSizeProps[]>([]);


  function handleOpenNewPortionSize () {
    setNewPortionSize(true);
  }

  function handleCloseNewPortionSize () {
    setNewPortionSize(false);
  }
  
  function handleNewPortionSizeAndSubmit () {
    // This function should send the new portion size to the database and close the modal
    setPortionSizeList([...portionSizeList, portionSize]);
    console.log(portionSizeList);
    console.log('PENDING: New portion size sent to the database');
    setNewPortionSize(false);
  }

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const enteredName = event.target.value
    setPortionSize({ ...portionSize, name: enteredName })
  }

  const deletePortion = (index: any) => {
    var newPortionSizeList = [...portionSizeList];
    newPortionSizeList.splice(index, 1);
    setPortionSizeList(newPortionSizeList)
  }


  // Everytime this page is loaded, the list of all portions in the database has to be loaded
  useEffect(() => {
    console.log('Portions page loaded');
  }, [])
  

  return (
    <div id="portion-size-page">
      <HeaderComponent title="Porções"/>
      
      <Modal
        isOpen={newPortionSize}
        onRequestClose={handleCloseNewPortionSize}
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
          <button onClick={handleCloseNewPortionSize} className="data-cancel-btn">CANCELAR</button>
          <button onClick={handleNewPortionSizeAndSubmit} className="data-confirm-btn">CONFIRMAR</button>
        </div>
      </Modal>

      {portionSizeList.map((item, index) => <PortionComponent key={index} name={item.name} handleDeletePortion={() => deletePortion(index)}/>)}
      
      
      <button id="plus-icon-btn" className="plus-icon" onClick={handleOpenNewPortionSize}>
        <PlusCircle size={100} weight="fill"/>
      </button>

    </div> 
  )
}
