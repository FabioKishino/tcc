import { useState } from 'react'
import Modal from 'react-modal'
import Select from 'react-select'

import { HeaderComponent } from '../components/HeaderComponent';
import { Order, OrderProps } from '../components/Order'

import { PlusCircle, X } from 'phosphor-react'
import '../styles/pages/orders.css';
import api from '../services/api';

Modal.setAppElement('#root')

export function Orders () {
  const [newOrderIsOpen, setNewOrderIsOpen] = useState(false);
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [newOrder, setNewOrder] = useState<OrderProps>({} as OrderProps);

  function handleOpenNewOrderMenu () {
    setNewOrderIsOpen(true);
  }

  function handleCloseNewOrderMenu () {
    setNewOrderIsOpen(false);
  }

  async function handleCloseNewOrderMenuAndSubmit () {
    setNewOrderIsOpen(false);
    // Needs to submit the form to the back end and also add to the orders page
    setOrders([newOrder, ...orders]);
    await api.post('/orders', newOrder);
  }

  const recipesOptions = [
    { value: '1', label: 'Yakisoba' },
    { value: '2', label: 'Salmão Grelhado' },
  ]

  const amountOptions = [
    { value: '1', label: '1 Porção' },
    { value: '2', label: '1/2 Porção' },
  ]

  const statusOptions = [
    { value: '1', label: 'Em andamento' },
    { value: '2', label: 'Cancelado' },
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

  const customStylesSelect = {
    menuList: () => ({
      backgroundColor: '#DCDCDC',
      color: 'black',
      padding: 20,
    }),
    control: (styles: any) => ({
      ...styles,
      backgroundColor: '#DCDCDC',
      border: '0px',
    }),
    dropdownIndicator: () => ({
      color: 'black',
    })
  }

  return (
    <div id="orders-page">
  
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
              styles={customStylesSelect} 
              className="new-order-select" 
              placeholder="Escolha o prato" 
              options={recipesOptions} 
              onChange={selection => {
                const newObject = newOrder
                newObject.recipe = selection ? selection.label : ''
                setNewOrder(newObject)
              }
            }/>

            <label>Quantidade</label>
            <Select 
              styles={customStylesSelect} 
              className="new-order-select" 
              placeholder="Escolha a quantidade" 
              options={amountOptions}
              onChange={selection => {
                const newObject = newOrder
                newObject.amount = selection ? selection.label : ''
                setNewOrder(newObject)
              }
            }/>

            <label>Status</label>
            <Select 
              styles={customStylesSelect} 
              className="new-order-select" 
              placeholder="Escolha o status" 
              options={statusOptions} 
              onChange={selection => {
                const newObject = newOrder
                newObject.status = selection ? selection.label : ''
                setNewOrder(newObject)
              }
            }/>

          </form>
        </div>
        <div className="form-buttons"> 
          <button onClick={handleCloseNewOrderMenu} className="cancel-btn">CANCELAR</button>
          <button onClick={handleCloseNewOrderMenuAndSubmit} className="confirm-btn">CONFIRMAR</button>
        </div>
      </Modal>
    
      <HeaderComponent title="Pedidos"/>

      {orders.map(item => <Order recipe={item.recipe} amount={item.amount} status={item.status} created_at={item.created_at} />)}

      <Order recipe="Yakisoba" amount="1 Porção" status="Em andamento" created_at="5" />

      <button id="plus-icon-btn" className="plus-icon" onClick={handleOpenNewOrderMenu}>
        <PlusCircle size={100} weight="fill"/>
      </button>

    </div>

    
  )
}
