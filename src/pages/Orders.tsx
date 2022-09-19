import { useContext, useEffect, useState } from 'react'
import Modal from 'react-modal'
import Select from 'react-select'

import { HeaderComponent } from '../components/HeaderComponent';
import { OrderComponent } from '../components/OrderComponent'

import { customStyleModal, customStylesSelect  } from '../@types/customStyles';
import { PlusCircle, X } from 'phosphor-react'
import '../styles/pages/orders.css';

import { OrdersContext } from '../contexts/OrderContext';
import { AuthContext } from '../contexts/AuthContext';

import api from '../services/api';

Modal.setAppElement('#root')

export function Orders () {
  const {
    orders,
    setOrders,
    handleCloseNewOrderMenuAndSubmit, 
    newOrder, 
    setNewOrder, 
    newOrderIsOpen, 
    setNewOrderIsOpen,
    handleOpenNewOrderMenu,
    handleCloseNewOrderMenu,
    recipeOptions,
    amountOptions,
    statusOptions
  } = useContext(OrdersContext);
  
  const { token } = useContext(AuthContext)

  useEffect(() => {
    const token = localStorage.getItem("@Auth:token");
    api.get('/orders', { 
      headers: { 
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      } 
    }).then(response => console.log(response.data.orders));
  }, [])


  useEffect(() => {
    const token = localStorage.getItem("@Auth:token");
    api.get('/orders', { 
      headers: { 
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      } 
    }).then(response => setOrders(response.data.orders));
  }, [orders])

  return (
    <div id="orders-page">

      <HeaderComponent title="Pedidos"/>
  
      <Modal
        isOpen={newOrderIsOpen}
        onRequestClose={handleCloseNewOrderMenu}
        style={customStyleModal}
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
              options={recipeOptions} 
              isSearchable={false}
              onChange={selection => {
                const newObject = newOrder
                newObject.id_recipe = selection ? selection.id_recipe : ''
                setNewOrder(newObject)
              }
            }/>

            <label>Quantidade</label>
            <Select 
              styles={customStylesSelect} 
              className="new-order-select" 
              placeholder="Escolha a quantidade" 
              options={amountOptions}
              isSearchable={false}
              onChange={selection => {
                const newObject = newOrder
                newObject.portion_id = selection ? selection.portion_id : ''
                setNewOrder(newObject)
              }
            }/>

            <label>Status</label>
            <Select 
              styles={customStylesSelect} 
              className="new-order-select" 
              placeholder="Escolha o status" 
              options={statusOptions}
              isSearchable={false}
              onChange={selection => {
                const newObject = newOrder
                newObject.priority = selection ? selection.priority : ''
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

      {orders.reverse().map((item, index) => <OrderComponent 
        key={index} 
        id={item.id}
        recipe={item.recipe}
        portion_size={item.portion_size}
        status={item.status} 
        created_at={item.created_at}
        priority={item.priority}
        id_recipe={item.id_recipe}
        portion_id={item.portion_id} 
        />
      )}

      <button onClick={() => console.log(orders)}>Orders</button> 
      <button onClick={() => console.log(orders.reverse())}>Reverse</button> 

      <button id="plus-icon-btn" className="plus-icon" onClick={handleOpenNewOrderMenu}>
        <PlusCircle size={100} weight="fill"/>
      </button>

    </div>
  )
}
