import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import Select from 'react-select';
import { Carousel } from 'react-carousel-minimal';

import Etapa_1 from '../images/dataGatheringSteps/Etapa_1.jpg';
import Etapa_2 from '../images/dataGatheringSteps/Etapa_2.jpg';
import Etapa_3 from '../images/dataGatheringSteps/Etapa_3.jpg';
import Etapa_4 from '../images/dataGatheringSteps/Etapa_4.jpg';
import Etapa_5 from '../images/dataGatheringSteps/Etapa_5.jpg';

import { HeaderComponent } from '../components/HeaderComponent';
import { DataGatheringComponent } from '../components/DataGatheringComponent';

import '../styles/pages/dataGathering.css';
import { PlusCircle, Question, X } from 'phosphor-react';
import { DataGatheringItem, DataGatheringReceived } from '../@types';

import { customStyleModalNewDataGathering, customStyleModalDataGatheringPeopleAmount, customStylesSelectDataGathering } from '../@types/customStyles';
import api from '../services/api';
import { PopUpAlert } from '../components/PopUpAlert';

Modal.setAppElement('#root')

export function DataGathering() {
  const navigate = useNavigate();

  const infoPictures = [
    {
      image: Etapa_1,
      caption: ""
    },
    {
      image: Etapa_2,
      caption: ""
    },
    {
      image: Etapa_3,
      caption: ""
    },
    {
      image: Etapa_4,
      caption: ""
    },
    {
      image: Etapa_5,
      caption: ""
    }
  ];

  const [collectPeopleAmountIsOpen, setCollectPeopleAmountIsOpen] = useState(false);
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  const [newDataGatheringIsOpen, setNewDataGatheringIsOpen] = useState(false);
  const [newDataGathering, setNewDataGathering] = useState<DataGatheringItem>({ id_ingredient: '', name: '', initial_amount: 0, final_amount: 0, unit: '' });
  const [dataGatherings, setDataGatherings] = useState<DataGatheringItem[]>([]);
  const [customerAmount, setCustomerAmount] = useState(0);
  const [ingredientsOptions, setIngredientsOptions] = useState<DataGatheringItem[]>([]);

  const [alertErrorDataGatheringWhenPageLoadsIsOpen, setAlertErrorDataGatheringWhenPageLoadsIsOpen] = useState(false);
  const [alertErrorDataGatheringPeopleIsOpen, setAlertErrorDataGatheringPeopleIsOpen] = useState(false);
  const [alertErrorDataGatheringIsOpen, setAlertErrorDataGatheringIsOpen] = useState(false);
  const [alertErrorDataGatheringIngredientInitialValueIsOpen, setAlertErrorDataGatheringIngredientInitialValueIsOpen] = useState(false);
  const [alertErrrorDataGatheringIngredientFinalValue, setAlertErrrorDataGatheringIngredientFinalValue] = useState(false);
  const [alertSuccessDataGathering, setAlertSuccessDataGathering] = useState(false);


  function showModalErrorDataGatheringWhenPageLoads() {
    setAlertErrorDataGatheringWhenPageLoadsIsOpen(true);
  }
  
  function showModalErrorDataGatheringPeople () {
    setAlertErrorDataGatheringPeopleIsOpen(true);
  }

  function showModalErrorDataGathering () {
    setAlertErrorDataGatheringIsOpen(true);
  }

  function showModalErrorDataGatheringIngredientInitialValue () {
    setAlertErrorDataGatheringIngredientInitialValueIsOpen(true);
  }

  function showModalErrorDataGatheringIngredientFinalValue() {
    setAlertErrrorDataGatheringIngredientFinalValue(true);
  }

  function showModalSuccessDataGathering () {
    setAlertSuccessDataGathering(true);
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
    });

    api.get('/data/today', {
      headers: {
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      const data = [] as DataGatheringItem[];
      res.data.map((i: DataGatheringReceived) => {
        data.push({
          name: i.ingredient.name,
          id_ingredient: i.id_ingredient,
          initial_amount: i.initial_amount,
          final_amount: i.final_amount,
          unit: i.unit
        })
      })

      setDataGatherings(data)
    }).catch(err => {
      showModalErrorDataGatheringWhenPageLoads();
      console.log(err)
    });

  }, [])

  function handleCloseNewDataGatheringAndSubmit() {
    if (!dataGatherings.filter((i: any) => i.name == newDataGathering.name && i.id_ingredient == newDataGathering.id_ingredient).length) {
      setDataGatherings(dataGatherings.concat(newDataGathering));
    }
    setNewDataGatheringIsOpen(false);
  }

  function handleChangeAmount(id: string, initial_amount: number, final_amount: number) {
    dataGatherings.filter((i: any) => i.id_ingredient == id).map((i) => {
      i.initial_amount = initial_amount,
        i.final_amount = final_amount,
        i.unit = 'kg'
    })
  }

  async function handleCloseDataCollectionAndSubmit() {
    if (customerAmount <= 0 || !Number.isInteger(customerAmount)) {
      showModalErrorDataGatheringPeople();
    } else {
      saveDataGathering();
      savePeopleAmount();
      setCollectPeopleAmountIsOpen(false);
    }
  }

  function cancelDataGathering() {
    // This function should delete all the data gathered for the day
    navigate('/home');
  }

  // SALVAR
  function saveDataGathering() {
    let invalidData = false;
    dataGatherings.map((i) => {
      if (i.initial_amount == 0) {
        invalidData = true;
        showModalErrorDataGatheringIngredientInitialValue();
      } else if (i.final_amount > i.initial_amount) {
        invalidData = true;
        showModalErrorDataGatheringIngredientFinalValue();
      }
    })

    if (!invalidData) {
      const data = {
        ingredients_data: dataGatherings
      }
      const token = localStorage.getItem("@Auth:token");
      api.post('/data/collect/ingredients', data,
        {
          headers: {
            'ContentType': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }).then(res => {
          showModalSuccessDataGathering();
        }).catch(err => {
          showModalErrorDataGathering();
          console.log(err)
        })
    }
  }

  function savePeopleAmount() {
    const token = localStorage.getItem("@Auth:token");
    api.post('/data/collect/additional', {
      customer_amount: customerAmount
    },
      {
        headers: {
          'ContentType': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then(res => { }).catch(err => {
        showModalErrorDataGathering();
        console.log(err)
      })
  }

  function deleteDataGathering(index: number) {
    var newDataGatheringList = [...dataGatherings];
    newDataGatheringList.splice(index, 1);
    setDataGatherings(newDataGatheringList)
  }


  return (
    <div id="data-gathering-page">
      <HeaderComponent title="Coleta de Dados" />
      {
        dataGatherings.length == 0 &&
        <div className="no-data-gatherings">
          <p>Não há ingredientes para coleta de dados cadastrados :(</p>
        </div>
      }

      {
        dataGatherings.map((item, index) => <DataGatheringComponent
          key={index}
          initial_amount={item.initial_amount}
          final_amount={item.final_amount}
          ingredient_name={item.name}
          handleDeleteDataGathering={() => deleteDataGathering(index)}
          handleChangeAmount={(initial_amount, final_amount) => handleChangeAmount(item.id_ingredient, initial_amount, final_amount)}
        />)
      }

      {
        dataGatherings.length > 0 &&
        <div className="data-form-buttons">
          <button className="data-cancel-btn" onClick={cancelDataGathering}>CANCELAR</button>
          <button className="data-save-btn" onClick={saveDataGathering}>SALVAR</button>
          <button className="data-confirm-btn" onClick={() => setCollectPeopleAmountIsOpen(true)}>REALIZAR COLETA</button>
        </div>
      }
      <button id="page-btns" className="question-icon" onClick={() => setInfoIsOpen(true)}>
        <Question size={80} weight="fill" />
      </button>
      <button id="page-btns" className="plus-icon" onClick={() => setNewDataGatheringIsOpen(true)}>
        <PlusCircle size={80} weight="fill" />
      </button>

      {/* NEW DATA GATHERING MODAL */}
      < Modal
        isOpen={newDataGatheringIsOpen}
        onRequestClose={() => setNewDataGatheringIsOpen(false)}
        style={customStyleModalNewDataGathering}
      >
        <div className="data-modal-container">
          <div className="data-modal-header">
            <h3>Selecione o ingrediente que deseja coletar os dados</h3>
          </div>

          <div className="data-modal-select">
            <Select
              styles={customStylesSelectDataGathering}
              className="new-order-select"
              placeholder="Escolha o ingrediente"
              options={ingredientsOptions.map((i: DataGatheringItem, index: number) => {
                return {
                  id: i.id_ingredient,
                  label: i.name,
                  value: (index + 1).toString()
                }
              })}
              isSearchable={false}
              onChange={selection => {
                const newDataGatheringObject = { id_ingredient: '', name: '', initial_amount: 0, final_amount: 0, unit: '' }
                newDataGatheringObject.id_ingredient = selection ? selection.id : ''
                newDataGatheringObject.name = selection ? selection.label : ''
                setNewDataGathering(newDataGatheringObject)
              }
              } />
          </div>

          <div className="form-buttons">
            <button onClick={() => setNewDataGatheringIsOpen(false)} className="data-cancel-btn">CANCELAR</button>
            <button onClick={handleCloseNewDataGatheringAndSubmit} className="data-confirm-btn">CONFIRMAR</button>
          </div>
        </div>
      </Modal>

      {/* PEOPLE AMOUNT MODAL */}
      <Modal
        isOpen={collectPeopleAmountIsOpen}
        onRequestClose={() => setCollectPeopleAmountIsOpen(false)}
        style={customStyleModalDataGatheringPeopleAmount}
      >
        <div className="data-modal-container" style={{ alignItems: 'center' }}>
          <h3>Insira a quantidade de clientes do dia</h3>
          <input onChange={(e) => isNaN(e.target.valueAsNumber) ? '' : setCustomerAmount(e.target.valueAsNumber)} type="number" min="1" step="1" placeholder="" className="people-amount-input" />
        </div>

        <div className="form-buttons">
          <button onClick={() => setCollectPeopleAmountIsOpen(false)} className="data-cancel-btn">CANCELAR</button>
          <button onClick={handleCloseDataCollectionAndSubmit} className="data-confirm-btn">CONFIRMAR</button>
        </div>
      </Modal>

      {/* INFO MODAL */}
      <Modal
        isOpen={infoIsOpen}
        onRequestClose={() => setInfoIsOpen(false)}
        style={{
          content: {
            width: "60%",
            right: 'auto',

            bottom: 'auto',
            top: '5%',
            left: '20%',
            overflow: 'auto',
            borderRadius: '10px',
          }
        }}
      >
        <div className="info-modal-header">
          <h1>Como Realizar a Coleta de Dados?</h1>
          <button onClick={() => setInfoIsOpen(false)}>
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
        <div style={{ padding: "10px 0px" }}>
          <Carousel
            data={infoPictures}
            width="60vw"
            height="60vh"
            captionStyle={{
              fontSize: '1em',
              color: 'black',
              bottom: '-10%'
            }}
            radius="10px"
            slideNumber={true}
            slideNumberStyle={{
              fontSize: '20px',
              fontWeight: 'bold',
            }}
            captionPosition="bottom"
            automatic={false}
            dots={true}
            pauseIconColor="black"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="contain"
            thumbnails={true}
            thumbnailWidth="100px"
            style={{
              textAlign: "center",
              margin: "20px auto",
              maxHeight: '75vh',
              maxWidth: '60vw'
            }}
          />
        </div>
      </Modal>

      <PopUpAlert status={"Houve um problema, recarregue a página."} isOpen={alertErrorDataGatheringWhenPageLoadsIsOpen} setClosed={() => setAlertErrorDataGatheringWhenPageLoadsIsOpen(false)} />
      <PopUpAlert status={"A quantidade de pessoas deve ser positiva e inteira."} isOpen={alertErrorDataGatheringPeopleIsOpen} setClosed={() => setAlertErrorDataGatheringPeopleIsOpen(false)}/>
      <PopUpAlert status={"Houve um problema na coleta, tente novamente."} isOpen={alertErrorDataGatheringIsOpen} setClosed={() => setAlertErrorDataGatheringIsOpen(false)}/>
      <PopUpAlert status={"A quantidade inicial deve ser superior a 0"} isOpen={alertErrorDataGatheringIngredientInitialValueIsOpen} setClosed={() => setAlertErrorDataGatheringIngredientInitialValueIsOpen(false)}/>
      <PopUpAlert status={"A quantidade final não pode ser maior que a inicial!"} isOpen={alertErrrorDataGatheringIngredientFinalValue} setClosed={() => setAlertErrrorDataGatheringIngredientFinalValue(false)}/>
      <PopUpAlert status={"Coleta Realizada Com Sucesso."} isOpen={alertSuccessDataGathering} setClosed={() => setAlertSuccessDataGathering(false)}/>

    </div >
  )
}
