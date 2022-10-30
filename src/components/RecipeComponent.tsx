import { useEffect, useState } from 'react'
import Select from 'react-select';
import api from '../services/api';

import Modal from 'react-modal'
import { PopUpAlert } from './PopUpAlert';

import { customStyleModalEditRecipe, customStyleModalRecipe, customStyleModalShowIngredients, customStylesSelect } from '../@types/customStyles';
import { IngredientProps, Recipe, RecipeIngredients } from '../@types';

import { Pencil, Trash, X, List } from 'phosphor-react'
import '../styles/components/recipeComponent.css';


Modal.setAppElement('#root')

export function RecipeComponent({ id_recipe, name }: Recipe) {

  const [editRecipeIsOpen, setEditRecipeIsOpen] = useState(false);
  const [deleteRecipeIsOpen, setDeleteRecipeIsOpen] = useState(false);
  const [closeDropDown, setCloseDropDown] = useState(false);

  const [recipeIngredients, setRecipeIngredients] = useState<any[]>([])
  const [showRecipeIngredientsIsOpen, setShowRecipeIngredientsIsOpen] = useState(false);
  const [ingredientOptions, setIngredientOptions] = useState<any[]>([]);

  const [recipe, setRecipe] = useState<Recipe>({} as Recipe);
  const [selectedIngredients, setSelectedIngredients] = useState<RecipeIngredients[]>([]);

  const [modalSuccessEditIsOpen, setModalSuccessEditIsOpen] = useState<boolean>(false);
  const [modalErrorEditIsOpen, setModalErrorEditIsOpen] = useState<boolean>(false);

  const [modalSuccessDeleteIsOpen, setModalSuccessDeleteIsOpen] = useState<boolean>(false);
  const [modalErrorDeleteIsOpen, setModalErrorDeleteIsOpen] = useState<boolean>(false);

  useEffect(() => {
    // Get Ingredients Options
    setIngredientOptions([])
    const token = localStorage.getItem('@Auth:token');
    api.get('/ingredients', {
      headers: {
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      const ingredients = [] as any[]
      response.data.ingredients.map((i: any, index: number) => {

        ingredients.push({
          id_ingredient: i.id,
          name: i.name,
          label: i.name,
          value: (index + 1).toString()
        })
      })
      setIngredientOptions(ingredients);
    }).catch(error => {
      console.log(error);
    })
  }, [])

  function showModalSuccessEdit() {
    setModalSuccessEditIsOpen(true);
  }

  function showModalErrorEdit() {
    setModalErrorEditIsOpen(true);
  }

  function showModalSuccessDelete() {
    setModalSuccessDeleteIsOpen(true);
  }

  function showModalErrorDelete() {
    setModalErrorDeleteIsOpen(true);
  }

  function handleCloseSuccessEditRecipe() {
    setModalSuccessEditIsOpen(false);
    window.location.reload();
  }

  function handleCloseErrorEditRecipe() {
    setModalErrorEditIsOpen(false);
    window.location.reload();
  }

  function handleCloseSuccessDeleteRecipe() {
    setModalErrorEditIsOpen(false);
    window.location.reload();
  }

  function handleCloseErrorDeleteRecipe() {
    setModalErrorDeleteIsOpen(false);
    window.location.reload();
  }

  function handleOpenEditRecipe() {
    setEditRecipeIsOpen(true);
    setCloseDropDown(true);

    const token = localStorage.getItem('@Auth:token');
    api.get(`/recipes/${id_recipe}`, {
      headers: {
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      setRecipeIngredients(response.data.ingredients);
      setSelectedIngredients(response.data.ingredients.map((i: any) => {
        return {
          id_ingredient: i.ingredient.id,
          amount: i.amount,
          unit: i.unit
        }
      }));
      setRecipe({ ...recipe, name: name })
    }).catch(error => {
      console.log(error);
    })

  }

  function handleCloseEditRecipeAndSubmit() {
    setEditRecipeIsOpen(false);
    handleRecipeEdit();
  }

  function handleOpenDeleteRecipe() {
    setDeleteRecipeIsOpen(true);
    setCloseDropDown(true);
  }

  function handleCloseDeleteRecipeAndSubmit() {
    setDeleteRecipeIsOpen(false);

    const token = localStorage.getItem('@Auth:token');
    // Delete recipe from database
    api.delete(`/recipes/${id_recipe}`, {
      headers: {
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      showModalSuccessDelete();
    }).catch(error => {
      showModalErrorDelete();
      console.log(error);
    })
  }

  useEffect(() => {
    setCloseDropDown(false);
  }, [editRecipeIsOpen || deleteRecipeIsOpen])


  function handleOpenShowRecipeIngredients() {
    setShowRecipeIngredientsIsOpen(true);
    setRecipeIngredients([])
    const token = localStorage.getItem('@Auth:token');

    api.get(`/recipes/${id_recipe}`, {
      headers: {
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      setRecipeIngredients(response.data.ingredients);
    }).catch(error => {
      console.log(error);
    })
  }

  function handleCloseShowRecipeIngredients() {
    setShowRecipeIngredientsIsOpen(false);
  }

  const recipeNameInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const enteredRecipeName = event.target.value
    setRecipe({ ...recipe, name: enteredRecipeName })
    console.log(recipe)
  }

  // Function to handle recipe edit
  function handleRecipeEdit() {
    const recipe_edit_data = {
      name: recipe.name,
      recipe_ingredients: selectedIngredients
    }

    const token = localStorage.getItem('@Auth:token');
    api.put(`/recipes/${id_recipe}`, recipe_edit_data,
      {
        headers: {
          'ContentType': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then(res => {
        setRecipe(res.data)
        showModalSuccessEdit();
      }).catch(err => {
        showModalErrorEdit();
      });
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
          <button onClick={handleOpenShowRecipeIngredients}>Exibir ingredientes</button>
        </div>

        <div className="dropdown">
          <button className="dropdown-btn">
            <List size={35} weight="bold" color="black" />
          </button>
          {closeDropDown == false &&
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
          onRequestClose={() => setEditRecipeIsOpen(false)}
          style={customStyleModalEditRecipe}
        >
          <div className="recipe-edit-header">
            <h1>Editar receita</h1>
            <button onClick={() => setEditRecipeIsOpen(false)}>
              <X size={50} weight="fill" />
            </button>
          </div>
          <div className="recipe-edit-form">
            <form>
              <label>Prato</label>
              <input
                id='ingredients-select'
                type="text"
                defaultValue={name}
                required
                onChange={recipeNameInputHandler}
              />

              <label>Ingredientes</label>
              <Select
                styles={customStylesSelect}
                placeholder="Selecione os ingredientes da receita"
                options={ingredientOptions}
                defaultValue={ingredientOptions.filter((i) => recipeIngredients.find((ri: any) => ri.ingredient.id == i.id_ingredient))}
                isSearchable={false}
                isMulti={true}
                onChange={(e) => {
                  const ingredients = e.map((i: any) => {
                    return {
                      id_ingredient: i.id_ingredient,
                      amount: 0,
                      unit: "g"
                    }
                  }) as RecipeIngredients[];
                  setSelectedIngredients(ingredients);
                }}
              />
            </form>
          </div>
          <div className="form-buttons">
            <button onClick={() => setEditRecipeIsOpen(false)} className="cancel-edit-btn">CANCELAR</button>
            <button onClick={handleCloseEditRecipeAndSubmit} className="confirm-edit-btn">SALVAR ALTERAÇÕES</button>
          </div>
        </Modal>

        {/* DELETE RECIPE MODAL */}
        <Modal
          isOpen={deleteRecipeIsOpen}
          onRequestClose={() => setDeleteRecipeIsOpen(false)}
          style={customStyleModalRecipe}
        >
          <div className="delete-portion-size-modal-content">
            <h2>Você tem certeza que deseja excluir a receita cadastrada?</h2>
          </div>

          <div className="form-buttons">
            <button onClick={() => setDeleteRecipeIsOpen(false)} className="cancel-btn">CANCELAR</button>
            <button onClick={handleCloseDeleteRecipeAndSubmit} className="confirm-btn">CONFIRMAR</button>
          </div>
        </Modal>

        {/* SHOW RECIPE INGREDIENTS */}
        <Modal
          isOpen={showRecipeIngredientsIsOpen}
          onRequestClose={handleCloseShowRecipeIngredients}
          style={customStyleModalShowIngredients}
        >
          <div className="recipe-ingredients-header">
            <h1>Ingredientes</h1>
            <button onClick={handleCloseShowRecipeIngredients}>
              <X size={50} weight="fill" />
            </button>
          </div>

          <div className="recipe-ingredients-list">
            {recipeIngredients.map((item) => {
              return (
                <li>{item.ingredient.name}</li>
              );
            })}
          </div>
        </Modal>

        <PopUpAlert status={"Prato Atualizado!"} isOpen={modalSuccessEditIsOpen} setClosed={handleCloseSuccessEditRecipe} />
        <PopUpAlert status={"Houve um problema, tente novamente."} isOpen={modalErrorEditIsOpen} setClosed={handleCloseErrorEditRecipe} />

        <PopUpAlert status={"Prato Deletado"} isOpen={modalSuccessDeleteIsOpen} setClosed={handleCloseSuccessDeleteRecipe} />
        <PopUpAlert status={"Houve um problema, tente novamente."} isOpen={modalErrorDeleteIsOpen} setClosed={handleCloseErrorDeleteRecipe} />

      </div>
    </div>
  )
}