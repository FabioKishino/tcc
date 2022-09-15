import { useContext, useState } from 'react'
import Select from 'react-select';

import Modal from 'react-modal'

import { Pencil, X } from 'phosphor-react'
import '../styles/components/orderComponent.css';
import { OrderProps, OrdersContext } from '../contexts/OrderContext';
import { customStyleModal, customStylesSelect } from '../@types/customStyles';

Modal.setAppElement('#root')

export function OrderComponent (props: OrderProps) {
  const {
    recipeOptions,
    amountOptions,
    statusOptions
  } = useContext(OrdersContext);
  
  const [editOrderIsOpen, setEditOrderIsOpen] = useState(false);

  function handleOpenEditMenu () { 
    setEditOrderIsOpen(true); 
  }
  
  function handleCloseEditMenu () { 
    setEditOrderIsOpen(false); }

  function handleCloseEditMenuAndSubmit () {
    setEditOrderIsOpen(false);
    // Needs to submit the form to the back end
  }

  return (
    <div id="order-list">
      <div className="order-component">
        <div className="order-content">
          <div className="order-recipe">
            <label>Prato</label>
            <p className="recipe-name">{props.recipe}</p>
          </div>

          <div>
            <label>Quantidade</label>
            <p>{props.portion_size}</p>
          </div>

          <div>
            <label>Status</label>
            <p>{props.status}</p>
          </div>

          <div>
            <label>Criado há</label>
            <p>{props.created_at} min</p>
          </div>
        </div>

        <div className="order-edit-btn">
          <button onClick={handleOpenEditMenu}>
            <Pencil size={64} weight="fill" />
          </button>

          <Modal
            isOpen={editOrderIsOpen}
            onRequestClose={handleCloseEditMenu}
            style={customStyleModal}
          >
            <div className="order-edit-header">
              <h1>Editar pedido</h1>
              <button onClick={handleCloseEditMenu}>
                <X size={50} weight="fill" />
              </button>
            </div>
            <div className="order-edit-form">
              <form>
                <label>Prato</label>
                <Select 
                  styles={customStylesSelect} 
                  className="new-order-select" 
                  placeholder={props.recipe}
                  options={recipeOptions} 
                  isSearchable={false}
                />

                <label>Quantidade</label>
                <Select 
                  styles={customStylesSelect} 
                  className="new-order-select" 
                  placeholder={props.portion_size}
                  options={amountOptions} 
                  isSearchable={false}
                />

                <label>Status</label>
                <Select 
                  styles={customStylesSelect} 
                  className="new-order-select" 
                  placeholder={props.status}
                  options={statusOptions} 
                  isSearchable={false}
                />

              </form>
            </div>
            <div className="form-buttons"> 
              <button onClick={handleCloseEditMenu} className="cancel-btn">CANCELAR</button>
              <button onClick={handleCloseEditMenuAndSubmit} className="confirm-btn">CONFIRMAR</button>
            </div>
          </Modal>
        </div>
      </div>
    </div> 
  )
}