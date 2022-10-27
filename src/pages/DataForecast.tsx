import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import api from '../services/api';

import Modal from 'react-modal';
import Select from "react-select";

import { HeaderComponent } from "../components/HeaderComponent";
import { ForecastedDataComponent } from '../components/ForecastedDataComponent';
import { PopUpAlert } from '../components/PopUpAlert';

import { X } from 'phosphor-react';
import { customStyleModal, customStyleSelectDataForecast } from "../@types/customStyles";
import '../styles/pages/dataForecast.css';

import { ForecastedData } from '../@types';

export function DataForecast() {

  const [daysToBeForecasted, setDaysToBeForecasted] = useState(0);
  const [selectedIngredients, setSelectedIngredients] = useState('');
  const [forecastedResultsIsOpen, setForecastedResultsIsOpen] = useState(false);
  const [forecastedData, setForecastedData] = useState<ForecastedData[]>([]);

  const [ingredientsOptions, setIngredientsOptions] = useState<{ value: string, label: string }[]>([]);
  const [alertErrorLoadTrainedModels, setAlertErrorLoadTrainedModels] = useState(false);
  const [alertErrorPredictDataIsOpen, setAlertErrorPredictDataIsOpen] = useState(false);
  const [alertErrorPredictDaysIsOpen, setAlertErrorPredictDaysIsOpen] = useState(false);
  const [alertErrorPredictIngredientsIsOpen, setAlertErrorPredictIngredientsIsOpen] = useState(false);
  
  const navigate = useNavigate();

  function showModalErrorLoadTrainedModels () {
    setAlertErrorLoadTrainedModels(true);
  }
 
  function showModalErrorPredictData () {
    setAlertErrorPredictDataIsOpen(true);
  }

  function showModalErrorPredictDays () {
    setAlertErrorPredictDaysIsOpen(true);
  }

  function showModalErrorPredictIngredients () {
    setAlertErrorPredictIngredientsIsOpen(true);
  }

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
    }).catch(err => {
      showModalErrorLoadTrainedModels();
      console.log(err)
    });
  }, [])

  function cancelDataForecast() {
    navigate('/home');
  }

  function handlePredictData() {
    setForecastedData([])
    if (daysToBeForecasted < 0 || !Number.isInteger(daysToBeForecasted)) {
      showModalErrorPredictDays();
    } else if (selectedIngredients == '') {
      showModalErrorPredictIngredients();
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
          showModalErrorPredictData();
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
            isDisabled={ingredientsOptions.length == 0}
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
          <label >Quantidade de dias para previsão</label>
          <input disabled={ingredientsOptions.length == 0} onChange={(e) => isNaN(e.target.valueAsNumber) ? '' : setDaysToBeForecasted(e.target.valueAsNumber)} type="number" min="0" step="1" placeholder="Digite a quantidade de dias" />
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
      

      <PopUpAlert status={"Houve um problema, recarregue a página"} isOpen={alertErrorLoadTrainedModels} setClosed={() => setAlertErrorLoadTrainedModels(false)}/>
      <PopUpAlert status={"Houve um problema na coleta, tente novamente"} isOpen={alertErrorPredictDataIsOpen} setClosed={() => setAlertErrorPredictDataIsOpen(false)}/>

      <PopUpAlert status={"A quantidade de dias deve ser positiva e inteira"} isOpen={alertErrorPredictDaysIsOpen} setClosed={() => setAlertErrorPredictDaysIsOpen(false)}/>
      <PopUpAlert status={"Você deve selecionar ao menos um ingrediente"} isOpen={alertErrorPredictIngredientsIsOpen} setClosed={() => setAlertErrorPredictIngredientsIsOpen(false)}/>


    </div>
  )
}