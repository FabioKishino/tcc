import { useEffect, useState } from 'react'
import Select from 'react-select';
import api from '../services/api';

import Modal from 'react-modal'

import { customStyleModal, customStyleModalRecipe, customStylesSelect } from '../@types/customStyles';
import { Recipe, RecipeIngredientsResponse } from '../@types';

import { Pencil, Trash, X, List } from 'phosphor-react'
import '../styles/components/recipeComponent.css';

Modal.setAppElement('#root')

export function RecipeComponent({id_recipe, name }: Recipe) {

  const [editRecipeIsOpen, setEditRecipeIsOpen] = useState(false);
  const [deleteRecipeIsOpen, setDeleteRecipeIsOpen] = useState(false);
  const [closeDropDown, setCloseDropDown] = useState(false);
  const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredientsResponse[]>([])
  const [showRecipeIngredientsIsOpen, setShowRecipeIngredientsIsOpen] = useState(false);

  function handleOpenEditRecipe() {
    setEditRecipeIsOpen(true);
    setCloseDropDown(true);
  }

  function handleCloseEditRecipe() {
    setEditRecipeIsOpen(false);
  }

  function handleCloseEditRecipeAndSubmit () {
    setEditRecipeIsOpen(false);
    // Missing edition of recipe
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

    const token = localStorage.getItem('@Auth:token');
    // Delete recipe from database
    api.delete(`/recipes/${id_recipe}`, {
      headers: {
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      alert('Receita deletada com sucesso!');
      window.location.reload()
    }).catch(error => {
      alert("Erro ao deletar essa receita! Tente novamente mais tarde!");
      console.log(error);
    })
  }


  useEffect(() => {
    setCloseDropDown(false);
  }, [editRecipeIsOpen || deleteRecipeIsOpen])


  function handleOpenShowRecipeIngredients() {
    setShowRecipeIngredientsIsOpen(true);
    setRecipeIngredients([])
    // Get ingredients by recipe id from database
    const token = localStorage.getItem('@Auth:token');

    api.get(`/recipes/${id_recipe}`, {
      headers: {
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      setRecipeIngredients(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

  function handleCloseShowRecipeIngredients() {
    setShowRecipeIngredientsIsOpen(false);
  }

  
  // TO DO LIST
  // 1. Enviar criação - DONE
  // 2. Exibir ingredientes da receita
  // 3. Excluir do banco de dados a receita - DONE
  // 4. UseEffect para puxar as receitas - DONE
  // 5. Modal para editar
  // 6. Enviar edicao
  

  return (
    <div id="recipe-list">
      <div className="recipe-component">
        <div className="recipe-content">
          <div className="recipe-name">
            <p>{name}</p>
          </div>
        </div>

        <div className="recipe-show-ingredients-button">
          <button onClick={handleOpenShowRecipeIngredients}>Exibir ingredientes</button>
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

        {/* SHOW RECIPE INGREDIENTS */}
        <Modal
          isOpen={showRecipeIngredientsIsOpen}
          onRequestClose={handleCloseShowRecipeIngredients}
          style={customStyleModalRecipe}
        >
          <div className="recipe-ingredients-header">
            <h1>Ingredientes</h1>
            <button onClick={handleCloseShowRecipeIngredients}>
              <X size={50} weight="fill" />
            </button>
          </div>

          <div className="recipe-ingredients-list">
            {recipeIngredients.map((item) => {return <li>{item.name}</li>})}
          </div> 
        </Modal>
      </div>
    </div>
  )
}