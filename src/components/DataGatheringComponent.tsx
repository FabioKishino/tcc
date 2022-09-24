import { useState, useEffect } from 'react'

import Select from 'react-select';
import Modal from 'react-modal'

import { customStyleModalDeleteDataGathering } from '../@types/customStyles';
import { Trash } from 'phosphor-react'
import '../styles/components/dataGatheringComponet.css';
import { DataGatheringProps } from '../@types';
import { send } from 'process';

Modal.setAppElement('#root')

export function DataGatheringComponent({ ingredient_name, initial_amount, final_amount, handleDeleteDataGathering, handleChangeAmount }: DataGatheringProps) {

  const [deleteNewDataGathering, setDeleteNewDataGathering] = useState(false);
  const [initialAmount, setInitialAmount] = useState(initial_amount);
  const [finalAmount, setFinalAmount] = useState(final_amount);

  function handleOpenDeleteNewDataGathering() {
    setDeleteNewDataGathering(true);
  }

  function handleCloseDeleteNewDataGathering() {
    setDeleteNewDataGathering(false);
  }

  function handleCloseDeleteNewDataGatheringAndSubmit() {
    setDeleteNewDataGathering(false);
    handleDeleteDataGathering();
  }

  useEffect(() => {
    sendUpdatedData()
  }, [initialAmount, finalAmount])

  function sendUpdatedData() {
    handleChangeAmount(initialAmount, finalAmount)
  }

  return (
    <div id="data-gathering-component-page">
      <div className="data-gathering-component">
        <div className="data-gathering-component-content">
          <div className="data-gathering-component-ingredient">
            <label>Ingrediente</label>
            <span>{ingredient_name}</span>
          </div>

          <div className="data-gathering-component-input">
            <label>Quantidade inicial (kg)</label>
            <input defaultValue={initialAmount} onChange={(e) => isNaN(e.target.valueAsNumber) ? '' : setInitialAmount(e.target.valueAsNumber)} type="number" min="0" placeholder="Digite a quantidade inicial" />
          </div>

          <div className="data-gathering-component-input">
            <label>Quantidade final (kg)</label>
            <input defaultValue={finalAmount} onChange={(e) => isNaN(e.target.valueAsNumber) ? '' : setFinalAmount(e.target.valueAsNumber)} type="number" min="0" placeholder="Digite a quantidade final" />
          </div>
        </div>

        <button className="data-gathering-component-buttons" onClick={handleOpenDeleteNewDataGathering}>
          <Trash size={64} weight="fill" />
        </button>

        <Modal
          isOpen={deleteNewDataGathering}
          onRequestClose={handleCloseDeleteNewDataGathering}
          style={customStyleModalDeleteDataGathering}
        >
          <div className="delete-data-gathering-content">
            <h1>Você tem certeza que deseja excluir essa coleta de dados?</h1>
          </div>

          <div className="form-buttons">
            <button onClick={handleCloseDeleteNewDataGathering} className="cancel-btn">CANCELAR</button>
            <button onClick={handleCloseDeleteNewDataGatheringAndSubmit} className="confirm-btn">CONFIRMAR</button>
          </div>
        </Modal>

      </div>
    </div>
  )
}