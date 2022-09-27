import { useContext, useEffect, useState } from 'react'
import Modal from 'react-modal'
import Select from 'react-select'
import { Link } from 'react-router-dom'

import '../styles/components/headerComponent.css';
import { OrderComponent } from '../components/OrderComponent'

import { customStyleModal, customStylesFilter, customStylesSelect } from '../@types/customStyles';
import { ArrowLeft, Funnel, ListNumbers, PlusCircle, X } from 'phosphor-react'
import '../styles/pages/orders.css';

import { OrdersContext } from '../contexts/OrderContext';

import api from '../services/api';

Modal.setAppElement('#root')

export function Orders() {
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
    statusOptions,
    priorityOptions
  } = useContext(OrdersContext);

  const [reload, setReload] = useState(false)
  const [status, setStatus] = useState<string>('Em Progresso')
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [orderByPriority, setOrderByPriority] = useState<boolean>(false)

  const reversedOrders = Array.from(orders).reverse()
  let orderedOrders = Array.from(orders).sort((a, b) => Number(b.priority) - Number(a.priority)).filter((o) => o.status == status)
  let filteredOrders = Array.from(reversedOrders).filter((o) => o.status == status)

  function timer() {
    setTimeout(() => { setReload(!reload) }, 60000)
  }

  useEffect(() => { timer() }, [])

  useEffect(() => {
    const token = localStorage.getItem("@Auth:token");
    api.get(`/orders?status=${status}`, {
      headers: {
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => setOrders(response.data.orders));
  }, [orders.length])

  useEffect(() => {
    const token = localStorage.getItem("@Auth:token");
    api.get(`/orders?status=${status}`, {
      headers: {
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => { setOrders(response.data.orders) });
  }, [status])


  useEffect(() => {
    const token = localStorage.getItem("@Auth:token");
    api.get(`/orders?status=${status}`, {
      headers: {
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => setOrders(response.data.orders));
  }, [reload])


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
          <button onClick={handleCloseNewOrderMenuAndSubmit} className="confirm-btn">CONFIRMAR</button>
        </div>
      </Modal>

      {orders.length === 0 &&
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
          <div style={{ display: 'block', height: 'fit-content', padding: '0px', margin: '10px 0px', borderRadius: '10px', backgroundColor: '#F5F5F5' }}>
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


      {orderByPriority ? (
        orderedOrders.map((item, index) => <OrderComponent
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
        )
      ) : filteredOrders.map((item, index) => <OrderComponent
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

      <button id="plus-icon-btn" className="plus-icon" onClick={handleOpenNewOrderMenu}>
        <PlusCircle size={100} weight="fill" />
      </button>
    </div>
  )
}