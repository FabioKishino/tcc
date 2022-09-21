import { useState } from 'react'

import Modal from 'react-modal'

import '../styles/components/ingredientComponent.css';
import { Trash } from 'phosphor-react';
import { customStyleModalIngredients } from '../@types/customStyles';

import { IngredientProps } from '../@types';
import api from '../services/api';

Modal.setAppElement('#root')

export function IngredientComponent ({ id, name }: IngredientProps) {

  const [deleteIngredient, setDeleteIngredient] = useState(false);

  function handleOpenDeleteIngredient () {
    setDeleteIngredient(true);
  }

  function handleCloseDeleteIngredient () {
    setDeleteIngredient(false);
  }

  function handleCloseDeleteIngredientAndSubmit () {
    setDeleteIngredient(false);
    
    const token = localStorage.getItem('@Auth:token');
    api.delete(`/ingredients/${id}`, {
      headers: {
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      alert('Ingredient deleted successfully!');
      window.location.reload()
    }).catch(error => {
      alert("Error deleting Ingredient! Try again later.");
      console.log(error);
    })
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