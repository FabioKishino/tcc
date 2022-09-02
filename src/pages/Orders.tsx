import { useContext, useState } from 'react'
import { OrdersContext } from '../contexts/OrderContext';

import Modal from 'react-modal'
import Select from 'react-select'

import { HeaderComponent } from '../components/HeaderComponent';
import { OrderComponent } from '../components/OrderComponent'

import { customStyleModal, customStylesSelect  } from '../@types/customStyles';
import { PlusCircle, X } from 'phosphor-react'
import '../styles/pages/orders.css';

Modal.setAppElement('#root')

export function Orders () {
  const {
    orders, 
    handleCloseNewOrderMenuAndSubmit, 
    newOrder, 
    setNewOrder, 
    newOrderIsOpen, 
    setNewOrderIsOpen,
    handleOpenNewOrderMenu,
    handleCloseNewOrderMenu
  
  } = useContext(OrdersContext);
  
  const [recipeOptions, setRecipeOptions] = useState([ { value: '1', label: 'Yakisoba' }, { value: '2', label: 'Salmão Grelhado' } ]);
  const [amountOptions, setAmountOptions] = useState([ { value: '1', label: '1 Porção' }, { value: '2', label: '1/2 Porção' } ]);
  const [statusOptions, setStatusOptions] = useState([ { value: '1', label: 'Em andamento' }, { value: '2', label: 'Cancelado' } ]);
  
  return (
    <div id="orders-page">
  
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
              isSearchable={false}
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
              isSearchable={false}
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

      {orders.map((item, index) => <OrderComponent key={index} recipe={item.recipe} amount={item.amount} status={item.status} created_at={item.created_at}/>)}

      <button id="plus-icon-btn" className="plus-icon" onClick={handleOpenNewOrderMenu}>
        <PlusCircle size={100} weight="fill"/>
      </button>

    </div>

    
  )
}
