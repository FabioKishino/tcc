import { useContext, useEffect, useState } from 'react'
import Select from 'react-select';
import { OrdersContext } from '../contexts/OrderContext';
import { Order } from '../@types';

import Modal from 'react-modal'

import { Pencil, X } from 'phosphor-react'
import '../styles/components/orderComponent.css';
import { customStyleModal, customStylesSelect } from '../@types/customStyles';
import api from '../services/api';
import { PopUpAlert } from './PopUpAlert';
import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

Modal.setAppElement('#root')

export function OrderComponent(props: Order) {
  const {
    recipeOptions,
    amountOptions,
    statusOptions,
    priorityOptions,
  } = useContext(OrdersContext);

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 68,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(30px)',
        '& + .MuiSwitch-track': {
          backgroundColor: '#727571',
          opacity: 0.3,
          border: 0,
        },
      },
    },
    '& .MuiSwitch-thumb': {
      width: 32,
      height: 32,
    },
    '& .MuiSwitch-track': {
      borderRadius: 20 / 2,
    },
  }));

  function timer() {
    setTimeout(() => { setReload(!reload) }, 60000)
  }

  useEffect(() => {
    timer()
    setCreatedAgo((Math.abs((new Date().getTime() - new Date(props.created_at).getTime()) / (1000 * 60))).toFixed(0));
    setEndAt((Math.abs((new Date().getTime() - new Date(props.end_at).getTime()) / (1000 * 60))).toFixed(0));
  }, [])

  const [reload, setReload] = useState(false)
  const [createdAgo, setCreatedAgo] = useState<any>(0);
  const [endAt, setEndAt] = useState<any>(0);

  useEffect(() => {
    setCreatedAgo((Math.abs((new Date().getTime() - new Date(props.created_at).getTime()) / (1000 * 60))).toFixed(0));
    setEndAt((Math.abs((new Date().getTime() - new Date(props.end_at).getTime()) / (1000 * 60))).toFixed(0));

  }, [reload]);

  const [completed, setCompleted] = useState(props.status == 'Concluído');

  async function setOrderCompleted() {
    const token = localStorage.getItem("@Auth:token");
    let newStatus = 'Em Progresso'

    if (!completed) {
      newStatus = 'Concluído'
    }

    api.patch(`/orders/${props.id}`, { ...props, status: newStatus },
      {
        headers: {
          'ContentType': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then(res => {
        setEndAt(res.data.end_at);
        setStatus(res.data.status);
        props.updateOrder(res.data);
      }).catch(err => {
        showModalErrorUpdateOrder();
        console.log(err)
      });

  }

  const [editOrderIsOpen, setEditOrderIsOpen] = useState(false);
  const [portionSize, setPortionSize] = useState<any>(props.portion_size);
  const [status, setStatus] = useState<any>(props.status);
  const [currentPriority, setCurrentPriority] = useState<any>(props.priority);

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
      "priority": currentPriority,
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
        setEndAt(res.data.end_at);
        setStatus(res.data.status);
        setCompleted(res.data.status == 'Concluído')
        props.updateOrder(res.data);
        showAlertSuccessUpdateOrder();
      }).catch(err => {
        showModalErrorUpdateOrder();
        console.log(err)
      });

    setEditOrderIsOpen(false);
  }

  return (
    <div id="order-list">
      <div className={props.priority == 1 ? "order-component-low-priority" : props.priority == 2 ? "order-component-medium-priority" : "order-component-high-priority"}>
        <div className="order-content">
          <div className="order-item" style={{ width: "15vw" }}>
            <label>Prato</label>
            <p className="recipe-name">{props.recipe?.name}</p>
          </div>

          <div className="order-item" style={{ width: "10vw" }}>
            <label>Quantidade</label>
            <p>{props.portion_size?.name}</p>
          </div>

          <div className="order-item" style={{ width: "10vw" }}>
            <label>Prioridade</label>
            <p>{priorityOptions.find((p) => parseInt(p.value) == props.priority)?.label}</p>
          </div>

          {props.status == 'Concluído' ?
            (
              <div className="order-item" style={{ width: "10vw" }}>
                <label>Concluído há</label>
                <p>{endAt} min</p>
              </div>

            ) :
            (
              <div className="order-item" style={{ width: "10vw" }}>
                <label>Criado há</label>
                <p>{createdAgo} min</p>
              </div>
            )}

          <div className="order-item" style={{ width: "15vw" }}>
            <label>Status</label>
            {/* style={{ color: props.status == 'Cancelado' ? '#e22727' : props.status == 'Concluído' ? '#3bbb30' : '#1746e2' }} */}
            <p>{props.status}</p>
          </div>

        </div>

        {props.status != 'Cancelado' ?
          (
            <FormGroup >
              <FormControlLabel
                control={<MaterialUISwitch defaultChecked={completed} onChange={() => { setOrderCompleted() }} />}
                label=""
              />
            </FormGroup>

          ) : ''}

        {/* style={{ position: 'relative', right: props.status != 'Cancelado' ? '-0.1rem' : '-2vw', top: '0.5vh', height: '100%' }} */}
        <div className="order-edit-btn">
          <button onClick={() => setEditOrderIsOpen(true)}>
            <Pencil size={50} weight="fill" />
          </button>
        </div>

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
                onChange={(e) => { setCurrentPriority(e?.priority); }}
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

        <PopUpAlert status={"Pedido Atualizado!"} isOpen={alertSuccessIsOpen} setClosed={() => setAlertSuccessIsOpen(false)} />
        <PopUpAlert status={"Houve um problema, tente novamente."} isOpen={alertErrorIsOpen} setClosed={() => setAlertErrorIsOpen(false)} />

      </div>

    </div>
  )
}