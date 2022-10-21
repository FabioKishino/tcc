import { useContext, useEffect, useState } from 'react'
import { OrdersContext } from '../contexts/OrderContext';

import Modal, { Styles } from 'react-modal'
import Select from 'react-select'

import { HeaderComponent } from '../components/HeaderComponent';
import { RecipeComponent } from '../components/RecipeComponent'
import { PopUpAlert } from '../components/PopUpAlert';

import { IngredientProps, RecipeIngredients, Recipe } from '../@types';
import { customStylesSelectIngredients, customStyleModalRecipes } from '../@types/customStyles';
import { PlusCircle, X } from 'phosphor-react'
import '../styles/pages/recipes.css';
import api from '../services/api';

Modal.setAppElement('#root')

export function Recipes() {

  const [newRecipe, setNewRecipe] = useState(false);
  const [recipe, setRecipe] = useState<Recipe>({} as Recipe);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [ingredientsOptions, setIngredientsOptions] = useState<any[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<RecipeIngredients[]>([]);
  
  const [alertSuccessIsOpen, setAlertConfirmationIsOpen] = useState<boolean>(false);
  const [alertErrorIsOpen, setAlertErrorIsOpen] = useState<boolean>(false);

  function handleOpenNewRecipe () {
    setNewRecipe(true);
  }

  function handleCloseNewRecipe () {
    setNewRecipe(false);
  }

  function showAlertSuccess () {
    setAlertConfirmationIsOpen(true);
  }

  function showAlertError () {
    setAlertErrorIsOpen(true);
  }

  async function handleCloseNewRecipeAndSubmit () {
    setNewRecipe(false);

    const recipe_data = {
      name: recipe.name,
      recipe_ingredients: selectedIngredients
    }
    
    const token = localStorage.getItem('@Auth:token');
    await api.post('/recipes', recipe_data, {
      headers: {
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      showAlertSuccess();
    }).catch(error => {
      showAlertError();
      console.log(error);
    })
  }

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const enteredName = event.target.value
    setRecipe({ ...recipe, name: enteredName })
  }

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
    }).catch(error => {
      showAlertError();
      console.log(error);
    })
  }, [])

  // Load all recipes from the database
  useEffect(() => {
    const token = localStorage.getItem("@Auth:token");
    api.get('/recipes', {
      headers: {
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      const recipes = [] as any[]
      response.data.recipes.map((r: any) => {
        recipes.push({
          id_recipe: r.id,
          name: r.name
        })
      })
      setRecipes(recipes);
    });
  }, [])

  return (
    <div id="recipe-page">
      <HeaderComponent title="Receitas" />

      {/* NEW RECIPE MODAL */}
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
            options={ingredientsOptions.map((i: IngredientProps, index: number) => {
              return {
                id_ingredient: i.id_ingredient,
                label: i.name,
                value: (index + 1).toString()
              }
            })}
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

      <div className="recipes-list">
        {recipes.map((item, index) => <RecipeComponent key={index} id_recipe={item.id_recipe} name={item.name}/>)}
      </div> 

      <button id="plus-icon-btn" className="plus-icon" onClick={handleOpenNewRecipe}>
        <PlusCircle size={100} weight="fill" />
      </button>


      <PopUpAlert status={"Receita cadastrada com sucesso!"} isOpen={alertSuccessIsOpen} setIsOpen={() => setAlertConfirmationIsOpen(false)}/>
      <PopUpAlert status={"Houve um problema, tente novamente."} isOpen={alertErrorIsOpen} setIsOpen={() => setAlertConfirmationIsOpen(false)}/>


    </div>
  )
}
