import { useState } from 'react'

import Modal from 'react-modal'

import '../styles/components/ingredientComponent.css';
import { Trash } from 'phosphor-react';
import { customStyleModalIngredients } from '../@types/customStyles';

import { IngredientsProps } from '../@types';

Modal.setAppElement('#root')

export function IngredientComponent ({ name }: IngredientsProps) {

  const [deleteIngredient, setDeleteIngredient] = useState(false);

  function handleOpenDeleteIngredient () {
    setDeleteIngredient(true);
  }

  function handleCloseDeleteIngredient () {
    setDeleteIngredient(false);
  }

  function handleCloseDeleteIngredientAndSubmit () {
    setDeleteIngredient(false);
    
    // Delete portion size from database.
  }
  
  return (
    <div className="ingredient-component">
      <div className="ingredient-content">
        <div className="ingredient-name">
          <p>{name}</p>
        </div>
      </div>

      <div className="delete-ingredient-btn">
        <button onClick={handleOpenDeleteIngredient}>
          <Trash size={75} weight="fill" />
        </button>
      </div>

      <Modal
        isOpen={deleteIngredient}
        onRequestClose={handleCloseDeleteIngredient}
        style={customStyleModalIngredients}
      >
        <div className="delete-ingredient-modal-content">
          <h1>Você tem certeza que deseja excluir o ingrediente cadastrado?</h1>
        </div>
      
        <div className="form-buttons"> 
          <button onClick={handleCloseDeleteIngredient} className="cancel-btn">CANCELAR</button>
          <button onClick={handleCloseDeleteIngredientAndSubmit} className="confirm-btn">CONFIRMAR</button>
        </div>
      </Modal>
    </div>
  )
}