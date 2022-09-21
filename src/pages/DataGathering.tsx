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

  const [newDataGathering, setNewDataGathering] = useState<DataGatheringProps>({} as DataGatheringProps);
  const [dataGatherings, setDataGatherings] = useState<DataGatheringProps[]>([]);

  const [ingredientsOptions, setIngredientsOptions] = useState([ 
    { 
      value: '1', 
      label: 'Salmão',
      ingredient_id: '5173b7c9-60ef-46b6-aee1-7945f61cfb5b'
    }, 
    { 
      value: '2', 
      label: 'Carne',
      ingredient_id: 'a1ef7b6e-fd2f-4c5d-8824-8b00408a97b4'
    },
    { 
      value: '3', 
      label: 'Bacalhau',
      ingredient_id: '7cc22a50-c663-4029-88a5-c0887b4c8562'
    },
  ]);

  function handleOpenNewDataGathering () {
    setNewDataGatheringIsOpen(true);
  }

  function handleCloseNewDataGathering () {
    setNewDataGatheringIsOpen(false);
  }

  function handleCloseNewDataGatheringAndSubmit () {
    setDataGatherings([newDataGathering, ...dataGatherings]);
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

  function deleteDataGathering (index: number) {
    var newDataGatheringList = [...dataGatherings];
    newDataGatheringList.splice(index, 1);
    setDataGatherings(newDataGatheringList)
  }


  return (
    <div id="data-gathering-page">
      <HeaderComponent title="Coleta de Dados"/>
      
      { dataGatherings.length == 0 &&
        <div className="no-data-gatherings">
          <p>Não há ingredientes para coleta de dados cadastrados :(</p>
        </div>
      }

      {dataGatherings.map((item, index) => <DataGatheringComponent key={index} ingredient_name={item.ingredient_name} handleDeleteDataGathering={() => deleteDataGathering(index)}/>)}

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
        <div className="data-modal-container">
          <div className="data-modal-header">
            <h3>Selecione o ingrediente que deseja coletar os dados</h3>
          </div>
          
          <div className="data-modal-select">
            <Select 
              styles={customStylesSelectDataGathering}
              className="new-order-select" 
              placeholder="Escolha o ingrediente" 
              options={ingredientsOptions}
              isSearchable={false}
              onChange={selection => {
                const newDataGatheringObject = newDataGathering
                newDataGatheringObject.ingredient_name = selection ? selection.label : ''
                setNewDataGathering(newDataGatheringObject)
              }
            }/>
          </div> 
          
          <div className="form-buttons">
            <button onClick={handleCloseNewDataGathering} className="data-cancel-btn">CANCELAR</button>
            <button onClick={handleCloseNewDataGatheringAndSubmit} className="data-confirm-btn">CONFIRMAR</button>
          </div>
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
