import { useContext, useState } from 'react'
import Select from 'react-select';

import { OrdersContext } from '../contexts/OrderContext';
import { Recipe } from '../@types';

import Modal from 'react-modal'

import { Info, Pencil, Trash, X } from 'phosphor-react'
import '../styles/components/recipeComponent.css';
import { customStyleModal, customStylesSelect } from '../@types/customStyles';
import api from '../services/api';

Modal.setAppElement('#root')

export function RecipeComponent({id, name}: Recipe) {

  const [editRecipeIsOpen, setEditRecipeIsOpen] = useState(false);

  function handleOpenEditMenu() {
    setEditRecipeIsOpen(true);
  }

  function handleCloseEditMenu() {
    setEditRecipeIsOpen(false);
  }

  function handleCloseEditMenuAndSubmit () {
    setEditRecipeIsOpen(false);
  }

  return (
    <div id="recipe-list">
      <div className="recipe-component">
        <div className="recipe-content">
          <div className="recipe-name">
            <p>{name}</p>
          </div>
        </div>

          <div className="recipe-show-ingredients-button">
            <button>Exibir ingredientes</button>  
          </div>

        <div className="recipe-btns">

          <button onClick={handleOpenEditMenu}>
            <Pencil size={50} weight="fill" />
          </button>

          {/* <button onClick={handleOpenEditMenu}>
            <Trash size={50} weight="fill" />
          </button> */}


          {/* EDIT RECIPE MODAL */}
          <Modal
            isOpen={editRecipeIsOpen}
            onRequestClose={handleCloseEditMenu}
            style={customStyleModal}
          >
            <div className="order-edit-header">
              <h1>Editar receita</h1>
              <button onClick={handleCloseEditMenu}>
                <X size={50} weight="fill" />
              </button>
            </div>
            <div className="order-edit-form">
              <form>
                <label>Prato</label>
                <Select
                  styles={customStylesSelect}
                  className="new-order-select"
                  isDisabled
                  // defaultValue={recipeOptions.find((r) => r.label == props.recipe?.name)}
                  placeholder={name}
                  // options={recipeOptions}
                  isSearchable={false}
                />
              </form>
            </div>
            <div className="form-buttons">
              <button onClick={handleCloseEditMenu} className="cancel-edit-btn">CANCELAR</button>
              <button onClick={handleCloseEditMenuAndSubmit} className="confirm-edit-btn">SALVAR ALTERAÇÕES</button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  )
}