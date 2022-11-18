import { useContext, useEffect, useState } from 'react'
import Modal from 'react-modal'
import Select from 'react-select'
import { Link } from 'react-router-dom'

import '../styles/components/headerComponent.css';
import { OrderComponent } from '../components/OrderComponent'

import { customStyleModal, customStylesFilter, customStylesSelect } from '../@types/customStyles';
import { ArrowLeft, Funnel, ListNumbers, PlusCircle, Trash, X } from 'phosphor-react'
import '../styles/pages/orders.css';

import { OrdersContext } from '../contexts/OrderContext';
import ReactLoading from 'react-loading';

import api from '../services/api';
import { PopUpAlert } from '../components/PopUpAlert';
import { Order } from '../@types';

Modal.setAppElement('#root')

export function Orders() {
  const {
    newOrderIsOpen,
    setNewOrderIsOpen,
    handleOpenNewOrderMenu,
    handleCloseNewOrderMenu,
    recipeOptions,
    amountOptions,
    statusOptions,
    priorityOptions,
    alertSuccessIsOpen,
    setAlertSuccessIsOpen,
    alertErrorCreateOrder,
    setAlertErrorCreateOrder,
  } = useContext(OrdersContext);

  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState<Order[]>([]);
  const [status, setStatus] = useState<string>('Em Progresso')
  const [newOrder, setNewOrder] = useState<Order>({} as Order);
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [orderByPriority, setOrderByPriority] = useState<boolean>(false)
  const [alertError, setAlertError] = useState<boolean>(false)


  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("@Auth:token");
    api.get(`/orders?status=${status}`, {
      headers: {
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => { setOrders(response.data.orders); setLoading(false); })
      .catch(err => {
        showModalError();
        console.log(err)
        setLoading(false);
      });
  }, []);


  const reversedOrders = Array.from(orders).reverse()
  let orderedOrders = Array.from(orders).sort((a, b) => Number(b.priority) - Number(a.priority)).filter((o) => o.status == status)
  let filteredOrders = Array.from(reversedOrders).filter((o) => o.status == status)

  function showModalError() {
    setAlertError(true)
  }

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("@Auth:token");
    api.get(`/orders?status=${status}`, {
      headers: {
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => { setOrders(response.data.orders); setLoading(false); }).catch(err => { showModalError(); setLoading(false); });
  }, [status])

  async function handleCreateOrder() {
    setNewOrderIsOpen(false);

    const token = localStorage.getItem("@Auth:token");
    const response = await api.post('/orders', newOrder, {
      headers: {
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      setOrders([response.data, ...orders]);
      setAlertSuccessIsOpen(true);
    }).catch(err => {
      setAlertErrorCreateOrder(true);
      console.log(err)
    });
  }

  async function handleDeleteAllOrders() {

    const token = localStorage.getItem("@Auth:token");
    await api.delete('/orders', {
      headers: {
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      setOrders([]);
    }).catch(err => {
      console.log(err)
    });
  }

  async function handleUpdateOrders(order: Order) {
    if (order.status != status) {
      const newOrders = orders.filter((o: any) => o.id != order.id)
      setOrders(newOrders);
    } else {
      const newOrders = [...orders]
      const oldOrderIndex = orders.findIndex((o) => o.id == order.id)
      newOrders[oldOrderIndex] = order;
      setOrders(newOrders);
    }
  }

  return (
    <div id="orders-page">
      <div id="header-component">
        <header className="header-content">
          <button className="add-btn">
            <Link to="/home">
              <ArrowLeft size={64} weight="bold" color="black" />
            </Link>
          </button>
          <p>Pedidos</p>

          <div className="header-buttons">
            <button onClick={() => setOrderByPriority(!orderByPriority)}>
              <ListNumbers size={80} weight="regular" />
            </button>

            <button onClick={() => setShowFilter(!showFilter)}>
              <Funnel size={80} weight="regular" />
            </button>
          </div>
        </header>
      </div>

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
              } />

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
              } />

            <label>Prioridade</label>
            <Select
              styles={customStylesSelect}
              className="new-order-select"
              placeholder="Defina a prioridade"
              options={priorityOptions}
              isSearchable={false}
              onChange={selection => {
                const newObject = newOrder
                newObject.priority = selection ? selection.priority : 0
                setNewOrder(newObject)
              }
              } />

          </form>
        </div>
        <div className="form-buttons">
          <button onClick={handleCloseNewOrderMenu} className="cancel-btn">CANCELAR</button>
          <button onClick={handleCreateOrder} className="confirm-btn">CONFIRMAR</button>
        </div>
      </Modal>

      {orders.length === 0 && !loading &&
        <div className="no-orders">
          <p>Não há pedidos no momento :(</p>
        </div>
      }

      {orderByPriority == false ? (
        <p className="priority-order-status">Ordenar por prioridade: <strong>&nbsp;OFF</strong></p>
      ) : (
        <p className="priority-order-status">Ordenar por prioridade: <strong>&nbsp;ON</strong></p>
      )}

      {showFilter ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="orders-filter" style={{ display: 'block', height: 'fit-content', padding: '0px', margin: '10px 0px', borderRadius: '10px', backgroundColor: '#F5F5F5' }}>
            <label>Status Desejado</label>
            <Select
              styles={customStylesFilter}
              className="new-order-select"
              placeholder="Escolha o status"
              options={statusOptions}
              defaultValue={statusOptions[0]}
              isSearchable={false}
              onChange={(e) => {
                setStatus(e?.label as string)
              }}
            />
          </div>
        </div>
      ) : null}

      {loading ?
        (
          <div style={{ display: 'flex', justifyContent: 'center', 'alignItems': 'center', margin: '10vw 0px' }}>
            <ReactLoading type={'spinningBubbles'} color={'black'} height={'10vw'} width={'10vw'} />
          </div>
        ) :
        orderByPriority ? (
          orderedOrders.map((item, index) => <OrderComponent
            key={index}
            id={item.id}
            recipe={item.recipe}
            portion_size={item.portion_size}
            status={item.status}
            created_at={item.created_at}
            end_at={item.end_at}
            priority={item.priority}
            id_recipe={item.id_recipe}
            portion_id={item.portion_id}
            updateOrder={((order) => handleUpdateOrders(order))}
          />
          )
        ) : filteredOrders.map((item, index) => <OrderComponent
          key={index}
          id={item.id}
          recipe={item.recipe}
          portion_size={item.portion_size}
          status={item.status}
          created_at={item.created_at}
          end_at={item.end_at}
          priority={item.priority}
          id_recipe={item.id_recipe}
          portion_id={item.portion_id}
          updateOrder={((order) => handleUpdateOrders(order))}
        />
        )}

      <button id="trash-icon-btn" className="trash-icon" onClick={handleDeleteAllOrders}>
        <Trash size={100} weight="fill" />
      </button>

      <button id="plus-icon-btn" className="plus-icon" onClick={handleOpenNewOrderMenu}>
        <PlusCircle size={100} weight="fill" />
      </button>


      <PopUpAlert status={"Houve um problema, tente novamente"} isOpen={alertError} setClosed={() => setAlertError(false)} />
      <PopUpAlert status={"Houve um problema, tente novamente"} isOpen={alertErrorCreateOrder} setClosed={() => setAlertErrorCreateOrder(false)} />

      <PopUpAlert status={"Pedido Realizado"} isOpen={alertSuccessIsOpen} setClosed={() => setAlertSuccessIsOpen(false)} />

    </div>
  )
}