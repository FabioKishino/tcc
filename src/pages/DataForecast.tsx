import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';

import Modal from 'react-modal';
import Select from "react-select";

import { HeaderComponent } from "../components/HeaderComponent";

import { customStyleModal, customStyleSelectDataForecast } from "../@types/customStyles";
import '../styles/pages/dataForecast.css';
import api from '../services/api';
import { X } from 'phosphor-react';
import { ForecastedData } from '../@types';
import { ForecastedDataComponent } from '../components/ForecastedDataComponent';


export function DataForecast() {

  const [daysToBeForecasted, setDaysToBeForecasted] = useState(0);
  const [selectedIngredients, setSelectedIngredients] = useState('');
  const [forecastedResultsIsOpen, setForecastedResultsIsOpen] = useState(false);
  const [forecastedData, setForecastedData] = useState<ForecastedData[]>([]);

  const [ingredientsOptions, setIngredientsOptions] = useState<{ value: string, label: string }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIngredientsOptions([]);
    const token = localStorage.getItem("@Auth:token");
    api.get('/ingredients/trained_models', {
      headers: {
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      const ingredients = [] as any[]
      response.data.map((i: string, index: number) => {

        ingredients.push({
          value: (index + 1).toString(),
          label: i
        })
      })
      setIngredientsOptions(ingredientsOptions.concat(ingredients));
    });
  }, [])

  function cancelDataForecast() {
    navigate('/home');
  }

  function handlePredictData() {
    setForecastedData([])
    if (daysToBeForecasted < 0 || !Number.isInteger(daysToBeForecasted)) {
      alert("A quantidade de dias deve ser positiva e inteira")
    } else if (selectedIngredients == '') {
      alert('Você deve selecionar ao menos 1 ingrediente')
    } else {
      const token = localStorage.getItem("@Auth:token");
      api.get(`/forecast?ingredients=${selectedIngredients}&days_to_be_forecasted=${daysToBeForecasted}`,
        {
          headers: {
            'ContentType': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }).then(res => {
          const data = [] as ForecastedData[];
          Object.keys(res.data).map((p: any) => {
            const ingredients = Object.keys(res.data[p]).map((i: string) => {
              return {
                name: i,
                amount: res.data[p][i] as number,
                unit: 'kg'
              }
            })
            data.push({
              date: p,
              ingredients
            })
          })
          setForecastedData(data)
          setForecastedResultsIsOpen(true);
        }).catch(err => {
          alert('Houve um problema na coleta, tente novamente')
          console.log(err)
        })
    }
  }

  return (
    <div id="data-forecast-page">
      <HeaderComponent title="Previsão de Dados" />

      <div className="data-forecast-page-content">
        <div className="data-forecast-select">
          <label>Ingredientes</label>
          <Select
            styles={customStyleSelectDataForecast}
            placeholder="Selecionar ingrediente"
            options={ingredientsOptions}
            isSearchable={false}
            isMulti={true}
            onChange={(e) => {
              const ingredients = e.map((i: { label: string }) => i.label).join('-')
              setSelectedIngredients(ingredients)
            }}
          />
        </div>

        <div className="data-forecast-input">
          <label>Quantidade de dias para previsão</label>
          <input onChange={(e) => isNaN(e.target.valueAsNumber) ? '' : setDaysToBeForecasted(e.target.valueAsNumber)} type="number" min="0" step="1" placeholder="Digite a quantidade de dias" />
        </div>


        <div className="data-forecast-buttons">
          <button onClick={cancelDataForecast} className="data-forecast-cancel-btn">CANCELAR</button>
          <button onClick={handlePredictData} className="data-forecast-confirm-btn">CONFIRMAR</button>

        </div>
      </div>

      <Modal
        isOpen={forecastedResultsIsOpen}
        onRequestClose={() => setForecastedResultsIsOpen(false)}
        style={customStyleModal}
      >
        <div className="data-forecast-header">
          <h1>Resultados</h1>
          <button onClick={() => setForecastedResultsIsOpen(false)}>
            <X size={50} weight="fill" />
          </button>
        </div>
        <hr
          style={{
            height: '1px',
            width: "90%",
            margin: "2px 0px"
          }}
        />
        <ul>
          {forecastedData.map((d, index) => <ForecastedDataComponent key={index} date={d.date} ingredients={d.ingredients}></ForecastedDataComponent>)}
        </ul>

      </Modal>

    </div>
  )
}