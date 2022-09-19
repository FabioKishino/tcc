import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import Select from 'react-select';

import { HeaderComponent } from '../components/HeaderComponent';
import { DataGatheringComponent } from '../components/DataGatheringComponent';

import '../styles/pages/dataGathering.css';
import { PlusCircle } from 'phosphor-react';

import { DataGatheringProps } from '../@types/index';
import { customStyleModalNewDataGathering, customStyleModalDataGatheringPeopleAmount, customStylesSelectDataGathering } from '../@types/customStyles';
import api from '../services/api';

Modal.setAppElement('#root')

export function DataGathering () {
  const navigate = useNavigate();

  const [collectPeopleAmountIsOpen, setCollectPeopleAmountIsOpen] = useState(false);
  const [newDataGatheringIsOpen, setNewDataGatheringIsOpen] = useState(false);

  const [dataGathering, setDataGathering] = useState<DataGatheringProps>({} as DataGatheringProps);
  const [dataGatherings, setNewDataGatherings] = useState<DataGatheringProps[]>([]);

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
    },
  ]);

  function handleOpenNewDataGathering () {
    setNewDataGatheringIsOpen(true);
  }

  function handleCloseNewDataGathering () {
    setNewDataGatheringIsOpen(false);
  }

  function handleCloseNewDataGatheringAndSubmit () {
    setNewDataGatherings([...dataGatherings, dataGathering]);
    setNewDataGatheringIsOpen(false);
  }


  // QUANTIDADE DE PESSOAS
  function handleOpenCollectPeopleAmount () {
    setCollectPeopleAmountIsOpen(true);
  }

  function handleCloseCollectPeopleAmount () {
    setCollectPeopleAmountIsOpen(false);
  }

  async function handleCloseDataCollectionAndSubmit () {
    await api.post('/orders', dataGatherings);
    setCollectPeopleAmountIsOpen(false);
  }

  // CANCELAR 
  function cancelDataGathering () {
    // This function should delete all the data gathered for the day
    navigate('/home');
  }

  // SALVAR
  function saveDataGathering () {
    // This function should save all the data gathered for the day
    console.log("Data saved");
    console.log(dataGatherings);
  }
  return (
    <div id="data-gathering-page">
      <HeaderComponent title="Coleta de Dados"/>

      {dataGatherings.map(item => <DataGatheringComponent ingredient_name={dataGathering.ingredient_name} />)}

      { dataGatherings.length == 0 &&
        <div className="no-data-gatherings">
          <p>Não há ingredientes para coleta de dados cadastrados</p>
        </div>
      }

      {dataGatherings.length > 0 &&
      <div className="data-form-buttons"> 
        {/* This button should delete all the fields and go back to Home Page */}
        <button className="data-cancel-btn" onClick={cancelDataGathering}>CANCELAR</button>

        {/* This button should save all the fields */}
        <button className="data-save-btn" onClick={saveDataGathering}>SAVE</button>
        
        {/* This button should verify if all the fields has been completed and then open the Modal */}
        <button className="data-confirm-btn" onClick={handleOpenCollectPeopleAmount}>REALIZAR COLETA</button>
      </div>
      }

      <button id="page-btns" className="plus-icon" onClick={handleOpenNewDataGathering}>
        <PlusCircle size={80} weight="fill"/>
      </button>

      {/* NEW DATA GATHERING MODAL */}
      <Modal
        isOpen={newDataGatheringIsOpen}
        onRequestClose={handleCloseNewDataGathering}
        style={customStyleModalNewDataGathering}
      >
        <div className="data-modal-content">
          <h3>Selecione o ingrediente que deseja coletar os dados</h3>
          
          <Select 
              styles={customStylesSelectDataGathering}
              className="new-order-select" 
              placeholder="Escolha o ingrediente" 
              options={ingredientsOptions}
              isSearchable={false}
              onChange={selection => {
                const newDataGathering = dataGathering
                dataGathering.ingredient_name = selection ? selection.label : ''
                setDataGathering(newDataGathering)
              }
            }/>
        </div>

        <div className="form-buttons">
          <button onClick={handleCloseNewDataGathering} className="data-cancel-btn">CANCELAR</button>
          <button onClick={handleCloseNewDataGatheringAndSubmit} className="data-confirm-btn">CONFIRMAR</button>
        </div>

      </Modal>



      {/* PEOPLE AMOUNT MODAL */}
      <Modal
        isOpen={collectPeopleAmountIsOpen}
        onRequestClose={handleCloseCollectPeopleAmount}
        style={customStyleModalDataGatheringPeopleAmount}
      >
        <div className="data-modal-content">
          <h3>Insira a quantidade de clientes do dia</h3>
          <input type="number" min="0" placeholder="" className="people-amount-input"/>
        </div>
        
        <div className="form-buttons">
          <button onClick={handleCloseCollectPeopleAmount} className="data-cancel-btn">CANCELAR</button>
          <button onClick={handleCloseDataCollectionAndSubmit} className="data-confirm-btn">CONFIRMAR</button>
        </div>
      </Modal>

    </div>
  )
}
