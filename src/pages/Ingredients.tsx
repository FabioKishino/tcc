import { useEffect, useState } from 'react';

import Modal from 'react-modal'

import { HeaderComponent } from '../components/HeaderComponent';
import { IngredientComponent } from '../components/IngredientComponent';
import { PopUpAlert } from '../components/PopUpAlert';

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

  const [alertSuccessIsOpen, setAlertSuccessIsOpen] = useState(false);
  const [alertErrorIsOpen, setAlertErrorIsOpen] = useState(false);

  function handleOpenNewIngredient() {
    setNewIngredientModal(true);
  }

  function handleCloseNewIngredient() {
    setNewIngredientModal(false);
  }

  function showAlertSuccessCreateNewIngredient() {
    setAlertSuccessIsOpen(true);
  }
  
  function showModalErrorCreateNewIngredient() {
    setAlertErrorIsOpen(true);
  }

  function handleCloseNewIngredientAndSubmit() {
    const token = localStorage.getItem("@Auth:token");
    api.post('/ingredients', ingredient,
      {
        headers: {
          'ContentType': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        setIngredients(ingredients.concat(res.data))
        showAlertSuccessCreateNewIngredient();
      }).catch(err => {
        showModalErrorCreateNewIngredient();
        console.log(err);
      });
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
    }).then(res => setIngredients(res.data.ingredients));
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
          <p>Não há ingredientes cadastrados :(</p>
        </div>
      }

      {ingredients.map((item, index) => <IngredientComponent key={index} id_ingredient={item.id_ingredient} name={item.name} />)}


      <button id="plus-icon-btn" className="plus-icon" onClick={handleOpenNewIngredient}>
        <PlusCircle size={100} weight="fill" />
      </button>

      <PopUpAlert status={"Ingrediente Cadastrado"} isOpen={alertSuccessIsOpen} setClosed={() => setAlertSuccessIsOpen(false)}/>
      <PopUpAlert status={"Houve um problema, tente novamente."} isOpen={alertErrorIsOpen} setClosed={() => setAlertErrorIsOpen(false)}/>

    </div>
  )
}
