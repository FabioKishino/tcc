import { useState } from 'react'

import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import { Pencil, X } from 'phosphor-react'

import '../styles/components/order.css';

Modal.setAppElement('#root')

interface orderProps {
  // id: number,
  recipe: string,
  amount: string,
  status: string,
  created_at: string,
}

export function Order (props: orderProps) {

  const [editOrderIsOpen, setEditOrderIsOpen] = useState(false);

  function handleOpenEditMenu () {
    setEditOrderIsOpen(true);
  }

  function handleCloseEditMenu () {
    setEditOrderIsOpen(false);
  }

  function handleCloseEditMenuAndSubmit () {
    setEditOrderIsOpen(false);
    // Needs to submit the form to the back end
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      // height: '80%',
      border: '1px solid #CCC',
      background: '#FFFFFF',
      overflow: 'auto',
      borderRadius: '10px',
    }
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
            <p>{props.amount}</p>
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
            style={customStyles}
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
                <input type="text" placeholder={props.recipe}/>

                <label>Quantidade</label>
                <input type="text" placeholder={props.amount}/>

                <label>Status</label>
                <input type="text" placeholder={props.status}/>

                <label>Criado há</label>
                <input type="text" placeholder={props.created_at}/>
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