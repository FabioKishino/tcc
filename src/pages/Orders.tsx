import { useState } from 'react'
import Modal from 'react-modal'
import Select from 'react-select'

import { HeaderComponent } from '../components/HeaderComponent';
import { Order } from '../components/Order'


import { PlusCircle, X } from 'phosphor-react'
import '../styles/pages/orders.css';

Modal.setAppElement('#root')

export function Orders () {

  const [newOrderIsOpen, setNewOrderIsOpen] = useState(false);

  function handleOpenNewOrderMenu () {
    setNewOrderIsOpen(true);
  }

  function handleCloseNewOrderMenu () {
    setNewOrderIsOpen(false);
  }

  function handleCloseNewOrderMenuAndSubmit () {
    setNewOrderIsOpen(false);
    // Needs to submit the form to the back end
  }

  const recipesOptions = [
    { value: '1', label: 'Yakisoba' },
    { value: '2', label: 'Salmão Grelhado' },
  ]

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      border: '1px solid #CCC',
      background: '#FFFFFF',
      overflow: 'auto',
      borderRadius: '10px',
    }
  }

  return (
    <div id="orders-page">
      <HeaderComponent title="Pedidos"/>
      <Order recipe="Yakisoba" amount="1 Porção" status="Em andamento" created_at="5" />
      <Order recipe="Camarão à milanesa" amount="2 Porções" status="Em andamento" created_at="15" />
      <Order recipe="Cogumelo Paris" amount="1/2 Porção" status="Cancelado" created_at="25" />
      <Order recipe="Salmão Grelhado" amount="1 Porção" status="Finalizado" created_at="35" />
      <Order recipe="Salmão Grelhado" amount="1 Porção" status="Finalizado" created_at="45" />
      <Order recipe="Salmão Grelhado" amount="1 Porção" status="Finalizado" created_at="55" />

      <button id="plus-icon-btn" className="plus-icon" onClick={handleOpenNewOrderMenu}>
        <PlusCircle size={100} weight="fill"/>
      </button>

      <Modal
        isOpen={newOrderIsOpen}
        onRequestClose={handleCloseNewOrderMenu}
        style={customStyles}
      >
        <div className="new-order-header">
          <h1>Novo Pedido</h1>
          <button onClick={handleCloseNewOrderMenu}>
            <X size={50} weight="fill" />
          </button>
        </div>
        <div className="new-order-form">
          <form>
            <label>Prato</label>
            <Select
              className="new-order-select"
              placeholder="Escolha o prato"
              options={recipesOptions}
            />

            <label>Quantidade</label>
            <Select
              className="new-order-select"
              placeholder="Escolha a quantidade"
              options={recipesOptions}
            />

            <label>Status</label>
            <Select
              className="new-order-select"
              placeholder="Escolha o status"
              options={recipesOptions}
            />
          </form>
        </div>
        <div className="form-buttons"> 
          <button onClick={handleCloseNewOrderMenu} className="cancel-btn">CANCELAR</button>
          <button onClick={handleCloseNewOrderMenuAndSubmit} className="confirm-btn">CONFIRMAR</button>
        </div>
      </Modal>
    
    </div>

    
  )
}
