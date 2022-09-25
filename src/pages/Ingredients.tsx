import { useEffect, useState } from 'react';

import Modal from 'react-modal'

import { HeaderComponent } from '../components/HeaderComponent';
import { IngredientComponent } from '../components/IngredientComponent';

import { PlusCircle } from 'phosphor-react'
import { customStyleModalIngredients } from '../@types/customStyles';
import { IngredientProps } from '../@types';
import '../styles/pages/ingredients.css';
import api from '../services/api';


Modal.setAppElement('#root')

export function Ingredients() {
  const [newIngredientModal, setNewIngredientModal] = useState(false);
  const [ingredient, setIngredient] = useState<IngredientProps>({} as IngredientProps);
  const [ingredients, setIngredients] = useState<IngredientProps[]>([]);


  function handleOpenNewIngredient() {
    setNewIngredientModal(true);
  }

  function handleCloseNewIngredient() {
    setNewIngredientModal(false);
  }

  function handleCloseNewIngredientAndSubmit() {
    // This function should send the new ingredient to the database and close the modal
    console.log('PENDING: New ingredient sent to the database');
    setNewIngredientModal(false);
  }

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const enteredName = event.target.value
    setIngredient({ ...ingredient, name: enteredName })
  }

  useEffect(() => {
    const token = localStorage.getItem("@Auth:token");
    api.get('/ingredients', {
      headers: {
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => setIngredients(response.data.ingredients));
  }, [])


  return (
    <div id="ingredients-page">
      <HeaderComponent title="Ingredientes" />

      <Modal
        isOpen={newIngredientModal}
        onRequestClose={handleCloseNewIngredient}
        style={customStyleModalIngredients}
      >
        <div className="ingredients-modal-content">
          <h2>Insira o nome do novo ingrediente</h2>
          <input
            type="text"
            className="ingredients-input"
            placeholder="Ex: Salmão"
            onChange={inputHandler}
          />
        </div>

        <div className="form-buttons">
          <button onClick={handleCloseNewIngredient} className="data-cancel-btn">CANCELAR</button>
          <button onClick={handleCloseNewIngredientAndSubmit} className="data-confirm-btn">CONFIRMAR</button>
        </div>
      </Modal>

      {ingredients.length == 0 &&
        <div className="no-portion-sizes">
          <p>Não há tamanho de porções cadastradas :(</p>
        </div>
      }

      {ingredients.map((item, index) => <IngredientComponent key={index} id={item.id} name={item.name} />)}


      <button id="plus-icon-btn" className="plus-icon" onClick={handleOpenNewIngredient}>
        <PlusCircle size={100} weight="fill" />
      </button>
    </div>
  )
}
