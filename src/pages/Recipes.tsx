import { useContext, useEffect, useState } from 'react'
import { OrdersContext } from '../contexts/OrderContext';

import Modal, { Styles } from 'react-modal'
import Select from 'react-select'

import { HeaderComponent } from '../components/HeaderComponent';
import { RecipeComponent } from '../components/RecipeComponent'

import { IngredientProps, Recipe } from '../@types';
import { customStylesSelectIngredients, customStyleModalRecipes } from '../@types/customStyles';
import { PlusCircle, X } from 'phosphor-react'
import '../styles/pages/recipes.css';
import api from '../services/api';

Modal.setAppElement('#root')

export function Recipes() {

  const [newRecipe, setNewRecipe] = useState(false);
  const [recipe, setRecipe] = useState<Recipe>({} as Recipe);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  function handleOpenNewRecipe () {
    setNewRecipe(true);
  }

  function handleCloseNewRecipe () {
    setNewRecipe(false);
  }

  function handleCloseNewRecipeAndSubmit () {
    setNewRecipe(false);
  }

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const enteredName = event.target.value
    setRecipe({ ...recipe, name: enteredName })
  }

  const [ingredientsOptions, setIngredientsOptions] = useState<any[]>([]);

  useEffect(() => {
    setIngredientsOptions([]);
    const token = localStorage.getItem("@Auth:token");
    api.get('/ingredients', {
      headers: {
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      const ingredients = [] as any[]
      response.data.ingredients.map((i: any) => {

        ingredients.push({
          id_ingredient: i.id,
          name: i.name
        })
      })
      setIngredientsOptions(ingredientsOptions.concat(ingredients));
    });

  }, [])


  return (
    <div id="recipe-page">
      <HeaderComponent title="Receitas" />

      <Modal
        isOpen={newRecipe}
        onRequestClose={handleCloseNewRecipe}
        style={customStyleModalRecipes as Styles}
      >
        <div className="recipe-modal-content">
          <label>Receita</label>
          <input
            type="text"
            className="new-recipe-input"
            placeholder="Digite o nome da receita..."
            onChange={inputHandler}
          />

          <label>Ingredientes</label>
          <Select
            styles={customStylesSelectIngredients}
            className="new-recipe-select"
            placeholder="Selecione os ingredientes..."
            options={ingredientsOptions.map((i: Recipe, index: number) => {
              return {
                id: i.id,
                label: i.name,
                value: (index + 1).toString()
              }
            })}
            isSearchable={false}
            isMulti={true}
            // onChange={selection => {
            //   const newRecipe = recipe
            //   newRecipe.ingredients = selection ? selection.value : ''
            //   setNewRecipe(newRecipe)
            //   }
            // } 
          />
        </div>


        <div className="form-buttons">
          <button onClick={handleCloseNewRecipe} className="data-cancel-btn">CANCELAR</button>
          <button onClick={handleCloseNewRecipeAndSubmit} className="data-confirm-btn">CONFIRMAR</button>
        </div>
      </Modal>

      {recipes.length == 0 &&
        <div className="no-recipes">
          <p>Não há receitas cadastradas :(</p>
        </div>
      }

      {/* {recipes.map((item, index) => <RecipeComponent key={index} id={item.id} name={item.name} />)} */}

      <button id="plus-icon-btn" className="plus-icon" onClick={handleOpenNewRecipe}>
        <PlusCircle size={100} weight="fill" />
      </button>
    </div>
  )
}
