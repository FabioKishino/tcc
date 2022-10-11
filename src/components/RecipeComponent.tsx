import { useEffect, useState } from 'react'
import Select from 'react-select';
import api from '../services/api';

import Modal from 'react-modal'

import { customStyleModal, customStyleModalRecipe, customStylesSelect } from '../@types/customStyles';
import { Recipe } from '../@types';

import { Pencil, Trash, X, List } from 'phosphor-react'
import '../styles/components/recipeComponent.css';

Modal.setAppElement('#root')

export function RecipeComponent({id, name}: Recipe) {

  const [editRecipeIsOpen, setEditRecipeIsOpen] = useState(false);
  const [deleteRecipeIsOpen, setDeleteRecipeIsOpen] = useState(false);
  const [closeDropDown, setCloseDropDown] = useState(false);

  function handleOpenEditRecipe() {
    setEditRecipeIsOpen(true);
    setCloseDropDown(true);
  }

  function handleCloseEditRecipe() {
    setEditRecipeIsOpen(false);
  }

  function handleCloseEditRecipeAndSubmit () {
    setEditRecipeIsOpen(false);
  }

  function handleOpenDeleteRecipe() {
    setDeleteRecipeIsOpen(true);
    setCloseDropDown(true);
  }

  function handleCloseDeleteRecipe() {
    setDeleteRecipeIsOpen(false);
  }

  function handleCloseDeleteRecipeAndSubmit () {
    setDeleteRecipeIsOpen(false);
  }

  useEffect(() => {
    setCloseDropDown(false);
  }, [editRecipeIsOpen || deleteRecipeIsOpen])
  

  // TO DO LIST
  // 1. Enviar criação
  // 2. Excluir do banco de dados a receita
  // 3. UseEffect para puxar as receitas
  // 4. Modal para editar
  // 5. Enviar edicao
  

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

        
          <div className="dropdown">
            <button className="dropdown-btn">
              <List size={35} weight="bold" color="black"/>
            </button>
            { closeDropDown == false && 
            <div className="dropdown-content">
              <div className="dropdown-link">
                <a onClick={handleOpenEditRecipe}><Pencil className="dropdown-icon" size={20} weight="fill" /></a>
                <a onClick={handleOpenEditRecipe}>Editar</a>
              </div>

              <div className="dropdown-link">
                <a onClick={handleOpenDeleteRecipe}><Trash className="dropdown-icon" size={20} weight="bold" /></a>
                <a onClick={handleOpenDeleteRecipe}>Excluir</a>
              </div>
            </div>
            }
          </div>


        {/* EDIT RECIPE MODAL */}
        <Modal
          isOpen={editRecipeIsOpen}
          onRequestClose={handleCloseEditRecipe}
          style={customStyleModal}
        >
          <div className="order-edit-header">
            <h1>Editar receita</h1>
            <button onClick={handleCloseEditRecipe}>
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
            <button onClick={handleCloseEditRecipe} className="cancel-edit-btn">CANCELAR</button>
            <button onClick={handleCloseEditRecipeAndSubmit} className="confirm-edit-btn">SALVAR ALTERAÇÕES</button>
          </div>
        </Modal>

        {/* DELETE RECIPE MODAL */}
        <Modal
          isOpen={deleteRecipeIsOpen}
          onRequestClose={handleCloseDeleteRecipe}
          style={customStyleModalRecipe}
        >
          <div className="delete-portion-size-modal-content">
            <h1>Você tem certeza que deseja excluir a receita cadastrada?</h1>
          </div>
        
          <div className="form-buttons"> 
            <button onClick={handleCloseDeleteRecipe} className="cancel-btn">CANCELAR</button>
            <button onClick={handleCloseDeleteRecipeAndSubmit} className="confirm-btn">CONFIRMAR</button>
          </div>
        </Modal>


      </div>
    </div>
  )
}