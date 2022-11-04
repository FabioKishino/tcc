import { useContext, useState } from 'react'
import Select from 'react-select';

import { OrdersContext } from '../contexts/OrderContext';
import { Order } from '../@types';

import Modal from 'react-modal'

import { Pencil, X } from 'phosphor-react'
import '../styles/components/orderComponent.css';
import { customStyleModal, customStylesSelect } from '../@types/customStyles';
import api from '../services/api';
import { PopUpAlert } from './PopUpAlert';

Modal.setAppElement('#root')

export function OrderComponent(props: Order) {
  const {
    recipeOptions,
    amountOptions,
    statusOptions,
    priorityOptions,
    orders,
    setOrders
  } = useContext(OrdersContext);

  const [editOrderIsOpen, setEditOrderIsOpen] = useState(false);
  const [portionSize, setPortionSize] = useState<any>(props.portion_size);
  const [status, setStatus] = useState<any>(props.status);
  const [priority, setPriority] = useState<any>(props.priority);

  const [endAt, setEndAt] = useState<any>(props.end_at);
  
  const [alertSuccessIsOpen, setAlertSuccessIsOpen] = useState(false);
  const [alertErrorIsOpen, setAlertErrorIsOpen] = useState(false);

  
  function showAlertSuccessUpdateOrder() {
    setAlertSuccessIsOpen(true);
  }
  
  function showModalErrorUpdateOrder() {
    setAlertErrorIsOpen(true);
  }

  function handleCloseEditMenuAndSubmit() {
    const id = props.id;
    const updatedOrder = {
      "priority": priority,
      "portion_id": portionSize.id,
      "status": status
    }

    const token = localStorage.getItem("@Auth:token");

    api.patch(`/orders/${id}`, updatedOrder,
      {
        headers: {
          'ContentType': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then(res => {
        const oldOrderIndex = orders.findIndex((o) => o.id == props.id)
        const newOrders = [...orders]
        newOrders[oldOrderIndex] = res.data;
        setOrders(newOrders);
        showAlertSuccessUpdateOrder();
      }).catch(err => {
        showModalErrorUpdateOrder();
        console.log(err)
      });

    setEditOrderIsOpen(false);
  }

  const created_at = new Date(props.created_at);
  const now = new Date().getTime();
  const created_ago = (Math.abs((now - created_at.getTime()) / (1000 * 60))).toFixed(0);

  const end_at = new Date(endAt);
  const ended_ago = (Math.abs((now - end_at.getTime()) / (1000 * 60))).toFixed(0);

  return (
    <div id="order-list">
      <div className={props.priority == 1 ? "order-component-low-priority" : props.priority == 2 ? "order-component-medium-priority" : "order-component-high-priority"}>
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
            <label>Prioridade</label>
            <p>{priorityOptions.find((p) => parseInt(p.value) == props.priority)?.label}</p>
          </div>

          <div>
            <label>{status == "Concluído" ? "Concluído há" : "Criado há"}</label>
            <p>{status == "Concluído" ? ended_ago : created_ago} min</p>
          </div>

        </div>

        <div className="order-edit-btn">
          <button onClick={() => setEditOrderIsOpen(true)}>
            <Pencil size={64} weight="fill" />
          </button>

          <Modal
            isOpen={editOrderIsOpen}
            onRequestClose={() => setEditOrderIsOpen(false)}
            style={customStyleModal}
          >
            <div className="order-edit-header">
              <h1>Editar pedido</h1>
              <button onClick={() => setEditOrderIsOpen(false)}>
                <X size={50} weight="fill" />
              </button>
            </div>
            <div className="order-edit-form">
              <form>
                <label>Prato</label>
                <Select
                  styles={customStylesSelect}
                  className="new-order-select"
                  isDisabled
                  defaultValue={recipeOptions.find((r) => r.label == props.recipe?.name)}
                  placeholder={props.recipe?.name}
                  options={recipeOptions}
                  isSearchable={false}
                />

                <label>Quantidade</label>
                <Select
                  styles={customStylesSelect}
                  className="new-order-select"
                  defaultValue={amountOptions.find((a) => a.label == props.portion_size?.name)}
                  placeholder={props.portion_size?.name}
                  options={amountOptions}
                  isSearchable={false}
                  onChange={(e) => setPortionSize({ id: e?.portion_id, name: e?.label })}
                />
                <label>Status</label>
                <Select
                  styles={customStylesSelect}
                  className="new-order-select"
                  defaultValue={statusOptions.find((s) => s.label == props.status)}
                  placeholder={props.status}
                  onChange={(e) => setStatus(e?.label)}
                  options={statusOptions}
                  isSearchable={false}
                />

                <label>Prioridade</label>
                <Select
                  styles={customStylesSelect}
                  className="new-order-select"
                  defaultValue={priorityOptions.find((p) => p.priority == props.priority)}
                  placeholder={props.priority}
                  onChange={(e) => setPriority(e?.priority)}
                  options={priorityOptions}
                  isSearchable={false}
                />

              </form>
            </div>
            <div className="form-buttons">
              <button onClick={() => setEditOrderIsOpen(false)} className="cancel-btn">CANCELAR</button>
              <button onClick={handleCloseEditMenuAndSubmit} className="confirm-btn">CONFIRMAR</button>
            </div>
          </Modal>

          <PopUpAlert status={"Pedido Atualizado!"} isOpen={alertSuccessIsOpen} setClosed={() => setAlertSuccessIsOpen(false)}/>
          <PopUpAlert status={"Houve um problema, tente novamente."} isOpen={alertErrorIsOpen} setClosed={() => setAlertErrorIsOpen(false)}/>

        </div>
      </div>
    </div>
  )
}