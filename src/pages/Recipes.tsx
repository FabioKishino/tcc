import { useContext, useEffect, useState } from 'react'
import { OrdersContext } from '../contexts/OrderContext';

import Modal from 'react-modal'
import Select from 'react-select'

import { HeaderComponent } from '../components/HeaderComponent';
import { RecipeComponent } from '../components/RecipeComponent'

import { customStyleModal, customStylesSelect } from '../@types/customStyles';
import { PlusCircle, X } from 'phosphor-react'
import '../styles/pages/recipes.css';

Modal.setAppElement('#root')

export function Recipes() {

  const [recipeOptions, setRecipeOptions] = useState([{ value: '1', label: 'Salmão grelhado' }, { value: '2', label: 'Yakisoba' }]);

  // Everytime this page is loaded, the list of all recipes in the database has to be loaded
  useEffect(() => {
    console.log('teste');
  }, [])


  return (
    <div id="recipe-page">
      <HeaderComponent title="Receitas" handleInfo={() => null} />

      <div className="content">
        <RecipeComponent recipe={'Yakisoba'} />
      </div>

      <button id="plus-icon-btn" className="plus-icon">
        <PlusCircle size={100} weight="fill" />
      </button>
    </div>
  )
}
