import { useState } from 'react';

import Modal from 'react-modal'

import { HeaderComponent } from '../components/HeaderComponent';
import { IngredientComponent } from '../components/IngredientComponent';

import { PlusCircle } from 'phosphor-react'
import { customStyleModalIngredients } from '../@types/customStyles';
import '../styles/pages/ingredients.css';


Modal.setAppElement('#root')

export function Ingredients () {
  const [newIngredient, setNewIngredient] = useState(false);

  function handleOpenNewIngredient () {
    setNewIngredient(true);
  }

  function handleCloseNewIngredient () {
    setNewIngredient(false);
  }

  function handleCloseNewIngredientAndSubmit () {
    // This function should send the new ingredient to the database and close the modal
    console.log('PENDING: New ingredient sent to the database');
    setNewIngredient(false);
  }


  return (
    <div id="ingredients-page">
      <HeaderComponent title="Ingredientes"/>
      
    
      <Modal
        isOpen={newIngredient}
        onRequestClose={handleCloseNewIngredient}
        style={customStyleModalIngredients}
      >
        <div className="ingredients-modal-content">
          <h2>Insira o nome do novo ingrediente</h2>
          <input 
            type="text" 
            className="ingredients-input"
            placeholder="Ex: Salmão"
          />
        </div>
        
        <div className="form-buttons">
          <button onClick={handleCloseNewIngredient} className="data-cancel-btn">CANCELAR</button>
          <button onClick={handleCloseNewIngredientAndSubmit} className="data-confirm-btn">CONFIRMAR</button>
        </div>
      </Modal>

      <IngredientComponent name="Ingrediente Teste"/>


      <button id="plus-icon-btn" className="plus-icon" onClick={handleOpenNewIngredient}>
        <PlusCircle size={100} weight="fill"/>
      </button>
    </div> 
  )
}
