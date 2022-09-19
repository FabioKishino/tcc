import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'

import { HeaderComponent } from '../components/HeaderComponent';
import { DataGatheringComponent } from '../components/DataGatheringComponent';

import '../styles/pages/dataGathering.css';
import { FloppyDisk, PlusCircle } from 'phosphor-react';

import { dataGatheringProps } from '../@types/index';
import { customStyleModalDataGathering } from '../@types/customStyles';
import api from '../services/api';


Modal.setAppElement('#root')

export function DataGathering () {
  const navigate = useNavigate();

  const [collectPeopleAmountIsOpen, setCollectPeopleAmountIsOpen] = useState(false);
  const [dataGatherings, setNewDataGatherings] = useState([{} as dataGatheringProps]);

  function handleNewDataGathering () {
    
    setNewDataGatherings([...dataGatherings]);
    console.log(dataGatherings);
  }

  function handleOpenCollectPeopleAmount () {
    setCollectPeopleAmountIsOpen(true);
  }

  function handleCloseCollectPeopleAmount () {
    setCollectPeopleAmountIsOpen(false);
  }

  async function handleCloseDataCollectionAndSubmit () {
    setCollectPeopleAmountIsOpen(false);
    await api.post('/orders', dataGatherings);
  }

  function cancelDataGathering () {
    // This function should delete all the data gathered for the day
    navigate('/home');
  }

  return (
    <div id="data-gathering-page">
      <HeaderComponent title="Coleta de Dados"/>
      
      <DataGatheringComponent />
      <DataGatheringComponent />
      <DataGatheringComponent />
      {/* {dataGatherings.map(item => <DataGatheringComponent />)} */}

      <div className="form-buttons"> 
        {/* This button should delete all the fields and go back to Home Page */}
        <button className="cancel-btn" onClick={cancelDataGathering}>CANCELAR</button>
        {/* This button should verify if all the fields has been completed and then open the Modal */}
        <button className="confirm-btn" onClick={handleOpenCollectPeopleAmount}>REALIZAR COLETA</button>
      </div>

      <button id="page-btns" className="save-icon" onClick={handleNewDataGathering}>
        <FloppyDisk size={80} weight="fill"/>
      </button>
      <button id="page-btns" className="plus-icon" onClick={handleNewDataGathering}>
        <PlusCircle size={80} weight="fill"/>
      </button>

      {/* MODAL */}
      <Modal
        isOpen={collectPeopleAmountIsOpen}
        onRequestClose={handleCloseCollectPeopleAmount}
        style={customStyleModalDataGathering}
      >
        <div className="data-modal-content">
          <h2>Insira a quantidade de clientes do dia</h2>
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
