import { useContext, useState } from 'react'
import Select from 'react-select';

import { OrdersContext } from '../contexts/OrderContext';
import { Order } from '../@types';

import Modal from 'react-modal'

import { Pencil, X } from 'phosphor-react'
import '../styles/components/orderComponent.css';
import { customStyleModal, customStylesSelect } from '../@types/customStyles';

Modal.setAppElement('#root')

export function OrderComponent (props: Order) {
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

  const created_at = new Date(props.created_at);
  const now = new Date().getTime();

  const created_ago = ((now - created_at.getTime())/(1000*60)).toFixed(0);
  
  return (
    <div id="order-list">
      <div className={props.priority == 2 ? "order-component-in-progress" : "order-component"}>
        <div className="order-content">
          <div className="order-recipe">
            <label>Prato</label>
            <p className="recipe-name">{props.recipe?.name}</p>
          </div>

          <div>
            <label>Quantidade</label>
            <p>{props.portion_size?.name}</p>
          </div>

          <div>
            <label>Status</label>
            <p>{props.status}</p>
          </div>

          <div>
            <label>Criado há</label>
            <p>{created_ago} min</p>
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
                  placeholder={props.recipe?.name}
                  options={recipeOptions} 
                  isSearchable={false}
                />

                <label>Quantidade</label>
                <Select 
                  styles={customStylesSelect} 
                  className="new-order-select" 
                  placeholder={props.portion_size?.name}
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