import { useState } from 'react'
import Select from 'react-select';

import Modal from 'react-modal'

import { Pencil, X } from 'phosphor-react'
import '../styles/components/orderComponent.css';
import { OrderProps } from '../contexts/OrderContext';
import { customStyleModal } from '../@types/customStyles';

Modal.setAppElement('#root')

export function OrderComponent ({ recipe, amount, status, created_at}: OrderProps) {
  const [editOrderIsOpen, setEditOrderIsOpen] = useState(false);

  function handleOpenEditMenu () { setEditOrderIsOpen(true); }
  function handleCloseEditMenu () { setEditOrderIsOpen(false); }

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
            <p className="recipe-name">{recipe}</p>
          </div>

          <div>
            <label>Quantidade</label>
            <p>{amount}</p>
          </div>

          <div>
            <label>Status</label>
            <p>{status}</p>
          </div>

          <div>
            <label>Criado há</label>
            <p>{created_at} min</p>
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
                <input type="text" placeholder={recipe}/>

                <label>Quantidade</label>
                <input type="text" placeholder={amount}/>

                <label>Status</label>
                <input type="text" placeholder={status}/>

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