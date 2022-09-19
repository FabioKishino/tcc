import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

import Select from "react-select";

import { HeaderComponent } from "../components/HeaderComponent";

import { customStyleSelectDataForecast } from "../@types/customStyles";
import '../styles/pages/dataForecast.css';


export function DataForecast () {
  const [ingredientsOptions, setIngredientsOptions] = useState([ 
    { 
      value: '1', 
      label: 'Salmão' 
    }, 
    { 
      value: '2', 
      label: 'Carne'
    }, 
    { 
      value: '3',
      label: 'Bacalhau'
    } 
  ]);
  const navigate = useNavigate();

  function cancelDataForecast () {
    navigate('/home');
  }

  return (
    <div id="data-forecast-page">
      <HeaderComponent title="Previsão de Dados"/>
      
      <div className="data-forecast-page-content">  
        <div className="data-forecast-select">
          <label>Ingredientes</label>
          <Select 
            styles={customStyleSelectDataForecast} 
            placeholder="Selecionar ingrediente"
            options={ingredientsOptions}
            isSearchable={false}
            isMulti={true}
          />
        </div>
        
        <div className="data-forecast-input">
          <label>Quantidade de dias para previsão</label>
          <input type="number" min="0" placeholder="Digite a quantidade de dias"/>
        </div>
        

        <div className="data-forecast-buttons">
          <button onClick={cancelDataForecast} className="data-forecast-cancel-btn">CANCELAR</button>
          <button className="data-forecast-confirm-btn">CONFIRMAR</button>
          
        </div>
      </div>
    </div>
  )
}